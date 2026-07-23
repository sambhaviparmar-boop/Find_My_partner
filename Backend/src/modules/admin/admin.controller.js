const adminService = require("./admin.services")



const getAllUsersController = async (req, res) => {
 
    const users = await adminService.getAllUsersService(req.query);
    res.status(200).json({
        success: true,
        message: "All users fetched successfully",
        data: users
    })
}

const getUserByIdController = async (req, res) => {

    const user = await adminService.getUserByIdService(req.params.id);
    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user
    })
}

const deleteUserController = async (req, res) => {

    const user = await adminService.deleteUserService(req.params.id);
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: user
    })
}

const updateUserController = async (req, res) => {

    const user = await adminService.updateUserService(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user
    })
}

const countUsersController = async (req, res) => {

    const count = await adminService.countUsersService();
    res.status(200).json({
        success: true,
        message: "Users count fetched successfully",
        data: count
    })
}

const getAllTeamsController = async (req, res) => {

    const teams = await adminService.getAllTeamsService(req.query);
    res.status(200).json({
        success: true,
        message: "All teams fetched successfully",
        data: teams
    })
}

const getTeamByIdController = async (req, res) => {

    const team = await adminService.getTeamByIdService(req.params.id);
    res.status(200).json({
        success: true,
        message: "Team fetched successfully",
        data: team
    })
}

const deleteTeamController = async (req, res) => {

    const team = await adminService.deleteTeamService(req.params.id);
    res.status(200).json({
        success: true,
        message: "Team deleted successfully",
        data: team
    })
}

const updateTeamController = async (req, res) => {

    const team = await adminService.updateTeamService(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: "Team updated successfully",
        data: team
    })
}

const countTeamsController = async (req, res) => {

    const count = await adminService.countTeamsService();
    res.status(200).json({
        success: true,
        message: "Teams count fetched successfully",
        data: count
    })
}

module.exports = {
    getAllUsersController,
    getUserByIdController,
    deleteUserController,
    updateUserController,
    countUsersController,
    getAllTeamsController,
    getTeamByIdController,
    deleteTeamController,
    updateTeamController,
    countTeamsController    
}