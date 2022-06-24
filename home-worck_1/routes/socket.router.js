const { socketController } = require("../controllers");

module.exports = (io, socket) => {
  socket.use((infoArr, next) => {

    const [
      event,
      ...data
    ] = infoArr;

    if (event.startsWith('/message')) {
      console.log('Message Router Satrt');

      socket.on('/message', (data) => socketController.sendMessage(io, socket, data));

      socket.on('/message/send/all', (data) => socketController.sendMessageAll(io, socket, data));

      socket.on('/message/without/me', () => socketController.sendMesWithoutMe(io, socket));

      // return;
    }
    next();
  });

};
