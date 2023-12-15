
const {createUserValidation,loginValidation, updateUserValidation} = require('./validation')
const {UserModel,userTypes} = require('./model');
const {createToken,hashPassword, comparePassword,authorizeUser} = require('../auth/authentication');

async function createUser(body){
    try {
        const {name,email,password} = await createUserValidation.validateAsync(body);
        const user = await UserModel.findOne({email,isActive : true})
        if(user){
            throw new Error("User already found")
        }
        const hashedPassword = await hashPassword(password)
        const addUser = await UserModel.create({ name, email, password : hashedPassword, user_type : userTypes[1] });
        const jwtTokenBody = {id : addUser.id,userType : addUser.user_type}
        const jwtToken = await createToken(jwtTokenBody)
        return {message : "User created succesfully",jwtToken : jwtToken }
    } catch (e) {
        throw(e)
    }
}

async function login(body){
    try {
        const {email,password} = await loginValidation.validateAsync(body);
        const user = await UserModel.findOne({email,isActive:true})
        if(!user){
            throw new Error("User doesn't exist .Please sign up")
        }
        const match = await comparePassword(password,user.password);
        if(!match){
            throw new Error("Incorrect Password")
        }
        

        const jwtTokenBody = {id : user.id,userType : user.user_type}
        const jwtToken = await createToken(jwtTokenBody)
        return {message : "User logged in successfully",jwtToken : jwtToken }
    } catch (e) {
        throw e
    }
}

async function updateUser(body,id){
    try {
        console.log(body)
        const user = await UserModel.findById(id)
        if(!user){
            throw new Error("User not found")
        }
        let data = await updateUserValidation.validateAsync(body);
        console.log('------');
        console.log(data)
        if(data.password){
            user.password = await  hashPassword(data.password)
        }
        if(data.name){
            user.name = data.name
        }
        if(data.email){
            user.email = data.email
        }
        const updateUser = await user.save()

        return {message : 'succesfully updated user information',name : updateUser.name,email :updateUser.email}



    } catch (err) {
        throw err
    }
}

async function deleteUser(id){
    try{
       const res =  await UserModel.updateOne({_id : id},{isActive:false})
        return {message:'delete successfully',ress : res}
    }catch(err){
        throw err
    }
}

async function listUser(){
    try{
        return await UserModel.findAll()
    }catch(err){
        throw err
    }
}

module.exports = {createUser,login,updateUser,deleteUser}