const groupRepo = require("./group.repository");

const createGroupService = async({name, description, vertical, category, maxMembers, isPublic, ownerId}) => { 
    const group = await groupRepo.createGroup({ name, description, vertical, category, maxMembers, isPublic, ownerId });
    return group;
}

const updateGroupService = async({id, name, description, vertical, category, maxMembers, isPublic, ownerId}) => {
    const group = await groupRepo.updateGroup({ id, name, description, vertical, category, maxMembers, isPublic, ownerId });
    return group;
}

const deleteGroupService = async({id}) => {
    const group = await groupRepo.deleteGroup({ id });
    return group;
}

const getAllGroupsService = async() => {
    const groups = await groupRepo.getAllGroups();
    return groups;
}

const getGroupByIdService = async({id}) => {
    const group = await groupRepo.getGroupById({ id });
    return group;
}

module.exports = {
    createGroupService,
    updateGroupService,
    deleteGroupService,
    getAllGroupsService,
    getGroupByIdService
}