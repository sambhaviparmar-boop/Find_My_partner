const  teamInvitationService = require("./teaminvitation.service.js");
const asyncHandler = require("../../core/utils/asyncHandler");
const ApiResponse = require("../../core/utils/apiResponce");


const createInvitationController = asyncHandler(async (req, res) => {

    const { teamId, receiverId,message } = req.body;
    const invitation = await teamInvitationService.createInvitationService({ teamId, receiverId, senderId: req.user.id,message });
    const receiver = await teamInvitationRepository.getUserById(receiverId);

    return res.status(201).json(new ApiResponse(201, invitation, "Invitation created successfully"));

});

const getInvitationByIdController = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const invitation = await teamInvitationService.getInvitationByIdService(id);
    return res.status(200).json(new ApiResponse(200, invitation, "Invitation fetched successfully"));

});

const getInvitationsOfUserController = asyncHandler(async (req, res) => {

    const { userId } = req.params;
    const invitations = await teamInvitationService.getInvitationsOfUserService(userId);
    return res.status(200).json(new ApiResponse(200, invitations, "Invitations fetched successfully"));

});

const getInvitationsOfTeamController = asyncHandler(async (req, res) => {

    const { teamId } = req.params;
    const invitations = await teamInvitationService.getInvitationsOfTeamService(teamId);
    return res.status(200).json(new ApiResponse(200, invitations, "Invitations fetched successfully"));

});



const deleteInvitationController = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const invitation = await teamInvitationService.deleteInvitationService(id);
    return res.status(200).json(new ApiResponse(200, invitation, "Invitation deleted successfully"));

});

module.exports = {
    createInvitationController,
    getInvitationByIdController,
    getInvitationsOfUserController,
    getInvitationsOfTeamController,
    deleteInvitationController
}
