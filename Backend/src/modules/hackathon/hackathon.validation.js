const z = require("zod")

const createHackathonValidation = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    description: z.string().min(3, "Description must be at least 3 characters long"),
    organizer: z.string().min(3, "Organizer must be at least 3 characters long"),
    mode: z.string().min(3, "Mode must be at least 3 characters long"),
    location: z.string().min(3, "Location must be at least 3 characters long"),
    startDate: z.string().min(3, "Start date must be at least 3 characters long"),
    endDate: z.string().min(3, "End date must be at least 3 characters long"),
    registrationDeadline: z.string().min(3, "Registration deadline must be at least 3 characters long"),
    maxTeamSize: z.number().min(3, "Max team size must be at least 3"),
    prizePool: z.string().min(3, "Prize pool must be at least 3 characters long"),
    website: z.string().min(3, "Website must be at least 3 characters long"),
    image: z.string().min(3, "Image must be at least 3 characters long"),
    status: z.string().min(3, "Status must be at least 3 characters long"),
})


const updateHackathonValidation = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    description: z.string().min(3, "Description must be at least 3 characters long"),
    organizer: z.string().min(3, "Organizer must be at least 3 characters long"),
    mode: z.string().min(3, "Mode must be at least 3 characters long"),
    location: z.string().min(3, "Location must be at least 3 characters long"),
    startDate: z.string().min(3, "Start date must be at least 3 characters long"),
    endDate: z.string().min(3, "End date must be at least 3 characters long"),
    registrationDeadline: z.string().min(3, "Registration deadline must be at least 3 characters long"),
    maxTeamSize: z.number().min(3, "Max team size must be at least 3"),
    prizePool: z.string().min(3, "Prize pool must be at least 3 characters long"),
    website: z.string().min(3, "Website must be at least 3 characters long"),
    image: z.string().min(3, "Image must be at least 3 characters long"),
    status: z.string().min(3, "Status must be at least 3 characters long"),
})

const deleteHackathonValidation = z.object({
    id: z.number().min(3, "Id must be at least 3 digits long"),
})

const getHackathonByIdValidation = z.object({
    id: z.number().min(3, "Id must be at least 3 digits long"),
})

const getAllHackathonsValidation = z.object({
    page: z.number().min(3, "Page must be at least 3 digits long"),
    limit: z.number().min(3, "Limit must be at least 3 digits long"),
})  

module.exports = {
    createHackathonValidation,
    updateHackathonValidation,
    deleteHackathonValidation,
    getHackathonByIdValidation,
    getAllHackathonsValidation
}
