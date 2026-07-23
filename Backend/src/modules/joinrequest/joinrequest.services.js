const joinRequestRepo = require("./joinrequest.repository");
const groupRepo = require("../group/group.repository");
const ApiError = require("../../core/utils/apiError");
const prisma = require("../../core/config/prisma");

// Create Join Request
const createJoinRequest = async ({
    groupId,
    userId,
    message
}) => {
    // Check group exists
    const group = await groupRepo.findById({ id: groupId });

    if (!group) {
        throw new ApiError(404, "Group not found");
    }

    // Check user is already member
    const isMember = await joinRequestRepo.isMember({
        groupId,
        userId
    });

    if (isMember) {
        throw new ApiError(
            400,
            "User already member of this group"
        );
    }

    // Check duplicate request
    const existingRequest = await joinRequestRepo.findRequestByUserIdAndGroupId({
        groupId,
        userId
    });

    if (existingRequest) {
        if (existingRequest.status === "ACCEPTED") {
            throw new ApiError(400, "User already member of this group");
        }
        if (existingRequest.status === "PENDING") {
            throw new ApiError(400, "Join request already exists");
        }
        // If it is REJECTED, delete the old request so a new one can be created cleanly
        await joinRequestRepo.deleteRequest(existingRequest.id);
    }

    const request = await joinRequestRepo.createRequest({
        groupId,
        userId,
        message
    });

    return request;
};

// Get Group Requests
const getGroupRequests = async ({
    groupId,
    userId
}) => {
    const group = await groupRepo.findById({ id: groupId });

    if (!group) {
        throw new ApiError(404, "Group not found");
    }

    // Only owner can see requests
    if (group.ownerId !== userId) {
        throw new ApiError(
            403,
            "Only group owner can view requests"
        );
    }

    return await joinRequestRepo.findGroupRequests(groupId);
};

// Get User Requests
const getUserRequest = async ({
    userId
}) => {
    return await joinRequestRepo.findUserRequests(userId);
};

// Accept Request
const acceptJoinRequest = async ({
    requestId,
    ownerId
}) => {
    const request = await joinRequestRepo.findById(requestId);

    if (!request) {
        throw new ApiError(
            404,
            "Request not found"
        );
    }

    // Check owner
    if (request.group.ownerId !== ownerId) {
        throw new ApiError(
            403,
            "Not authorized"
        );
    }

    // Use Prisma transaction to atomically update request status and create GroupMember
    const updatedRequest = await prisma.$transaction(async (tx) => {
        const updated = await tx.joinRequest.update({
            where: { id: requestId },
            data: { status: "ACCEPTED" }
        });

        await tx.groupMember.create({
            data: {
                groupId: request.groupId,
                userId: request.userId,
                role: "MEMBER"
            }
        });

        return updated;
    });

    return updatedRequest;
};

// Reject Request
const rejectJoinRequest = async ({
    requestId,
    ownerId
}) => {
    const request = await joinRequestRepo.findById(requestId);

    if (!request) {
        throw new ApiError(
            404,
            "Request not found"
        );
    }

    if (request.group.ownerId !== ownerId) {
        throw new ApiError(
            403,
            "Not authorized"
        );
    }

    return await joinRequestRepo.updateStatus(
        requestId,
        "REJECTED"
    );
};

// Cancel Request
const cancelJoinRequest = async ({
    requestId,
    userId
}) => {
    const request = await joinRequestRepo.findById(requestId);

    if (!request) {
        throw new ApiError(
            404,
            "Request not found"
        );
    }

    if (request.userId !== userId) {
        throw new ApiError(
            403,
            "Not allowed"
        );
    }

    return await joinRequestRepo.deleteRequest(requestId);
};

module.exports = {
    createJoinRequest,
    getGroupRequests,
    getUserRequest,
    acceptJoinRequest,
    rejectJoinRequest,
    cancelJoinRequest
};
