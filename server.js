const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = Number(process.env.PORT || 5000);
const client = require('@sendgrid/mail');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname));

//ROUTING
const options = {
    root: __dirname
};

app.get('*', function (req, res) {
    res.sendFile('./index.html', options)
});

client.setApiKey(process.env.API_KEY);

//CONTACT FORM
app.post('/contact', function (req, res) {
    const msg = {
        to: process.env.EMAIL_TO, // recipient
        from: process.env.EMAIL_FROM, // verified sender
        subject: 'Portfolio Website Contact Form',
        text: `${req.body.name} tried getting in touch from: ${req.body.email}(Tel: ${req.body.tel}). Their message: ${req.body.message}`
    }

    client
        .send(msg)
        .then(() => {
            console.log('Email sent')
            res.redirect('/thanks')
        })
        .catch((error) => {
            console.error(error)
        })
});

// Starting server
var server = http.createServer(app).listen(port, function () {
    console.log("Server is Running on 127.0.0.1:" + port);
});
