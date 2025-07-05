const port = chrome.runtime.connect();

port.onMessage.addListener((msg) => {
  if (msg.action === "scroll") {
    window.scrollBy({ top: 100, behavior: "smooth" });
  }
});
