const ApiResponse = require("../../core/utils/apiResponce");
const asyncHandler = require("../../core/utils/asyncHandler");
const profileService = require("./profile.service");

const createProfile = asyncHandler(async (req, res) => {
    const { bio, avatar, location, college, branch, year, github, linkedin, leetcode, portfolio } = req.body;

    const profile = await profileService.createProfileService({
        userId: req.user.id,
        bio,
        avatar,
        location,
        college,
        branch,
        year: year !== undefined ? Number(year) : undefined,
        github,
        linkedin,
        leetcode,
        portfolio
    });

    return res.status(201).json(new ApiResponse(201, profile, "Profile created successfully"));
});

const updateProfile = asyncHandler(async (req, res) => {
    const { bio, avatar, location, college, branch, year, github, linkedin, leetcode, portfolio } = req.body;

    const profile = await profileService.updateProfileService({
        userId: req.user.id,
        bio,
        avatar,
        location,
        college,
        branch,
        year: year !== undefined ? Number(year) : undefined,
        github,
        linkedin,
        leetcode,
        portfolio
    });

    return res.status(200).json(new ApiResponse(200, profile, "Profile updated successfully"));
});

const deleteProfile = asyncHandler(async (req, res) => {
    const profile = await profileService.deleteProfileService({ userId: req.user.id });
    return res.status(200).json(new ApiResponse(200, profile, "Profile deleted successfully"));
});

const getProfileByUserId = asyncHandler(async (req, res) => {
    const profile = await profileService.getProfileByUserIdService({ userId: req.user.id });
    return res.status(200).json(new ApiResponse(200, profile, "Profile fetched successfully"));
});

const getProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const profile = await profileService.getProfileService({ id: Number(id) });
    return res.status(200).json(new ApiResponse(200, profile, "Profile fetched successfully"));
});

module.exports = {
    createProfile,
    updateProfile,
    deleteProfile,
    getProfileByUserId,
    getProfile
};
