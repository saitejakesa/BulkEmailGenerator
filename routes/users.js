var express = require('express');
var router = express.Router();
const {mongoose,emailmodel,signupdetails,bodymodel} = require('../dbSchema')
const {hashpassword,hashcompare,createToken,validate,validatetoken,roleAdmin} = require('../auth')
const {mongodb,dbName,dbUrl} = require('../dbconfig');
const { mailsending } = require('./mailsending');


/* Posting emails. */
router.get('/',async(req,res)=>{
  mongoose.connect(dbUrl)
  let token=req.headers.authorization.split(" ")[1]
  let data = await validate(token)
  let user=await emailmodel.findOne({email:res.email})
  if(user){
    let users=await emailmodel.find()
  res.send({
    statusCode:200,
    data:users
  })
  }
  else{
    res.send({
      statusCode:404,
      message:"unauthorized"
    })
  }
})
router.post('/todetails',async(req,res)=>{
  mongoose.connect(dbUrl)
  try{
    let name=req.body.name
    let validate =await emailmodel.findOne({email:req.body.email})
    if(!validate){
      let newdetails = await emailmodel.create(req.body);
      res.send({
        statusCode:200,
        message:"email Added Sucessfully"
      })
    }
    else{
      res.send({
        statusCode:400,
        message:"Email already present"
      })
      

    }
      
  }
  catch(error){
    console.log(error)
    res.send({statusCode:400,message:"Internal Server Error",error})
  }
})
router.post('/signup',async(req,res)=>{
  mongoose.connect(dbUrl)
  try{
    let details = await signupdetails.find({fromemail:req.body.fromemail});
    if(details.length){
      res.send({
        statusCode:400,
        message:"User Already exists"
      })
      
    }
    else{
      let hashedpassword= await hashpassword(req.body.password)
      req.body.password=hashedpassword
      let newusers=await signupdetails.create(req.body)
    res.send({
      statusCode:200,
      message:"Sign Up Successfull"
    })
  }
  }
  catch(error){
    console.log(error)
    res.send({statusCode:400,message:"Internal Server Error",error})
  }
})

router.post('/login',async(req,res)=>{
  mongoose.connect(dbUrl)
  try{
    let emailuser= await signupdetails.find({fromemail:req.body.fromemail})
    if(emailuser.length){
      let hash=await hashcompare(req.body.password,emailuser[0].password)
        if(hash){
          let token= await createToken(emailuser[0].email,emailuser[0].role)
          res.send({
            statusCode:200,
            message:"Login Succesfull",
            token
          })
        }
        else{
          res.send({
            statusCode:400,
          message:"Invalid User"
        })
        }
    }
    else{
      res.send({
        statusCode:400,
        message:"User Does Not Exist"
      })
    }
  }
  catch(error){
    console.log(error)
    res.send({statusCode:400,message:"Internal Server Error",error})
  }
})

router.get('/allemail',async(req,res)=>{
  mongoose.connect(dbUrl)
  try{
    let users= await emailmodel.find()
    res.send({
      statusCode:200,
      users
    })
  }
  catch(error){
    console.log(error)
    res.send({statusCode:400,message:"Internal Server Error",error})
  }
})

router.post('/body',async(req,res)=>{
  mongoose.connect(dbUrl)
  try{
    let bodyemails= await bodymodel.create(req.body);
    res.send({
      statusCode:200,
        message:"Details Added Sucessfully",
    })
  }
  catch(error){
    console.log(error)
    res.send({statusCode:400,message:"Internal Server Error",error})
  }
})

router.get('/from',validatetoken,roleAdmin,async(req,res)=>{
  mongoose.connect(dbUrl)
  let fromuser= await signupdetails.find({email:req.body.email})
})
router.post('/sendemail',(req,res)=>{
  mongoose.connect(dbUrl)
  try{
    mailsending(req,res)
  }
  catch(error){
    console.log(error)
  }
});

module.exports = router;
