const hackathonRepository = require("./hackathon.repository");






const createHackathonService = async({



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


    return hackathonRepository.createHackathon({


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

    });
}

const getAllHackathonsService = async()=>{


    
    return hackathonRepository.getAllHackathons();


}

const getHackathonByIdService = async(id)=>{

    const    hackathon = await hackathonRepository.getHackathonById(id);
    if(!hackathon){
        throw new Error(404,"Hackathon not found");
    }
    return hackathon;
}

const updateHackathonService = async(id,data)=>{
    
    const hackathon = await hackathonRepository.getHackathonById(id);
    if(!hackathon){
        throw new Error(404,"Hackathon not found");
    }

    return hackathonRepository.updateHackathon(id,data);
}

const deleteHackathonService = async(id)=>{

    const hackathon = await hackathonRepository.getHackathonById(id);
    if(!hackathon){
        throw new Error(404,"Hackathon not found");
    }

    return hackathonRepository.deleteHackathon(id);
}



module.exports = {
    createHackathonService,
    getAllHackathonsService,
    getHackathonByIdService,
    updateHackathonService,
    deleteHackathonService
}
