 

const passportRepository = require("./builderPassport.repository");
const ApiError = require("../../core/utils/apiError");


// Create Passport
const createPassportService = async ({
    userId,
    github,
    linkedin,
    leetcode,
    codeforces,
    portfolio
}) => {

    const existingPassport =
        await passportRepository.findByUserId(userId);


    if(existingPassport){

        throw new ApiError(
            400,
            "Passport already exists"
        );

    }


    const totalScore = calculateScore({
        github,
        leetcode,
        codeforces
    });


    return passportRepository.createPassport({

        userId,
        github,
        linkedin,
        leetcode,
        codeforces,
        portfolio,
        totalScore

    });

};



// Get My Passport
const getMyPassportService = async(userId)=>{


    const passport =
        await passportRepository.findByUserId(userId);


    if(!passport){

        throw new ApiError(
            404,
            "Passport not found"
        );

    }


    return passport;

};




// Get Passport By UserId
const getPassportByUserIdService = async(userId)=>{


    const passport =
        await passportRepository.findByUserId(userId);


    if(!passport){

        throw new ApiError(
            404,
            "Passport not found"
        );

    }


    return passport;

};




// Update Passport
const updatePassportService = async({

    userId,
    github,
    linkedin,
    leetcode,
    codeforces,
    portfolio

})=>{


    const passport =
        await passportRepository.findByUserId(userId);



    if(!passport){

        throw new ApiError(
            404,
            "Passport not found"
        );

    }



    const totalScore = calculateScore({

        github,
        leetcode,
        codeforces

    });



    return passportRepository.updatePassport({

        userId,

        github,
        linkedin,
        leetcode,
        codeforces,
        portfolio,

        totalScore

    });


};




// Delete Passport
const deletePassportService = async(userId)=>{


    const passport =
        await passportRepository.findByUserId(userId);



    if(!passport){

        throw new ApiError(
            404,
            "Passport not found"
        );

    }


    return passportRepository.deletePassport(userId);

};




// Score Calculation
const calculateScore = ({
    github,
    leetcode,
    codeforces
})=>{


    let score = 0;


    if(github)
        score += 100;


    if(leetcode)
        score += 100;


    if(codeforces)
        score += 100;


    return score;

};



module.exports = {

    createPassportService,

    getMyPassportService,

    getPassportByUserIdService,

    updatePassportService,

    deletePassportService

};