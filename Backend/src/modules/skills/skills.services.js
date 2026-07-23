const skillRepository = require("./skills.repository")
const ApiError = require("../../core/utils/apiError")

const createSkillService = (async ({name,category}) => {
    if(!name || !category){
        throw new ApiError("All fields are required",400)
    }
    return skillRepository.createSkill({name,category})
})

const getAllSkillsService = (async () => {
        const skills = await skillRepository.getAllSkills()
    if (!skills){
        throw new ApiError("Skills not found",404)
    }
    return skillRepository.getAllSkills()
})

const getSkillByIdService = (async ({id}) => {
    const skill = await skillRepository.getSkillById({id})
    if (!skill){
        throw new ApiError("Skill not found",404)
    }
    return skillRepository.getSkillById({id})
})

const updateSkillService = (async ({id,name,category}) => {
        const skill = await skillRepository.getSkillById({id})
    if (!skill){
        throw new ApiError("Skill not found",404)
    }
    return skillRepository.updateSkill({id,name,category})
})

const deleteSkillService = (async ({id}) => {
    const skill = await skillRepository.getSkillById({id})
    if (!skill){
        throw new ApiError("Skill not found",404)
    }
    return skillRepository.deleteSkill({id})
})

const createUserskillService = (async ({userId,skillId,level,experience}) => {
    if(!userId || !skillId || !level || !experience){
        throw new ApiError("All fields are required",400)
    }
    return skillRepository.createUserskill({userId,skillId,level,experience})
})
const getAllUserskillService = (async () => {
    const userskills = await skillRepository.getAllUserskill()
    if (!userskills){
        throw new ApiError("Userskills not found",404)
    }
    return skillRepository.getAllUserskill()
})
const getUserskillByIdService =(async ({id}) => {
    const userskill = await skillRepository.getUserskillById({id})
    if (!userskill){
        throw new ApiError("Userskill not found",404)
    }
    return skillRepository.getUserskillById({id})
})
const updateUserskillService = (async ({id,userId,skillId,level,experience}) => {
    const userskill = await skillRepository.getUserskillById({id})
    if (!userskill){
        throw new ApiError("Userskill not found",404)
    }
    return skillRepository.updateUserskill({id,userId,skillId,level,experience})
})
const deleteUserskillService = (async ({id}) => {
    const userskill = await skillRepository.getUserskillById({id})
    if (!userskill){
        throw new ApiError("Userskill not found",404)
    }
    return skillRepository.deleteUserskill({id})
})


module.exports = {
    createSkillService,
    getAllSkillsService,
    getSkillByIdService,
    updateSkillService,
    deleteSkillService,
    createUserskillService,
    getAllUserskillService,
    getUserskillByIdService,
    updateUserskillService,
    deleteUserskillService
}       
