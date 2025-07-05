const port = chrome.runtime.connect();

port.onMessage.addListener((msg) => {
  if (msg.action === "scroll") {
    if (window.location.hostname.includes("linkedin.com")) {
      // Custom scroll for LinkedIn
      window.scrollBy({ top: 200, behavior: "smooth" });
    } else {
      // Default scroll (e.g., for X.com)
      window.scrollBy({ top: 100, behavior: "smooth" });
    }
  }
});
