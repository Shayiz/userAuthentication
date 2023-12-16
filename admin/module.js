const {UserModel} = require('../user/model');
async function listUser(){
    try{
        return await UserModel.find({user_type: { $ne: 'admin' }}).select({name : 1,email : 1,
            createdAt : 1,isActive : 1})
    }catch(err){
        throw err
    }
}

module.exports = listUser