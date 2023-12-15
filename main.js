const {connectToDatabase} = require('./database')
const app = require('./app');
const { UserModel } = require('./user/model');
const { hashPassword } = require('./auth/authentication');

const adminUserName = process.env.name || "admin";
const adminPassword = process.env.adminPassword || 'password'
const adminEmail = process.env.adminEmail || 'admin@email.com'
const PORT = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/userDB'
async function main(){
    await connectToDatabase(dbUrl);
    const admin =await UserModel.findOne({user_type : 'admin'})
    if(!admin){
        const hashedPassword = await hashPassword(adminPassword)
    await UserModel.create({name : adminUserName,password : hashedPassword,email : adminEmail,user_type : 'admin'})
    console.log("Created admin")
    }
    console.log('admin panel is ready')
    app.listen(PORT, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Server started on port: ${PORT}`);
        }
      });
}

main()