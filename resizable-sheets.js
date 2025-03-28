Hooks.on("renderApplication", (app, html) => {
  if (app.element[0].classList.contains("sheet")) {
    const sheet = app.element[0];
    const handle = document.createElement("div");
    handle.classList.add("resize-handle");
    sheet.appendChild(handle);

    let isResizing = false;
    let startX, startY, startWidth, startHeight;

    handle.addEventListener("mousedown", (e) => {
      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = sheet.offsetWidth;
      startHeight = sheet.offsetHeight;
      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", stopResize);
    });

    function resize(e) {
      if (!isResizing) return;
      sheet.style.width = startWidth + (e.clientX - startX) + "px";
      sheet.style.height = startHeight + (e.clientY - startY) + "px";
    }

    function stopResize() {
      isResizing = false;
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", stopResize);
    }

    // Ridimensionamento automatico con il titolo
    const title = sheet.querySelector(".window-title");
    const observer = new MutationObserver(() => {
      sheet.style.width = "auto";
      sheet.style.width = sheet.offsetWidth + "px";
    });
    observer.observe(title, { childList: true, characterData: true, subtree: true });
  }
});

// Aggiungi un po' di CSS per il manico di ridimensionamento
const style = document.createElement("style");
style.textContent = `
  .resize-handle {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
    background: rgba(0, 0, 0, 0.3);
    cursor: se-resize;
  }
`;
document.head.appendChild(style);