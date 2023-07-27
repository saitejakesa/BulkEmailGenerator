const nodemailer=require("nodemailer")


function mailsending(req,res){
  try{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: req.body.fromemail,
          pass: req.body.password
        }
    });
  
    var mailOptions = {
      
        from: req.body.fromemail,// sender address
        to: req.body.toemails.join(", "), // list of receivers
        subject: req.body.subject, // Subject line
        html: `
        <div>${req.body.body}</div>
        `
    };
     
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          res.status(200).json({status: true, message: 'Email Not sent'})
          console.log(error)
        } 
        else
        {
          res.status(200).json({status: true, message: 'Email Sent Successfully'})
        }
     
      });
    }
    catch(error){
      console.log(error)
    }
}
exports.mailsending=mailsending