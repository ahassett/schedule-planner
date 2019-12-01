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

    // defining the variables we want to capture
    var department, classname, description, termsOffered, link;
    var dict = []
    var departmentList = []
    //var courseLinks = []

    url = 'http://www.middlebury.edu/academics/catalog/depts'

    // NOTE: structure of request call
    // param 1 - url
    // param 2 - callback function w error, repsose status, and html
    request(url, function (error, response, html) {
        if (!error){
            let $ = cheerio.load(html);

            // push every link found with <a> tag into array
            $('.field-items a').each( (index, value) => {
                let link = $(value).attr('href');
                if(link.includes('/academics/') && !link.includes('catalog') && !link.includes('handbook') && !link.includes('classical')) {
                    console.log(link)
                    // extract the classnames
                    const startIndex = link.search('/academics/') + '/academics/'.length
                    const endIndex = link.substring(startIndex).search('/') != -1 ? link.substring(startIndex).search('/') + startIndex : link.length
                    department = link.substring(startIndex, endIndex)

                    if (!departmentList.includes(department)) {
                        departmentList.push(department);
                        //courseLinks.push('http://www.middlebury.edu/academics/' + department + '/courses');
                    }
                }
            })
            //console.log(courseLinks)

            departmentList.forEach( (department) => {
                //console.log(department)
                request('http://www.middlebury.edu/academics/'+ department +'/courses', function (error, response, html) {

                    let classnameArray = [] // a fresh array for each url
                    let descriptionArray = []
                    let termsOfferedArray = []

                    if (!error) {
                        $ = cheerio.load(html);
                        $('.coursetitle').each((index, value) => {
                            classnameArray.push(value.children[0]['data'].replace(/^\s+|\s+$/g, ''))
                        })
                        $('.coursedesc p').each((index, value) => {


                            const item = $(value).text().split('\n')
                            //console.log(item[0])

                            // extract term
                            if ((item[0].includes('Fall 20') || item[0].includes('Spring 20') || item[0].includes('Winter 20') && item.length == 1) && !item[0].includes('.')) {
                                termsOfferedArray.push(item[0])
                            }
                            else if (!item[0].includes('More Information ')) { // extract course description
                                    descriptionArray.push(item[item.length-1])
                            }

                            //
                            // if (item[0].includes('Fall 20') || item[0].includes('Spring 20') || item[0].includes('Winter 20') && item.length == 1) {
                            //     itemString = item[0]
                            //     termsOfferedArray.push(itemString)
                            // } else if (item.length > 1) {
                            //     if ( !item[0].includes('More Information >>'))
                            //     itemString = item[1]
                            //     descriptionArray.push(itemString)
                            // } else {
                            //     //console.log(item)
                            // }
                        })
                        console.log('term offered: ' + termsOfferedArray.length)
                        console.log('description offered: ' + descriptionArray.length)
                        console.log('class offered: '+ classnameArray.length)
                        //
                        if (descriptionArray.length != termsOfferedArray.length){
                            console.log(descriptionArray)
                            console.log(termsOfferedArray)
                        }
                        if (classnameArray.length != termsOfferedArray.length){
                            console.log(descriptionArray)
                            console.log(termsOfferedArray)
                        }


                        // store everything in json object
                        // for (let i = 0; i < termsOfferedArray.length; i++) {
                        //     dict.push({
                        //         department : department,
                        //         classname: classnameArray[i],
                        //         description: descriptionArray[i],
                        //         termsOffered: termsOfferedArray[i]
                        //     })
                        // }
                        //console.log(dict)


                            // item contains both description and term termsOffered
                            //console.log(item.length)
                            //if (item.length > 1) {
                            //    descriptionArray.push(item[1])
                                //console.log(item)
                            //}

                        //$('.coursetitle').text().replace(/[^\w\s]/gi, '')

                        //$('*').each( (index, value) => {
                                //json.classname = $('.coursetitle').children[0]['data'].replace(/^\s+|\s+$/g, '')  // class title -- getting rid of trailing white spaces

                        //});
                    }
                                    res.set(dict);
                })
            })
            console.log(dict)
            // res.send(dict);
    }})
});
