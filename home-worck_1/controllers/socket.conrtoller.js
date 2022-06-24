module.exports = {
  sendMessage: (io, socket, data) => {
    console.log('yoo have new message');
    console.log(data);

    socket.emit('/message/save', data);

    io.to('roomChat').emit('/message/for/room', {});
  },

  sendMessageAll: (io, socket, data) => {
    socket.join('roomChat');
    io.emit('/message/send/all/done', { sendAll: 'everyone get message' });
  },

  sendMesWithoutMe: (io, socket) => {
    socket.broadcast.emit('/message/without/me/done', {});
  }
};
