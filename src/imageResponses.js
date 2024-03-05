const fs = require('fs'); // pull in the file system module

//Retrieves the requested image based on query parameters, and sends it back to the server
const getImage = (request, response, params) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(fs.readFileSync(`${__dirname}/../client/media/${params.name}`));
  response.end();
};

//Exports the getImage function
module.exports.getImage = getImage;
