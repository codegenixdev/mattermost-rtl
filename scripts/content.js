function initializeExtension() {
  function enhanceTextAndFont() {
    const fontFace = document.createElement("style");
    fontFace.setAttribute("data-extension-styles", "true");

    fontFace.textContent = `
    /* Vazir Font */
    @font-face {
      font-family: 'Vazir';
      src: url('https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/Vazir-Regular.woff2') format('woff2');
      font-weight: normal;
    }
    @font-face {
      font-family: 'Vazir';
      src: url('https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/Vazir-Bold.woff2') format('woff2');
      font-weight: bold;
    }

    /* Add RTL direction to post__content and comment-header */
    .post__content,
    .comment-header {
      direction: rtl !important;
    }

    /* Specific handling for octo-titletext */
    .octo-titletext {
      direction: rtl !important;
      font-family: 'Vazir', system-ui !important;
      text-align: initial !important;
    }

    /* Handle comment-markdown, octo-editor-preview, and MarkdownEditorInput */
    .comment-markdown,
    .comment-markdown p,
    .octo-editor-preview,
    .octo-editor-preview p,
    .MarkdownEditorInput,
    .MarkdownEditorInput p {
      font-family: 'Vazir', system-ui !important;
      direction: auto !important;
      unicode-bidi: plaintext !important;
      text-align: start !important;
    }

    /* Specific handling for paragraphs inside post-message__text */
    .post-message__text p {
      direction: auto !important;
      unicode-bidi: plaintext !important;
      font-family: 'Vazir', system-ui !important;
      text-align: initial !important;
    }

    /* Specific handling for octo-editor-preview and MarkdownEditorInput */
    .octo-editor-preview,
    .MarkdownEditorInput {
      direction: rtl !important;
      font-family: 'Vazir', system-ui !important;
    }
    
    .octo-editor-preview p,
    .MarkdownEditorInput p {
      direction: rtl !important;
      font-family: 'Vazir', system-ui !important;
      text-align: initial !important;
    }

    /* Change margin for col__name in post__header */
    .post__header .col__name {
      margin-right: 0 !important;
      margin-left: 4px !important;
    }

    /* Bi-directional text handling */
    textarea,
    .post-message__text,
    #post_textbox,
    #edit_textbox,
    #reply_textbox,
    .custom-textarea,
    [contenteditable="true"] {
      font-family: 'Vazir', system-ui !important;
      direction: auto !important;
      unicode-bidi: plaintext !important;
      text-align: start !important;
    }

    /* Rest of your CSS remains the same */
    [dir="rtl"] span:not([dir="rtl"]):not([dir="auto"]),
    [dir="rtl"] p:not([dir="rtl"]):not([dir="auto"]) {
      direction: ltr;
      unicode-bidi: embed;
    }

    code, pre {
      direction: ltr !important;
      text-align: left !important;
      font-family: monospace !important;
    }

    [dir="rtl"] ul, [dir="rtl"] ol {
      padding-right: 20px;
      padding-left: 0;
    }

    .Button_prepended {
      margin-right: 0 !important;
      margin-left: .4em !important;
    }

    .Button_label {
      direction: ltr !important;
    }
    .Reaction__emoji {
      margin: 0 0 0 2px !important;
    }

    .ThreadFooter {
      left: auto !important;
      right: -34px !important;
    }
  `;
    document.head.appendChild(fontFace);

    function detectTextDirection(text) {
      // Check for RTL characters
      const rtlRegex =
        /[\u0591-\u07FF\u200F\u202B\u202E\uFB1D-\uFDFD\uFE70-\uFEFC]/;
      // Check for LTR characters
      const ltrRegex = /[A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8]/;

      const hasRTL = rtlRegex.test(text);
      const hasLTR = ltrRegex.test(text);

      if (hasRTL && hasLTR) return "auto";
      if (hasRTL) return "rtl";
      if (hasLTR) return "ltr";
      return "auto";
    }

    function handleElement(element) {
      // Set font
      element.style.fontFamily = "Vazir, system-ui";

      // Handle contentEditable elements
      if (element.isContentEditable || element.tagName === "TEXTAREA") {
        element.addEventListener("input", function () {
          const direction = detectTextDirection(this.value || this.textContent);
          this.setAttribute("dir", direction);
        });
      }

      // Special handling for post-message__text paragraphs
      if (element.classList.contains("post-message__text")) {
        element.querySelectorAll("p").forEach((p) => {
          const direction = detectTextDirection(p.textContent);
          p.setAttribute("dir", direction);
          p.style.direction = "auto";
          p.style.unicodeBidi = "plaintext";
          p.style.fontFamily = "Vazir, system-ui";
          p.style.textAlign = "initial";
        });
      }

      // For static text elements
      if (
        element.classList.contains("post-message__text") ||
        element.classList.contains("comment-markdown") ||
        element.classList.contains("octo-editor-preview") ||
        element.classList.contains("MarkdownEditorInput") ||
        element.classList.contains("octo-titletext")
      ) {
        const direction = detectTextDirection(element.textContent);
        element.setAttribute("dir", direction);

        // Special handling for octo-editor-preview and MarkdownEditorInput paragraphs
        if (
          element.classList.contains("octo-editor-preview") ||
          element.classList.contains("MarkdownEditorInput")
        ) {
          element.querySelectorAll("p").forEach((p) => {
            p.style.direction = "rtl";
            p.style.fontFamily = "Vazir, system-ui";
            p.style.textAlign = "initial";
          });
        }
      }

      // Special handling for code blocks
      const codeBlocks = element.querySelectorAll("code, pre");
      codeBlocks.forEach((block) => {
        block.style.direction = "ltr";
        block.style.textAlign = "left";
        block.style.fontFamily = "monospace";
      });
    }

    // Apply to existing elements
    document
      .querySelectorAll(
        `
    .post-message__text,
    .comment-markdown,
    .octo-editor-preview,
    .MarkdownEditorInput,
    .octo-titletext,
    textarea,
    [contenteditable="true"],
    #post_textbox,
    #edit_textbox,
    #reply_textbox
  `
      )
      .forEach(handleElement);

    // Specifically handle octo-editor-preview and MarkdownEditorInput paragraphs
    document
      .querySelectorAll(".octo-editor-preview p, .MarkdownEditorInput p")
      .forEach((p) => {
        p.style.direction = "rtl";
        p.style.fontFamily = "Vazir, system-ui";
        p.style.textAlign = "initial";
      });
  }

  // Initial run
  enhanceTextAndFont();

  // Watch for new elements
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          // Element node
          if (
            node.matches(
              '.post-message__text, .comment-markdown, .octo-editor-preview, .MarkdownEditorInput, .octo-titletext, textarea, [contenteditable="true"]'
            )
          ) {
            handleElement(node);
          }
          // Check children
          node
            .querySelectorAll(
              '.post-message__text, .comment-markdown, .octo-editor-preview, .MarkdownEditorInput, .octo-titletext, textarea, [contenteditable="true"]'
            )
            .forEach(handleElement);

          // Specifically handle paragraphs in new nodes
          if (
            node.classList.contains("octo-editor-preview") ||
            node.classList.contains("MarkdownEditorInput")
          ) {
            node.querySelectorAll("p").forEach((p) => {
              p.style.direction = "rtl";
              p.style.fontFamily = "Vazir, system-ui";
              p.style.textAlign = "initial";
            });
          }
        }
      });
    });
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

let currentObserver = null;

// Function to cleanup
function cleanup() {
  if (currentObserver) {
    currentObserver.disconnect();
    currentObserver = null;
  }
  // Remove the added styles
  const existingStyle = document.querySelector("style[data-extension-styles]");
  if (existingStyle) {
    existingStyle.remove();
  }
}

// Check initial state
chrome.storage.sync.get(["enabled"], function (result) {
  // Initialize if there's no stored value (first time) or if it's explicitly true
  if (result.enabled === undefined || result.enabled === true) {
    initializeExtension();
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "toggleExtension") {
    if (request.enabled) {
      initializeExtension();
    } else {
      cleanup();
    }
  }
});
