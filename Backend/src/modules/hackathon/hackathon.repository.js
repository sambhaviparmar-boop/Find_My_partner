const prisma = require("../core/config/prisma");

const createHackathon = async({


    name,
    description,
    organizer,
    mode,
    location,
    startDate,
    endDate,
    registrationDeadline,
    maxTeamSize,
    prizePool,
    website,
    image,
    status,
    createdBy   

    
})=>{
    return await prisma.hackathon.create({
        data:{
            name,
            description,
            organizer,
            mode,
            location,
            startDate,
            endDate,
            registrationDeadline,
            maxTeamSize,
            prizePool,
            website,
            image,
            status,
            createdBy

        }
    });
}

const getAllHackathons = async()=>{
    return await prisma.hackathon.findMany();
}

const getHackathonById = async(id)=>{
    return await prisma.hackathon.findUnique({
        where:{
            id
        }
    });
}

const updateHackathon = async(id,data)=>{
    return await prisma.hackathon.update({
        where:{
            id
        },
        data
    });
}

const deleteHackathon = async(id)=>{
    return await prisma.hackathon.delete({
        where:{
            id
        }
    });
}




module.exports = {
    createHackathon,
    getAllHackathons,
    getHackathonById,
    updateHackathon,
    deleteHackathon
}   