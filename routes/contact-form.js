const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const config = require('../config/config')
const nodemailer = require('nodemailer')
app.get('/contact', (req,res)=> {
   let HTML = fs.readFileSync(path.join(__dirname, '..', "contactform.html" ))
    res.send(`${HTML}`)
});
const transport = {
    host: 'weaver.whogohost.com',
    port: 26,
    secure: false,
    auth: {
        user: config.USER,
        pass: config.PASSWORD
    },
    tls:{
        rejectUnauthorized: false
    }
};
const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success)=>{
    if(error){
        console.log(error)
    } else{
        console.log('Server is ready to take messages', success)
    }
});

app.post('/send',(req, res)=> {
    let {name, email, message} = req.body;

    let content = `<h1>A message just came from ${name} ${email}</h1>
                    <h2>Here is the message</h2>
                    <p>${message}</p>`
    let mail = {
        from: "Degraphetech <deba@yeme.com.ng>",
        to: 'debaosuidecl@gmail.com',
        subject: `A new message from ${name}`,
        html: content
    }

    transporter.sendMail(mail, (err, data)=> {
        if (err){
            res.send('Failed to send your message');
        } else{
            res.send('Your message has been sent');
        }
        console.log(data);
    })
});

module.exports = app;