const fs = require('fs'); // pull in the file system module

const getImage = (request, response, params) => {
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.write(fs.readFileSync(`${__dirname}/../client/media/${params.name}`));
    response.end();
}
  

module.exports.getImage = getImage;
