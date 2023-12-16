const {UserModel, userTypes} = require('../user/model')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { sign: jwtSign, verify: jwtVerify } = jwt;
const ACCESS_TOKEN_LIFETIME = process.env.ACCESS_TOKEN_LIFETIME || '1d'
const JWT_SECRET = process.env.JWT_SECRET || 'UserAssignment';
const SALT_ROUND = 10

async function createToken(
    body,
    expiresIn = ACCESS_TOKEN_LIFETIME 
  ) {
    return jwtSign({ ...body }, JWT_SECRET, {
      expiresIn,
    });
  }

  async function hashPassword(password) {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      return hashedPassword;
    } catch (error) {
      throw new Error(`Error hashing password: ${error.message}`);
    }
  }

  async function comparePassword(password, hashedPassword) {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
  
      return match;
    } catch (error) {
      throw new Error(`Error comparing passwords: ${error.message}`);
    }
  }

  async function jwtTokenVerify(token) {
    const valid = await jwtVerify(token, JWT_SECRET);
    return valid;
  }

 const authorizeUser = async (req, res, next) => {
    let token = null;
    if (req.headers && req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts.length === 2 && parts[0] === "Bearer") {
        token = parts.pop();
      }
    }

    try {
       
      if (token) {
        const {id,userType } = await jwtTokenVerify(token);
        if (!id) {
          throw new Error(
            JSON.stringify({
              code: 401,
              message: "Invalid  Token",
            })
          );
        }
        const user = UserModel.findOne({_id : id,isActive : true})
        if(!user){
            throw new Error(
                JSON.stringify({
                  code: 401,
                  message: "User Not found or Not Active",
                })
              );
        }
        req.user = {id,userType}
      }
      else{
        res
        .status(401)
        .send({ message: "jwtToken not found" });
      return;
      }
    } catch (error) {
      res
        .status(401)
        .send({ message: error.message });
      return;
    }
    next();
  };
const authorizeAdmin = async (req,res,next) => {
    try {
        if(!(req.user.userType === userTypes[0])){
            throw new Error(
                JSON.stringify({
                  code: 401,
                  message: "Only admin can perform this action",
                })
              );
        }
    } catch (error) {
        res
        .status(401)
        .send({ message: error.message });
      return;
    }
    next()
}

  module.exports = {createToken,hashPassword,comparePassword,authorizeUser,authorizeAdmin}
