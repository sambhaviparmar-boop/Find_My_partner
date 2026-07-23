const  workspaceService = require("./workspace.service")
const asyncHandler = require("../../core/utils/asyncHandler")
const ApiResponse = require("../../core/utils/apiResponce")

const createWorkspaceController = asyncHandler(async (req,res) => {
    const {teamId,description,githubRepo,meetingLink} = req.body
    const workspace = await workspaceService.createWorkspaceService({teamId,description,githubRepo,meetingLink})
    return res.status(201).json(new ApiResponse(201,workspace,"Workspace created successfully"))
})

const getWorkspaceByIdController = asyncHandler(async (req,res) => {
    const workspace = await workspaceService.getWorkspaceByIdService(req.params.id)
    return res.status(200).json(new ApiResponse(200,workspace,"Workspace fetched successfully"))
})

const getWorkspaceByTeamIdController = asyncHandler(async (req,res) => {
    const workspace = await workspaceService.getWorkspaceByTeamIdService(req.params.teamId)
    return res.status(200).json(new ApiResponse(200,workspace,"Workspace fetched successfully"))
})

const updateWorkspaceController = asyncHandler(async (req,res) => {
    const {teamId,description,githubRepo,meetingLink} = req.body
    const workspace = await workspaceService.updateWorkspaceService(req.params.id,{teamId,description,githubRepo,meetingLink})
    return res.status(200).json(new ApiResponse(200,workspace,"Workspace updated successfully"))
})

const deleteWorkspaceController = asyncHandler(async (req,res) => {
    const workspace = await workspaceService.deleteWorkspaceService(req.params.id)
    return res.status(200).json(new ApiResponse(200,workspace,"Workspace deleted successfully"))
})

module.exports = {
    createWorkspaceController,
    getWorkspaceByIdController,
    getWorkspaceByTeamIdController,
    updateWorkspaceController,
    deleteWorkspaceController
}   