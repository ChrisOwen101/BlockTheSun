function storeImage(url, fn){
  var webshot = require('webshot');
  var filenames = require('./filenames.js');

  var options = {
    screenSize: {
      width: 1920,
      height: 1080
    },
    streamType : "jpg",
    shotSize: {
      width: 'all',
      height: 'all'
    },
    renderDelay: 500
  };

  webshot(url, filenames.getFileName(url), options, fn);
}

module.exports.storeImage = storeImage;
