
chrome.action.onClicked.addListener((tab) => {
  if (tab && tab.id) {
    chrome.tabs.sendMessage(
      tab.id,
      { type: "TOGGLE_SIDEBAR" },
      (_response) => {
        if (chrome.runtime.lastError) {
          console.warn(
            "Templex (Background): Could not send TOGGLE_SIDEBAR message. " +
            "Content script might not be injected yet. Error: ",
            chrome.runtime.lastError.message
          );
        }
      }
    );
  } else {
    console.error("Templex (Background): Could not get active tab ID.");
  }
});