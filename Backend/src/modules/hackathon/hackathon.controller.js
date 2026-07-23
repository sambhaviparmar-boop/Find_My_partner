const hackathonService = require("./hackathon.service");
const asyncHandler  = require("../../core/error/asyncHandler.js");
const ApiResponce = require("../../core/utils/apiResponse.js");

const createHackathonController = asyncHandler(async(req,res)=>{
    const {name,description,organizer,mode,location,startDate,endDate,registrationDeadline,maxTeamSize,prizePool,website,image,status} = req.body;
    const hackathon = await hackathonService.createHackathonService({
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
        status
    });
    res.status(201).json(new ApiResponce(201,"Hackathon created successfully",hackathon));
})       

const getAllHackathonsController = asyncHandler(async(req,res)=>{
    const hackathons = await hackathonService.getAllHackathonsService();
    res.status(200).json(new ApiResponce(200,"Hackathons fetched successfully",hackathons));
})

const getHackathonByIdController = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const hackathon = await hackathonService.getHackathonByIdService(id);
    res.status(200).json(new ApiResponce(200,"Hackathon fetched successfully",hackathon));
})

const updateHackathonController = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const {name,description,organizer,mode,location,startDate,endDate,registrationDeadline,maxTeamSize,prizePool,website,image,status} = req.body;
    const hackathon = await hackathonService.updateHackathonService(id,{
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
        status
    });
    res.status(200).json(new ApiResponce(200,"Hackathon updated successfully",hackathon));
}
)
const deleteHackathonController = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const hackathon = await hackathonService.deleteHackathonService(id);
    res.status(200).json(new ApiResponce(200,"Hackathon deleted successfully",hackathon));
})



module.exports = {
    createHackathonController,
    getAllHackathonsController,
    getHackathonByIdController,
    updateHackathonController,
    deleteHackathonController
}
