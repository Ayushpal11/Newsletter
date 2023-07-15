const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', function(req, res) {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    const jsonData = JSON.stringify(data);

    const url = 'https://us21.api.mailchimp.com/3.0/lists/695743e77b';
    const options = {
        method: 'POST',
        auth: 'ayush:b15c18fe5201f5a9e0aaadbdba67721a-us21'
    };

    const request = https.request(url, options, function(response) {
        console.log(response.statusMessage);
        if (response.statusCode === 200) {
            res.sendFile(path.join(__dirname, 'success.html'));
        } else {
            res.sendFile(path.join(__dirname, 'failure.html'));
        }
    });

    request.write(jsonData);
    request.end();
});
app.post('/success', function(req, res) {
    res.redirect('/');
});
app.post('/failure', function(req, res) {
    res.redirect('/');
});

app.listen(4000, function() {
    console.log('Server is running on port 4000');
});


//
//
//b15c18fe5201f5a9e0aaadbdba67721a-us21