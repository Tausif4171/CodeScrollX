let ports = [];

chrome.runtime.onConnect.addListener(function(port) {
  ports.push(port);
  port.onDisconnect.addListener(() => {
    ports = ports.filter(p => p !== port);
  });
});

const ws = new WebSocket("ws://localhost:8080");

ws.onopen = () => {
  console.log("WebSocket connected to CodeScrollX server");
};

ws.onmessage = (event) => {
  if (event.data === "scroll") {
    // Send message to all connected content scripts
    ports.forEach(port => port.postMessage({ action: "scroll" }));
  }
};

ws.onerror = (e) => {
  console.error("WebSocket error:", e);
};

ws.onclose = () => {
  console.warn("WebSocket closed");
};
