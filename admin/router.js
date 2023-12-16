const Router = require('express');
const listUser = require('./module')
const {authorizeUser,authorizeAdmin} = require("../auth/authentication")

const router = Router()
router.get('/users',authorizeUser,authorizeAdmin,async(req,res,next)=>{
    try {
        res.status(200).send(await listUser())
    } catch (err) {
        next(err)
    }
})

module.exports = router