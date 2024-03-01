// htmlResponses.js by Austin Willoughby

const fs = require('fs'); // pull in the file system module

// load files into memory
// This is a synchronous operation, so you'd only
// want to do it on startup.
// This not the best way to load files unless you have few files.
// const index = fs.readFileSync(`${__dirname}/../client/client.html`);
// const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// function to get the index page

// function to get css page
const getCSS = (request, response, styleSheet) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(fs.readFileSync(`${__dirname}/../client/${styleSheet}`));
  response.end();
};

const getIndex = (request, response, htmlFile) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(fs.readFileSync(`${__dirname}/../client/${htmlFile}`));
  response.end();
};

const getStyle1 = (request, response) => {
  getCSS(request, response, 'style.css');
};

const getStyle2 = (request, response) => {
  getCSS(request, response, 'style2.css');
};

const getClient1 = (request, response) => {
  getIndex(request, response, 'client.html');
};

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
