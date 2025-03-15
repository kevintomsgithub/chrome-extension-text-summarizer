let summaryButton = null;

function createSummaryButton(selection) {
  removeSummaryButton(); // Remove existing button before creating a new one

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  summaryButton = document.createElement('button');
  summaryButton.innerText = 'Summarize';
  summaryButton.style.position = 'absolute';
  summaryButton.style.left = `${rect.left + window.scrollX}px`;
  summaryButton.style.top = `${rect.bottom + window.scrollY + 10}px`;
  summaryButton.style.padding = '8px 16px';
  summaryButton.style.backgroundColor = '#1e90ff';
  summaryButton.style.color = 'white';
  summaryButton.style.borderRadius = '5px';
  summaryButton.style.fontSize = '14px';
  summaryButton.style.cursor = 'pointer';
  summaryButton.style.border = 'none';
  summaryButton.style.transition = 'background-color 0.3s';
  summaryButton.style.zIndex = '1000'; // Ensures it's above other elements

  summaryButton.addEventListener('mousedown', (event) => {
    event.stopPropagation(); // Prevents conflict with window click event
  });

  summaryButton.addEventListener('click', () => {
    const highlightedText = selection.toString().trim();
    if (!highlightedText) return;

    console.log("Highlighted Text:", highlightedText);
    
    chrome.runtime.sendMessage(
      { action: 'summarizeText', text: highlightedText },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          alert("Failed to get summary.");
        } else {
          alert(response.summary);
        }
      }
    );

    removeSummaryButton();
  });

  document.body.appendChild(summaryButton);
}

function removeSummaryButton() {
  if (summaryButton) {
    summaryButton.remove();
    summaryButton = null;
  }
}

window.addEventListener('mouseup', () => {
  const selection = window.getSelection();
  if (!selection.isCollapsed) {
    createSummaryButton(selection);
  } else {
    removeSummaryButton();
  }
});

window.addEventListener('click', (event) => {
  if (summaryButton && !summaryButton.contains(event.target) && !window.getSelection().toString()) {
    removeSummaryButton();
  }
});


// let summaryButton = null; // Store the reference to the summary button

// // Function to create the summary button after text is highlighted
// function createSummaryButton(selection) {
//   // Remove the existing button if it exists
//   if (summaryButton) {
//     summaryButton.remove();
//   }

//   const range = selection.getRangeAt(0);
//   const rect = range.getBoundingClientRect();

//   summaryButton = document.createElement('button');
//   summaryButton.innerText = 'Summarize';
//   summaryButton.style.position = 'absolute';
//   summaryButton.style.left = `${rect.left + window.scrollX}px`;
//   summaryButton.style.top = `${rect.bottom + window.scrollY + 10}px`;
//   summaryButton.style.padding = '8px 16px';
//   summaryButton.style.backgroundColor = '#1e90ff';
//   summaryButton.style.color = 'white';
//   summaryButton.style.borderRadius = '5px';
//   summaryButton.style.fontSize = '14px';
//   summaryButton.style.cursor = 'pointer';
//   summaryButton.style.border = 'none';
//   summaryButton.style.transition = 'background-color 0.3s';

//   // Handle button click event
//   summaryButton.addEventListener('click', () => {
//     const highlightedText = selection.toString();
//     console.log("highlightedText", highlightedText)
//     chrome.runtime.sendMessage({ action: 'summarizeText', text: highlightedText }, (response) => {
//       alert(response.summary); // Display the summary in an alert
//     });
//   });

//   document.body.appendChild(summaryButton);
// }

// // Function to remove the summary button
// function removeSummaryButton() {
//   if (summaryButton) {
//     summaryButton.remove();
//     summaryButton = null; // Clear the reference
//   }
// }

// // Listen for text selection
// window.addEventListener('mouseup', () => {
//   const selection = window.getSelection();
//   if (!selection.isCollapsed) {
//     createSummaryButton(selection);
//   } else {
//     removeSummaryButton(); // Remove button when selection is collapsed (text deselected)
//   }
// });

// // Listen for clicks outside of the button (to remove it if clicked outside)
// window.addEventListener('click', (event) => {
//   if (summaryButton && !summaryButton.contains(event.target) && !window.getSelection().toString()) {
//     removeSummaryButton();
//   }
// });
