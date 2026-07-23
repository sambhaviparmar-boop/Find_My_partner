
const profileRepo = require("./profile.repository");

const createProfileService = async ({userId, bio, avatar, location, college, branch, year, github, linkedin, leetcode, portfolio}) => {

    const profile = await profileRepo.createProfile({userId, bio, avatar, location, college, branch, year, github, linkedin, leetcode, portfolio});

    return profile;

}




const updateProfileService = async ({userId, bio, avatar, location, college, branch, year, github, linkedin, leetcode, portfolio}) => {

    const profile = await profileRepo.updateProfile({userId, bio, avatar, location, college, branch, year, github, linkedin, leetcode, portfolio});

    return profile;

}



const deleteProfileService = async ({userId}) => {

    const profile = await profileRepo.deleteProfile(userId);

    return profile;

}



const getProfileByUserIdService = async ({userId}) => {

    const profile = await profileRepo.getProfileByUserId(userId);

    return profile;

}



const getProfileService = async ({id}) => {

    const profile = await profileRepo.findById(id);

    return profile;

}


module.exports = {
    createProfileService,
    updateProfileService,
    deleteProfileService,
    getProfileByUserIdService,
    getProfileService
}   