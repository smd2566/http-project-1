const fs = require('fs'); // pull in the file system module

const bumperCarsImage = fs.readFileSync(`${__dirname}/../client/media/bumperCars.png`);
const carouselImage = fs.readFileSync(`${__dirname}/../client/media/carousel.png`);
const emptyPlotImage = fs.readFileSync(`${__dirname}/../client/media/emptyPlot.png`);
const ferrisWheelImage = fs.readFileSync(`${__dirname}/../client/media/ferrisWheel.png`);
const rollerCoasterImage = fs.readFileSync(`${__dirname}/../client/media/rollerCoaster.png`);
const slideImage = fs.readFileSync(`${__dirname}/../client/media/slide.png`);
const skyImage = fs.readFileSync(`${__dirname}/../client/media/skyImage.jpg`);

const getBumperCars = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(bumperCarsImage);
  response.end();
};

const getCarousel = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(carouselImage);
  response.end();
};

const getEmptyPlot = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(emptyPlotImage);
  response.end();
};

const getFerrisWheel = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(ferrisWheelImage);
  response.end();
};

const getRollerCoaster = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(rollerCoasterImage);
  response.end();
};

const getSlide = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(slideImage);
  response.end();
};

const getSky = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.write(skyImage);
    response.end();
  };
  

module.exports.getBumperCars = getBumperCars;
module.exports.getCarousel = getCarousel;
module.exports.getEmptyPlot = getEmptyPlot;
module.exports.getFerrisWheel = getFerrisWheel;
module.exports.getRollerCoaster = getRollerCoaster;
module.exports.getSlide = getSlide;
module.exports.getSky = getSky;
