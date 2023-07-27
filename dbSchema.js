const mongoose = require('mongoose')
const validator= require('validator')

var todetailsschema = new mongoose.Schema({
    name:{type:'string',required:true},
    email:{
        type:'string',
        required:'true',
        lowercase:'true',
        validate:(value)=>{
            return validator.isEmail(value)
        }
},
})

var detailsschema = new mongoose.Schema({
    name:{type:'string',required:true},
    fromemail:{
        type:'string',
        required:'true',
        lowercase:'true',
        validate:(value)=>{
            return validator.isEmail(value)
        }
    },
    password:{type:'string',required:true},
    companyname:{type:'string',required:true},
    role:{type:'string',default:'adminUser'} 
})

var bodymodelschema = new mongoose.Schema({
    subject:{type:'string',required:true},
    body:{type:'string',required:true}
})



let emailmodel=mongoose.model('emails',todetailsschema)
let signupdetails=mongoose.model('signupdetails',detailsschema)
let bodymodel=mongoose.model('bodyemails',bodymodelschema)
module.exports={mongoose,emailmodel,signupdetails,bodymodel}