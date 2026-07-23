const connectionRepository = require("./connection.repository");
const ApiError = require("../../core/utils/apiError");

const createConnectionService = async (data) => {
    const senderId = Number(data.senderId);
    const receiverId = Number(data.receiverId);
    
    const existingConnection = await connectionRepository.findConnectionBetweenUsersRepo(senderId, receiverId, data.category);
    if (existingConnection) {
        throw new ApiError(400, "Connection already exists");
    }
    
    return await connectionRepository.createConnectionRepo({
        ...data,
        senderId,
        receiverId
    });
};

const getConnectionByIdService = async (id) => {
    const connection = await connectionRepository.getConnectionByIdRepo(Number(id));
    if (!connection) {
        throw new ApiError(404, 'Connection not found');
    }
    return connection;
};

const getSentConnectionsService = async(userId) => {
    const connections = await connectionRepository.getSentConnectionsRepo(Number(userId));
    if (!connections) {
        throw new ApiError(404, "No connection found");
    }
    return connections;
};

const getReceivedConnectionsService = async(userId) => {
    const connections = await connectionRepository.getReceivedConnectionsRepo(Number(userId));
    if (!connections) {
        throw new ApiError(404, "No connection found");
    }
    return connections;
};

const updateConnectionStatusService = async (id, status) => {
    const connection = await connectionRepository.updateConnectionStatusRepo(Number(id), status);
    if (!connection) {
        throw new ApiError(404, 'Connection not found');
    }
    return connection;
};

const deleteConnectionService = async(id) => {
    const connection = await connectionRepository.deleteConnectionRepo(Number(id));
    if (!connection) {
        throw new ApiError(404, 'Connection not found');
    }
    return connection;
};

const findConnectionBetweenUsersService = async (senderId, receiverId, category) => {
    const connection = await connectionRepository.findConnectionBetweenUsersRepo(Number(senderId), Number(receiverId), category);
    if (!connection) {
        throw new ApiError(404, 'No connection found');
    }
    return connection;
};

const getAllConnectionsService = async (userId) => {
    const sent = await connectionRepository.getSentConnectionsRepo(Number(userId));
    const received = await connectionRepository.getReceivedConnectionsRepo(Number(userId));
    return { sent, received };
};

module.exports = {
    createConnectionService,
    getConnectionByIdService,
    getSentConnectionsService,
    getReceivedConnectionsService,
    updateConnectionStatusService,
    deleteConnectionService,
    findConnectionBetweenUsersService,
    getAllConnectionsService
};
