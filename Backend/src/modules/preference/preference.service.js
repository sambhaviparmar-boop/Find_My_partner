const preferenceRepo = require("./preference.repository");


const createPreferenceService = async({userId,category,lookingFor,skillsNeeded,interests,locationPreference,maxDistance,isRemoteAllowed}) => {
    return await preferenceRepo.createPreference({userId,category,lookingFor,skillsNeeded,interests,locationPreference,maxDistance,isRemoteAllowed});
}

const updatePreferenceService = async({id,userId,category,lookingFor,skillsNeeded,interests,locationPreference,maxDistance,isRemoteAllowed}) => {
    return await preferenceRepo.updatePreference({id,userId,category,lookingFor,skillsNeeded,interests,locationPreference,maxDistance,isRemoteAllowed});
}

const deletePreferenceService = async({id}) => {
    return await preferenceRepo.deletePreference({id});
}

const getPreferenceByIdService = async({id}) => {
    return await preferenceRepo.getPreferenceById({id});
}

const getPreferenceByUserIdService = async({userId}) => {
    return await preferenceRepo.getPreferenceByUserId({userId});
}

module.exports = {
    createPreferenceService,
    updatePreferenceService,
    deletePreferenceService,
    getPreferenceByIdService,
    getPreferenceByUserIdService
}       