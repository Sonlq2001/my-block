let users = [];

const SocketServer = (socket) => {
	socket.on("joinPostDetail", (id) => {
		socket.join(id);
	});

	socket.on("outPostDetail", (id) => {
		socket.leave(id);
	});

	socket.on("joinUser", (id) => {
		users.push({ id, socketId: socket.id });
	});

	socket.on("disconnect", () => {
		users = users.filter((user) => user.socketId !== socket.id);
	});

	// Notification
	socket.on("createNotify", (data) => {
		const client = users.find((user) => {
			return data.recipients.includes(user.id);
		});
		client &&
			socket.to(`${client.socketId}`).emit("createNotifyToClient", data);
	});

	// Message
	socket.on("addMessage", (data) => {
		const user = users.find((user) => user.id === data.recipient._id);
		user && socket.to(`${user.socketId}`).emit("addMessageClient", data);
	});
};

export default SocketServer;
