const prisma = require("../../core/config/prisma");

const createInvitation = async (data) => {

    const invitation = await prisma.teamInvitation.create({

        data

    })

    return invitation;

}

const getInvitationById = async (id) => {

    const invitation = await prisma.teamInvitation.findUnique({

        where: {
            id
        }

    })

    return invitation;

}

const getInvitationsOfUser = async (userId) => {

    const invitations = await prisma.teamInvitation.findMany({

        where: {
            receiverId: userId
        }

    })

    return invitations;

}

const getInvitationsOfTeam = async (teamId) => {

    const invitations = await prisma.teamInvitation.findMany({

        where: {
            teamId
        }

    })

    return invitations;

}

const updateInvitation = async (id, data) => {

    const invitation = await prisma.teamInvitation.update({

        where: {
            id
        },

        data

    })

    return invitation;

}

const deleteInvitation = async (id) => {

    const invitation = await prisma.teamInvitation.delete({

        where: {
            id
        }

    })

    return invitation;

}

module.exports = {
    createInvitation,
    getInvitationById,
    getInvitationsOfUser,
    getInvitationsOfTeam,
    updateInvitation,
    deleteInvitation
}
