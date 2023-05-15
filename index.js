const express = require("express");
const app = express();

const port = 3000;

app.use(express.static("public"));

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

let io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log(`new connection: ${socket.id}`);

  socket.on("comment", (data) => {
    console.log(data);
    // {username:'dsd', comment: 'this', time: Date()}
    data.time = Date()
    socket.broadcast.emit('comment', data)
  });

  socket.on('typing', (data)=>{
    socket.broadcast.emit('typing', data)
  })


});
