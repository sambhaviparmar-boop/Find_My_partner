
const prisma = require( "../../core/config/prisma.js")

const createWorkspaceRepo = async({teamId,description,githubRepo,meetingLink}) => {
    return prisma.workspace.create({
        data:{
            teamId,
            description,
            githubRepo,
            meetingLink
        }
    })
}

const getWorkspaceByIdRepo = async(id)=>{

    return prisma.workspace.findUnique({

        where:{
            id
        },

        include:{
            team:{
                include:{
                    members:{
                        include:{
                            user:{
                                select:{
                                    id:true,
                                    name:true,
                                    email:true
                                }
                            }
                        }
                    }
                }
            }
        }

    });

};

const getWorkspaceByTeamIdRepo = async(teamId) => {
    return prisma.workspace.findUnique({
        where:{
            teamId
        }
    })
}
const updateWorkspaceRepo = async(
    id,
    {
        description,
        githubRepo,
        meetingLink
    }
)=>{
    return prisma.workspace.update({
        where:{
            id
        },
        data:{
            description,
            githubRepo,
            meetingLink
        }
    });
};

const deleteWorkspaceRepo = async(id) => {
    return prisma.workspace.delete({
        where:{
            id
        }
    })
}

module.exports = {
    createWorkspaceRepo,
    getWorkspaceByIdRepo,
    getWorkspaceByTeamIdRepo,
    updateWorkspaceRepo,
    deleteWorkspaceRepo
}

