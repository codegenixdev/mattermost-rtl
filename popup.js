document.addEventListener("DOMContentLoaded", function () {
  const toggleSwitch = document.getElementById("enableExtension");
  const supportedContent = document.getElementById("supportedContent");
  const unsupportedContent = document.getElementById("unsupportedContent");

  // First check if we're on a Mattermost site
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];

    // Check for Mattermost noscript tag
    chrome.scripting.executeScript(
      {
        target: { tabId: currentTab.id },
        function: () => {
          const noscriptElements = document.getElementsByTagName("noscript");
          for (let i = 0; i < noscriptElements.length; i++) {
            if (
              noscriptElements[i].textContent ===
              "To use Mattermost, please enable JavaScript."
            ) {
              return true;
            }
          }
          return false;
        },
      },
      (results) => {
        const isMattermost = results[0].result;

        if (!isMattermost) {
          // Show unsupported site content
          supportedContent.style.display = "none";
          unsupportedContent.style.display = "block";

          // Disable the toggle switch
          toggleSwitch.disabled = true;
          toggleSwitch.checked = false;
          return;
        }

        // Show supported site content
        supportedContent.style.display = "block";
        unsupportedContent.style.display = "none";

        // Load saved state, default to true if not set
        chrome.storage.sync.get(["enabled"], function (result) {
          // If there's no stored value (first time) or it's true
          toggleSwitch.checked =
            result.enabled === undefined ? true : result.enabled;

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
          chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {
                action: "toggleExtension",
                enabled: enabled,
              });
            }
          );
        });
      }
    );
  });
});
