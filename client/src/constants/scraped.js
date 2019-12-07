const request = require('request');
const cheerio = require('cheerio');

function logClassesInfo() {

            var department, classname, description, termsOffered, link;
            var data = {};
            var departmentList = [];

            const proxyurl = 'https://guarded-scrubland-52727.herokuapp.com/';
            const url = 'http://www.middlebury.edu/academics/catalog/depts'; // site that doesn’t send Access-Control-*

            request(proxyurl + url, function (error, response, html) {
                if (!error){
                    let $ = cheerio.load(html);

                    // push every link found with <a> tag into array
                    $('.field-items a').each( (index, value) => {
                        let link = $(value).attr('href');
                        if(link.includes('/academics/') && !link.includes('catalog') && !link.includes('handbook') && !link.includes('classical') && !link.includes('fys')) {

                            // extract the classnames
                            const startIndex = link.search('/academics/') + '/academics/'.length
                            const endIndex = link.substring(startIndex).search('/') != -1 ? link.substring(startIndex).search('/') + startIndex : link.length
                            department = link.substring(startIndex, endIndex)

                            if (!departmentList.includes(department)) {
                                departmentList.push(department);
                            }
                        }
                    })

                    departmentList.forEach( (department) => {

                        request(proxyurl + 'http://www.middlebury.edu/academics/'+ department +'/courses', function (error, response, html) {

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

                                    // extract term
                                    if ((item[0].includes('Fall 20') || item[0].includes('Spring 20') || item[0].includes('Winter 20') && item.length == 1) && !item[0].includes('.')) {
                                        termsOfferedArray.push(item[0])
                                    }
                                    else if (!item[0].includes('More Information ')) { // extract course description

                                            if (item[item.length-1].includes('     ')) {
                                                descriptionArray.push(item[item.length-2])
                                            } else {
                                                descriptionArray.push(item[item.length-1])
                                            }
                                    }

                                })

                                // store everything in json object
                                for (let i = 0; i < termsOfferedArray.length; i++) {
                                    data[i] = {
                                        department : department,
                                        classname: classnameArray[i],
                                        description: descriptionArray[i],
                                        termsOffered: termsOfferedArray[i]
                                    };
                                //    console.log(data[i])
                                }
                           }
                       })
                   })
            }
        });
    }

logClassesInfo();

export default logClassesInfo;
