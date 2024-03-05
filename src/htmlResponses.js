// htmlResponses.js initial structure / first comment block by Austin Willoughby

const fs = require('fs'); // pull in the file system module

// load files into memory
// This is a synchronous operation, so you'd only
// want to do it on startup.

// function to get the index page

// function to get a specified css page
const getCSS = (request, response, styleSheet) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(fs.readFileSync(`${__dirname}/../client/${styleSheet}`));
  response.end();
};

//function to get a specified index page
const getIndex = (request, response, htmlFile) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(fs.readFileSync(`${__dirname}/../client/${htmlFile}`));
  response.end();
};

//Retrieves the style.css
const getStyle1 = (request, response) => {
  getCSS(request, response, 'style.css');
};

//Retrieves the style2.css
const getStyle2 = (request, response) => {
  getCSS(request, response, 'style2.css');
};

//Retrieves the client.html
const getClient1 = (request, response) => {
  getIndex(request, response, 'client.html');
};

//Retrieves the client2.html
const getClient2 = (request, response) => {
  getIndex(request, response, 'client2.html');
};

// set out public exports
module.exports = {
  getClient1,
  getClient2,
  getStyle1,
  getStyle2,
};
