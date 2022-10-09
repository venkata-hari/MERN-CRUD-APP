import express from 'express'
const router=express.Router()
router.get("/auth",(req,res)=>{
    res.send("hello this is user")
})
export default router;