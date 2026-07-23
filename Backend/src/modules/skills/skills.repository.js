

const prisma = require("../../core/config/prisma")

const createSkill = async ({name,category}) => {
    return await prisma.skill.create({data:{name,category}})
}


const getAllSkills = async () => {
    return await prisma.skill.findMany()
}


const getSkillById = async ({id}) => {
    id = Number(id)
    return await prisma.skill.findUnique({where:{id}})
}


const updateSkill = async ({id,name,category}) => {
    id = Number(id)
    return await prisma.skill.update({where:{id},data:{name,category}})
}


const deleteSkill = async ({id}) => {
        
    id = Number(id)
    return await prisma.skill.delete({where:{id}})
}

const createUserskill = async({userId,skillId,level,experience})=>{
    return await prisma.userSkill.create({data:{userId,skillId,level,experience}})
}
const getAllUserskill = async()=>{
    return await prisma.userSkill.findMany()
}
const getUserskillById = async({id})=>{

    return prisma.userSkill.findUnique({

        where:{
            id:Number(id)
        },

        include:{
            skill:true,
            user:{
                select:{
                    id:true,
                    name:true
                }
            }
        }

    });

};
const updateUserskill = async({
    id,
    level,
    experience
})=>{

    return prisma.userSkill.update({

        where:{
            id:Number(id)
        },

        data:{
            level,
            experience
        }

    });

};
const deleteUserskill = async({id})=>{
    id = Number(id)
    return await prisma.userSkill.delete({where:{id}})
}


module.exports = {
    createSkill,
    getAllSkills,
    getSkillById,
    updateSkill,
    deleteSkill,
    createUserskill,
    getAllUserskill,
    getUserskillById,
    updateUserskill,
    deleteUserskill
}   