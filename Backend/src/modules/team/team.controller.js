const teamService = require("./team.service");


const createTeamController = async(req,res)=>{
    try{

        const {name,description,hackathonId} = req.body;

        const ownerId = req.user.id;

        const team = await teamService.createTeamService({
            name,
            description,
            ownerId,
            hackathonId
        })

        res.status(201).json({
            success: true,
            statusCode: 201,
            message:"Team created successfully",
            data: team
        })

    }catch(error){
        res.status(500).json({
            error:error.message
        })
    }
};


const getTeamByIdController = async(req,res)=>{
    try{

        const {teamId} = req.params;

        const team = await teamService.getTeamByIdService(teamId)

        res.status(200).json({
            team
        })

    }catch(error){
        res.status(500).json({
            error:error.message
        })
    }
};


const getTeamsByUserIdController = async(req,res)=>{
    try{

        const {userId} = req.params;

        const teams = await teamService.getTeamsByUserIdService(userId)

        res.status(200).json({
            teams
        })

    }catch(error){
        res.status(500).json({
            error:error.message
        })
    }
};


const updateTeamController = async(req,res)=>{
    try{

        const {teamId} = req.params;
        const {name,description,hackathonId} = req.body;

        const team = await teamService.updateTeamService(teamId,{
            name,
            description,
            hackathonId
        })

        res.status(200).json({
            message:"Team updated successfully",
            team
        })

    }catch(error){
        res.status(500).json({
            error:error.message
        })
    }
};


const deleteTeamController = async(req,res)=>{
    try{

        const {teamId} = req.params;

        const team = await teamService.deleteTeamService(teamId)

        res.status(200).json({
            message:"Team deleted successfully",
            team
        })

    }catch(error){
        res.status(500).json({
            error:error.message
        })
    }
};


const addMemberController = async(req,res)=>{
    try{

        const {teamId,userId} = req.body;

        const team = await teamService.addMemberService(teamId,userId)

        res.status(200).json({
            message:"Member added successfully",
            team
        })

    }catch(error){
        res.status(500).json({
            error:error.message
        })
    }
};


const removeMemberController = async(req,res)=>{
    try{

        const {teamId,userId} = req.body;

        const team = await teamService.removeMemberService(teamId,userId)

        res.status(200).json({
            message:"Member removed successfully",
            team
        })

    }catch(error){
        res.status(500).json({
            error:error.message
        })
    }
};


const getTeamMembersCountController = async(req,res)=>{
    try{

        const {teamId} = req.params;

        const count = await teamService.getTeamMembersCountService(teamId)

        res.status(200).json({
            count
        })

    }catch(error){
        res.status(500).json({
            error:error.message
        })
    }
};


module.exports = {
    createTeamController,
    getTeamByIdController,
    getTeamsByUserIdController,
    updateTeamController,
    deleteTeamController,
    addMemberController,
    removeMemberController,
    getTeamMembersCountController
}
    