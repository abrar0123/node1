const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("wlcome, to node at server side developemnt");
});

server.listen(5000, () => {
  console.log("Server running at http://localhost:3000/");
});
