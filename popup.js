document.addEventListener("DOMContentLoaded", function () {
  const toggleSwitch = document.getElementById("enableExtension");

  // Load saved state, default to true if not set
  chrome.storage.sync.get(["enabled"], function (result) {
    // If there's no stored value (first time) or it's true
    toggleSwitch.checked = result.enabled === undefined ? true : result.enabled;

    // If it's first time (no stored value), save the default state (true)
    if (result.enabled === undefined) {
      chrome.storage.sync.set({ enabled: true });
    }
  });

  // Save state when changed
  toggleSwitch.addEventListener("change", function () {
    const enabled = toggleSwitch.checked;

    // Save to storage
    chrome.storage.sync.set({ enabled: enabled });

    // Send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "toggleExtension",
        enabled: enabled,
      });
    });
  });
});
