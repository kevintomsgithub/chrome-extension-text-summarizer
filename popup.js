document.getElementById('summarizeBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
          {
              target: { tabId: tabs[0].id },
              func: () => document.body.innerText, // Extracts the page text
          },
          (results) => {
              if (results && results[0] && results[0].result) {
                  const pageText = results[0].result;
                  chrome.runtime.sendMessage({ action: 'summarizePage', pageText }, (response) => {
                      const summaryBox = document.getElementById('summaryResult');
                      summaryBox.innerText = response.summary;
                      summaryBox.style.display = 'block';
                  });
              }
          }
      );
  });
});
