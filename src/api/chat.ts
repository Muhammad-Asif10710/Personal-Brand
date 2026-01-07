export async function sendMessage(messages: { role: string; content: string }[]) {
  const response = await fetch("https://muhammadasif-tech.online/aichat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  // If streaming: read chunks
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let result = "";

  if (reader) {
    let done = false;
    while (!done) {
      const { value, done: streamDone } = await reader.read();
      done = streamDone;
      if (value) {
        const chunk = decoder.decode(value);
        // Process each line in the chunk
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6); // Remove 'data: ' prefix
            if (data === '[DONE]') {
              done = true;
              break;
            }
            try {
              const parsed = JSON.parse(data);
              if (parsed.response) {
                result += parsed.response;
              }
            } catch (e) {
              // Ignore invalid JSON
            }
          }
        }
      }
    }
  } else {
    // fallback if not streamed
    result = await response.text();
  }

  return result;
}
