const teamInvitationRepository = require("./teaminvitation.repository.js");
const apiError = require("../../core/utils/apiError");


async function createInvitationService(data){
 
    const{teamId,receiverId} = data;
    const existingTeam = await teamInvitationRepository.findTeamById(teamId);
    if(!existingTeam){
        throw new apiError(404,"Team not found");
    }
    const existingUser = await teamInvitationRepository.findUserById(receiverId);
    if(!existingUser){
        throw new apiError(404,"User not found");
    }
    const existingInvitation = await teamInvitationRepository.findInvitation(teamId,receiverId);
    if(existingInvitation){
        throw new apiError(400,"Invitation already sent");
    }   
    return await teamInvitationRepository.createInvitation(data)

}

async function getInvitationByIdService(id){

    const existingInvitation = await teamInvitationRepository.getInvitationById(id);
    if(!existingInvitation){
        throw new apiError(404,"Invitation not found");
    }


    return await teamInvitationRepository.getInvitationById(id)

}

async function getInvitationsOfUserService(userId){
  
    const existingUser = await teamInvitationRepository.findUserById(userId);
    if(!existingUser){
        throw new apiError(404,"User not found");
    }
    return await teamInvitationRepository.getInvitationsOfUser(userId)

}

async function getInvitationsOfTeamService(teamId){

    const existingTeam = await teamInvitationRepository.findTeamById(teamId);
    if(!existingTeam){
        throw new apiError(404,"Team not found");
    }
    return await teamInvitationRepository.getInvitationsOfTeam(teamId)

}

async function updateInvitationService(id,data){

    const existingInvitation = await teamInvitationRepository.getInvitationById(id);
    if(!existingInvitation){
        throw new apiError(404,"Invitation not found");
    }
    return await teamInvitationRepository.updateInvitation(id,data)

}

async function deleteInvitationService(id){

    const existingInvitation = await teamInvitationRepository.getInvitationById(id);
    if(!existingInvitation){
        throw new apiError(404,"Invitation not found");
    }
    return await teamInvitationRepository.deleteInvitation(id)

}


module.exports = {
    createInvitationService,
    getInvitationByIdService,
    getInvitationsOfUserService,
    getInvitationsOfTeamService,
    updateInvitationService,
    deleteInvitationService
}
