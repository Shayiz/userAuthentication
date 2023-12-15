const Router = require('express');
const {createUser,login,updateUser,deleteUser} = require('./module')
const {authorizeUser} = require("../auth/authentication")


const router = Router();

router.post('/register',async(req,res,next)=>{
    try {
        const {body} = req
        res.status(201).send(await createUser(body))
    } catch (err) {
        next(err)
    }
    
})
router.post('/login',async(req,res,next)=>{
    try {
        const {body} = req
        res.status(200).send(await login(body))
    } catch (err) {
        next(err)
    }
    
})

router.put('/',authorizeUser,async(req,res,next)=>{
    try {
        const {body} = req
        res.status(200).send(await updateUser(body,req.user.id))
    } catch (err) {
        next(err)
    }
})

router.delete('/',authorizeUser,async(req,res,next)=>{
    try {
        res.status(200).send(await deleteUser(req.user.id))
    } catch (err) {
        next(err)
    }
})




module.exports = router
