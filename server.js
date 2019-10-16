const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

// setting port for running Express server
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route -- to be able to fetch from client
app.get('/express_backend', (req, res) => {

    url = 'http://www.middlebury.edu/academics/catalog/depts'

    // NOTE: structure of request call
    // param 1 - url
    // param 2 - callback function w error, repsose status, and html
    request(url, function (error, response, html) {
        if (!error){
            const $ = cheerio.load(html);

            // defining the variables we want to capture.
            let department, classname, description, termsOffered, link;
            let json = { department : "", classname: "", description: "", termsOffered: "", link: "" };
            classLinks = []

            // push every link found with <a> tag into array
            $('.field-items a').each( (index, value) => {
                let link = $(value).attr('href');
                if(link.includes('/academics/') && !link.includes('catalog') && !link.includes('handbook')) {
                    classLinks.push(link);
                }
            })


                            console.log(classLinks)
        }
    })
  res.send({ express: 'helo' });
});
