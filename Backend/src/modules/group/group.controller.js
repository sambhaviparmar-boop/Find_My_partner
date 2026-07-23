const ApiResponse = require("../../core/utils/apiResponce");
const groupServices = require("./group.services");
const asyncHandler = require("../../core/utils/asyncHandler");

const createGroup = asyncHandler(async (req, res) => {
    const { name, description, vertical, category, maxMembers, isPublic } = req.body;
    const group = await groupServices.createGroupService({
        name,
        description,
        vertical,
        category,
        maxMembers,
        isPublic,
        ownerId: req.user.id
    });
    return res.status(201).json(new ApiResponse(201, group, "Group created successfully"));
});

const updateGroup = asyncHandler(async (req, res) => {
    const { id, name, description, vertical, category, maxMembers, isPublic } = req.body;
    const group = await groupServices.updateGroupService({
        id,
        name,
        description,
        vertical,
        category,
        maxMembers,
        isPublic,
        ownerId: req.user.id
    });
    return res.status(200).json(new ApiResponse(200, group, "Group updated successfully"));
});

const deleteGroup = asyncHandler(async (req, res) => {
    const { id } = req.body;
    const group = await groupServices.deleteGroupService({ id });
    return res.status(200).json(new ApiResponse(200, group, "Group deleted successfully"));
});

const getAllGroups = asyncHandler(async (req, res) => {
    const groups = await groupServices.getAllGroupsService();
    return res.status(200).json(new ApiResponse(200, groups, "Groups fetched successfully"));
});

const getGroupById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const group = await groupServices.getGroupByIdService({ id });
    return res.status(200).json(new ApiResponse(200, group, "Group fetched successfully"));
});

module.exports = {
    createGroup,
    updateGroup,
    deleteGroup,
    getAllGroups,
    getGroupById
};
