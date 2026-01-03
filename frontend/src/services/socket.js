export const connectNotificationSocket = (token, onMessage) => {
  const socket = new WebSocket(
    `${import.meta.env.VITE_WS_URL}/notifications/?token=${token}`
  );

  socket.onmessage = (event) => {
    onMessage(JSON.parse(event.data));
  };

  socket.onerror = (err) => {
    console.error("WebSocket error", err);
  };

  return socket;
};
