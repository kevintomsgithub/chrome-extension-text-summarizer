chrome.runtime.onInstalled.addListener(() => {
    console.log('Summarize Me Extension Installed');
  });
  
  // Handle API requests from content scripts
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'summarizePage') {
      fetchOllamaSummary(request.pageText).then((summary) => {
        sendResponse({ summary });
      });
    } else if (request.action === 'summarizeText') {
      fetchOllamaSummary(request.text).then((summary) => {
        sendResponse({ summary });
      });
    }
    return true; // Keeps the message channel open for sendResponse
  });
  
  async function fetchOllamaSummary(text) {
    try {
        const prompt = `Summarize this text into 3 sentences: ${text}`;

        // Prepare the request data
        const requestData = {
            model: "llama3.2",   // Specify the model
            prompt: prompt,      // The text to summarize
            stream: false,       // Request a non-streamed response
            format: "json",      // Expecting a JSON response
            keep_alive: -1
        };

        console.log("requestData", requestData)

        // Make the POST request to the Ollama API
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        // Check if response is OK
        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        // Read response as JSON
        const data = await response.json();

        // Debugging: Log the API response
        console.log("Full API Response:", data);

        // Extract and clean up the summary response
        if (data.response) {
            let summary = data.response;

            // If response contains HTML content, extract only the text
            if (summary.includes("<")) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(summary, "text/html");
                summary = doc.body.textContent || "No valid summary generated.";
            }

            return summary.trim();
        } else {
            return 'No summary generated';
        }

    } catch (error) {
        console.error('Error fetching Ollama summary:', error.message);
        return 'Error generating summary';  // Fallback message
    }
}
