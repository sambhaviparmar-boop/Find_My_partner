const prisma = require("../../core/config/prisma");

const createTeam = async({
    name,
    description,
    ownerId,
    hackathonId
})=>{
    return await prisma.team.create({
        data:{
            name,
            description,
            ownerId: Number(ownerId),
            hackathonId: hackathonId ? Number(hackathonId) : null
        }
    })
};

const findTeamById = async(teamId)=>{
    return await prisma.team.findUnique({
        where:{
            id: Number(teamId)
        },
        include:{
            members:{
                include:{
                    user:{
                        include:{
                            profile:true
                        }
                    }
                }
            }
        }
    })
};

const findTeamsByUser = async(userId)=>{
    return await prisma.team.findMany({
        where:{
            ownerId: Number(userId)
        },
        include:{
            members:{
                include:{
                    user:true
                }
            }
        }
    })
};

const updateTeam = async(teamId,{name,description,hackathonId})=>{
    return await prisma.team.update({
        where:{
            id: Number(teamId)
        },
        data:{
            name,
            description,
            hackathonId: hackathonId ? Number(hackathonId) : null
        }
    })
};

const deleteTeam = async(teamId)=>{
    return await prisma.team.delete({
        where:{
            id: Number(teamId)
        }
    })
};

const addMember = async(teamId,userId,role)=>{
    return await prisma.teamMember.create({
        data:{
            teamId: Number(teamId),
            userId: Number(userId),
            role: role || "MEMBER"
        }
    })
};

const removeMember = async(teamId,userId)=>{
    return await prisma.teamMember.delete({
        where:{
            teamId_userId:{
                teamId: Number(teamId),
                userId: Number(userId)
            }
        }
    })
};

const getTeamMembersCount = async(teamId)=>{
    return await prisma.teamMember.count({
        where:{
            teamId: Number(teamId)
        }
    })
};

const findTeamMember = async(teamId, userId)=>{
    return await prisma.teamMember.findUnique({
        where:{
            teamId_userId:{
                teamId: Number(teamId),
                userId: Number(userId)
            }
        }
    })
};

module.exports = {
    createTeam,
    findTeamById,
    findTeamsByUser,
    updateTeam,
    deleteTeam,
    addMember,
    removeMember,
    getTeamMembersCount,
    findTeamMember
}
