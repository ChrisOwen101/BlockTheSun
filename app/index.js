const imagecapture = require('./imagecapture.js');
const filenames = require('./filenames.js');
const fs = require('fs');

const express = require('express'), bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.use(bodyParser.json());

app.post('/', (request, response) => {
  console.log(request.body.url)
  var url = request.body.url;
  var filename = filenames.getFileName(url);

  if (fs.existsSync('./' + filename)) {
    returnImage(filename,response);
  } else {
      imagecapture.storeImage(request.body.url, function(error){
        if(error === null){
          returnImage(filename,response);
        }
      });
  }

  imagecapture.storeImage(request.body.url);
})

function returnImage(filename, response){
  var img = fs.readFileSync('./' + filename);
  response.writeHead(200, {'Content-Type': 'image/jpg' });
  response.end(img, 'binary');
}

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)

})
