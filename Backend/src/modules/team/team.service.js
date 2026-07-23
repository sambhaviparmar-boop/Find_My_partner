const teamRepository = require("./team.repository");
const ApiError = require("../../core/utils/apiError");
const userRepository = require("../user/user.repository");

const createTeamService = async ({
    name,
    description,
    ownerId,
    hackathonId
}) => {
    const team = await teamRepository.createTeam({
        name,
        description,
        ownerId,
        hackathonId
    });

    await teamRepository.addMember(
        team.id,
        ownerId,
        "OWNER"
    );

    return team;
};

const getTeamByIdService = async(teamId)=>{
    const team = await teamRepository.findTeamById(Number(teamId))
  
    if (!team) {
      throw new ApiError(404, "Team not found");
    }

    const members = team.members;
    const membersCount = await teamRepository.getTeamMembersCount(Number(teamId));

    return {
        team,
        members,
        membersCount
    };
};

const getTeamsByUserIdService = async(userId)=>{
    const userTeams = await teamRepository.findTeamsByUser(Number(userId))

    if (!userTeams || userTeams.length === 0) {
        throw new ApiError(404,"No teams found for this user");
    }

    return userTeams;
};

const updateTeamService = async(teamId,data)=>{
    const existingTeam = await teamRepository.findTeamById(Number(teamId));
    
    if (!existingTeam) {
        throw new ApiError(404,"Team not found");
    }

    const updatedTeam = await teamRepository.updateTeam(Number(teamId), data);
    return updatedTeam;
};

const deleteTeamService = async(teamId)=>{
    const existingTeam = await teamRepository.findTeamById(Number(teamId));
    
    if (!existingTeam) {
        throw new ApiError(404,"Team not found");
    }

    const deletedTeam = await teamRepository.deleteTeam(Number(teamId));
    return deletedTeam;
};

const addMemberService = async(teamId,userId,role)=>{
    const existingTeam = await teamRepository.findTeamById(Number(teamId));
    
    if (!existingTeam) {
        throw new ApiError(404,"Team not found");
    }

    const user = await userRepository.findById(Number(userId));
    if (!user) {
        throw new ApiError(404,"User not found");
    }

    const existingMember = await teamRepository.findTeamMember(Number(teamId), Number(userId));
    if (existingMember) {
        throw new ApiError(400,"User already a member of this team");
    }

    const teamMembersCount = await teamRepository.getTeamMembersCount(Number(teamId));
    if (teamMembersCount >= 4) {
        throw new ApiError(400,"Team is full. Maximum 4 members allowed");
    }

    // Check if user already has 4 teams
    const userTeamsCount = await teamRepository.findTeamsByUser(Number(userId));
    if (userTeamsCount.length >= 4) {
        throw new ApiError(400,"User already has 4 teams");
    }
    
    return await teamRepository.addMember(Number(teamId), Number(userId), role)
};

const removeMemberService = async(teamId,userId)=>{
    const existingTeam = await teamRepository.findTeamById(Number(teamId));
    
    if (!existingTeam) {
        throw new ApiError(404,"Team not found");
    }
    return await teamRepository.removeMember(Number(teamId), Number(userId))
};

const getTeamMembersCountService = async(teamId)=>{
    const existingTeam = await teamRepository.findTeamById(Number(teamId));
    
    if (!existingTeam) {
        throw new ApiError(404,"Team not found");
    }

    return await teamRepository.getTeamMembersCount(Number(teamId))
};

module.exports = {
    createTeamService,
    getTeamByIdService,
    getTeamsByUserIdService,
    updateTeamService,
    deleteTeamService,
    addMemberService,
    removeMemberService,
    getTeamMembersCountService
}