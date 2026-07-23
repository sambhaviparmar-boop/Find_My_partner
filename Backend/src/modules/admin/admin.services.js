const adminRepo = require("./admin.repository");



const getAllUsersService = async (filters) => {
    return adminRepo.getAllUsersRepository(filters);
};

const getUserByIdService = async (id) => {
    return adminRepo.getUserByIdRepository(id);
};

const deleteUserService = async (id) => {
    return adminRepo.deleteUserRepository(id);
};

const updateUserService = async (id, data) => {
    return adminRepo.updateUserRepository(id, data);
};

const countUsersService = async () => {
    return adminRepo.countUsersRepository();
};

const getAllTeamsService = async (filters) => {
    return adminRepo.getAllTeamsRepository(filters);
};

const getTeamByIdService = async (id) => {
    return adminRepo.getTeamByIdRepository(id);
};

const deleteTeamService = async (id) => {
    return adminRepo.deleteTeamRepository(id);
};

const updateTeamService = async (id, data) => {
    return adminRepo.updateTeamRepository(id, data);
};

const countTeamsService = async () => {
    return adminRepo.countTeamsRepository();
};




module.exports = {
    getAllUsersService,
    getUserByIdService,
    deleteUserService,
    updateUserService,
    countUsersService,
    getAllTeamsService,
    getTeamByIdService,
    deleteTeamService,
    updateTeamService,
    countTeamsService
};

