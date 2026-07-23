const ConnectionService = require("./connection.service");
const asyncHandler = require("../../core/utils/asyncHandler");
const ApiResponse = require("../../core/utils/apiResponce");

const createConnectionController = asyncHandler(async(req,res)=>{
    const { senderId, receiverId, connectionType, status, category } = req.body;
    // Map connectionType to category if category is missing
    const connection = await ConnectionService.createConnectionService({
        senderId,
        receiverId,
        connectionType,
        status,
        category: category || connectionType
    });
    res.status(201).json(new ApiResponse(201, connection, "Connection created successfully"));
});

const getConnectionController = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    const connection = await ConnectionService.getConnectionByIdService(id);
    res.status(200).json(new ApiResponse(200, connection, "Connection fetched successfully"));
});

const getAllConnectionsController = asyncHandler(async(req,res)=>{
    const userId = req.user.id;
    const connections = await ConnectionService.getAllConnectionsService(userId);
    res.status(200).json(new ApiResponse(200, connections, "Connections fetched successfully"));
});

const updateConnectionController = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    const { status } = req.body;
    const connection = await ConnectionService.updateConnectionStatusService(id, status);
    res.status(200).json(new ApiResponse(200, connection, "Connection updated successfully"));
});

const deleteConnectionController = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    const connection = await ConnectionService.deleteConnectionService(id);
    res.status(200).json(new ApiResponse(200, connection, "Connection deleted successfully"));
});

module.exports = {
    createConnectionController,
    getConnectionController,
    getAllConnectionsController,
    updateConnectionController,
    deleteConnectionController
};
