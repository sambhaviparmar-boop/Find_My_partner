const workspaceRepo = require("./workspace.repository")
const apiError = require("../../core/utils/apiError")

const createWorkspaceService = async({teamId,description,githubRepo,meetingLink}) => {
    const isAlreadyExists = await workspaceRepo.getWorkspaceByTeamIdRepo(Number(teamId))
    if(isAlreadyExists){
        throw new apiError(400,"Workspace already exists")
    }
    return workspaceRepo.createWorkspaceRepo({
        teamId: Number(teamId),
        description,
        githubRepo,
        meetingLink
    })
}

const getWorkspaceByIdService = async(id) => {
    return workspaceRepo.getWorkspaceByIdRepo(Number(id))
}

const getWorkspaceByTeamIdService = async(teamId) => {
    const isAlreadyExists = await workspaceRepo.getWorkspaceByTeamIdRepo(Number(teamId))
    if(!isAlreadyExists){
        throw new apiError(404,"Workspace not found")
    }
    return workspaceRepo.getWorkspaceByTeamIdRepo(Number(teamId))
}

const updateWorkspaceService = async(id,{teamId,description,githubRepo,meetingLink}) => {   
    const isAlreadyExists = await workspaceRepo.getWorkspaceByIdRepo(Number(id))
    if(!isAlreadyExists){
        throw new apiError(404,"Workspace not found")
    }
    return workspaceRepo.updateWorkspaceRepo(Number(id),{
        teamId: Number(teamId),
        description,
        githubRepo,
        meetingLink
    })
}

const deleteWorkspaceService = async(id) => {
    const isAlreadyExists = await workspaceRepo.getWorkspaceByIdRepo(Number(id))
    if(!isAlreadyExists){
        throw new apiError(404,"Workspace not found")
    }
    return workspaceRepo.deleteWorkspaceRepo(Number(id))
}

module.exports = {
    createWorkspaceService,
    getWorkspaceByIdService,
    getWorkspaceByTeamIdService,
    updateWorkspaceService,
    deleteWorkspaceService
}
