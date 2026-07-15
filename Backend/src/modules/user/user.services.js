const ApiError = require("../../core/utils/apiError");
const userRepo = require("./user.repository");

const updateUser = async (id, data) => {
    const user = await userRepo.updateProfile(id, data);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
};

const deleteUser = async (id) => {
    const user = await userRepo.deleteUser(id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return user;
};

const getAllUsers = async () => {
    const users = await userRepo.findAll();
    return users;
};

const getUserById = async (id) => {
    const user = await userRepo.findById(id);
    return user;
};

module.exports = {
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById
};