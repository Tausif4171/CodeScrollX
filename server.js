const keylogger = require("keylogger.js");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
let clients = [];

wss.on("connection", ws => {
  clients.push(ws);
  ws.on("close", () => clients = clients.filter(c => c !== ws));
});

let keystrokeCount = 0;

keylogger.start((key, isKeyUp, keyCode) => {
  if (!isKeyUp) {
    keystrokeCount++;
    console.log(`Key pressed: ${key}, total: ${keystrokeCount}`); // <--- Add this line
    if (keystrokeCount % 2 === 0) {
      clients.forEach(ws => ws.send("scroll"));
    }
  }
});

console.log("CodeScrollX server running on ws://localhost:8080");
