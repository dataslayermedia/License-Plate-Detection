// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
var fs = require('fs');






async function setEndpoint() {
    // Specifies the location of the api endpoint
    const clientOptions = { apiEndpoint: 'eu-vision.googleapis.com' };

    // Creates a client
    const client = new vision.ImageAnnotatorClient(clientOptions);

    // Performs text detection on the image file
    const [result] = await client.textDetection('./images/cali.jpg');
    const labels = result.textAnnotations;
    console.log('Text:');

    //  labels.forEach(label => console.log(label.description));

    //console.log(labels);

    labels.forEach(function (a, b) {

        //console.log(a.description);

        if (/[A-Z0-9]{5,}/.test(a.description)) {

            // console.log(a.description.match(/[A-Z0-9]{5,}/));

            var license_number = a.description.match(/[A-Z0-9]{5,}/)[0];

            console.log(license_number);



            var data = fs.readFileSync('./html/index.html', 'utf-8');

            var newValue = data.replace(/class="license">.*?</gim, 'class="license">' + license_number + '<');

            fs.writeFileSync('./html/index.html', newValue, 'utf-8');

            console.log('readFileSync complete');


        }



    });

}
setEndpoint();