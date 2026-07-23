
const joinRequestService = require("../../modules/joinrequest/joinrequest.services");   
const ApiResponse = require("../../core/utils/apiResponce.js");
const asyncHandler = require("../../core/utils/asyncHandler.js");


// Send Join Request
const createJoinRequest = asyncHandler(async (req, res) => {

    const groupId = req.params.groupId ?? req.body.groupId;
    const { message } = req.body;

    const request = await joinRequestService.createJoinRequest({
        groupId: Number(groupId),
        userId: req.user.id,
        message
    });


    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                request,
                "Join request sent successfully"
            )
        );
});



// Get all requests of a group (Owner only)
const getGroupRequest = asyncHandler(async (req, res) => {

    const { groupId } = req.params;


    const requests = await joinRequestService.getGroupRequests({
        groupId: Number(groupId),
        userId: req.user.id
    });


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                requests,
                "Join requests fetched successfully"
            )
        );
});



// Accept request
const acceptJoinRequest = asyncHandler(async (req, res) => {

    const requestId = req.params.requestId ?? req.body.requestId;


    const request = await joinRequestService.acceptJoinRequest({
        requestId: Number(requestId),
        ownerId: req.user.id
    });


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                request,
                "Join request accepted"
            )
        );
});



// Reject request
const rejectJoinRequest = asyncHandler(async (req, res) => {

    const requestId = req.params.requestId ?? req.body.requestId;


    const request = await joinRequestService.rejectJoinRequest({
        requestId: Number(requestId),
        ownerId: req.user.id
    });


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                request,
                "Join request rejected"
            )
        );
});



// Cancel own request
const cancelJoinRequest = asyncHandler(async (req, res) => {

    const requestId = req.params.requestId ?? req.body.requestId;


    const request = await joinRequestService.cancelJoinRequest({
        requestId: Number(requestId),
        userId: req.user.id
    });


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                request,
                "Join request cancelled"
            )
        );
});


const getUserRequest = asyncHandler(async (req, res) => {

    const { userId } = req.params;


    const requests = await joinRequestService.getUserRequest({
        userId: Number(userId),
        ownerId: req.user.id
    });


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                requests,
                "Join requests fetched successfully"
            )
        );
}); 



module.exports = {
    createJoinRequest,
    getGroupRequest,
    acceptJoinRequest,
    rejectJoinRequest,
    cancelJoinRequest,
    getUserRequest
};
