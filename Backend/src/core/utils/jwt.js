const jwt = require("jsonwebtoken");

const generateAccessToken = ({userId}) => {
    return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
}

const generateRefreshToken =({userId}) => {
    return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

const verifyAccessToken = ({token}) => {

    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

}

const verifyRefreshToken = ({token}) => {

    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

}

const decodeToken = ({token}) => {
    return jwt.decode(token);

}





module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    decodeToken
}