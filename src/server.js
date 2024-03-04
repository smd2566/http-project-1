// Initial Server.js structure by Austin Willoughby
const http = require('http'); // http module
const url = require('url'); // url module
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const imageHandler = require('./imageResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const parseBody = (request, response, handler) => {
  const body = [];

  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);
    handler(request, response, bodyParams);
  });
};

// here we create a object to route our requests to the proper
// handlers. the top level object is indexed by the request
// method (get, head, etc). We can use request.method to return
// the routing object for each type of method. Once we say
// urlStruct[request.method], we recieve another object which
// routes each individual url to a handler. We can index this
// object in the same way we have used urlStruct before.
const urlStruct = {
  GET: {
    '/': htmlHandler.getClient1,
    '/style.css': htmlHandler.getStyle1,
    '/style2.css': htmlHandler.getStyle2,
    '/getRides': jsonHandler.getRides,
    '/viewPlot': htmlHandler.getClient2,
    '/getPlotData': jsonHandler.getPlotData,
    '/getBumperCars': imageHandler.getBumperCars,
    '/getCarousel': imageHandler.getCarousel,
    '/getEmptyPlot': imageHandler.getEmptyPlot,
    '/getFerrisWheel': imageHandler.getFerrisWheel,
    '/getRollerCoaster': imageHandler.getRollerCoaster,
    '/getSlide': imageHandler.getSlide,
    '/getSky': imageHandler.getSky,

    notFound: jsonHandler.notFound,
  },
  // static file hosting for above and beyond
  HEAD: {
    '/getRides': jsonHandler.getRidesMeta,
    notFound: jsonHandler.notFoundMeta,
  },
  POST: {
    '/addRide': (req, res) => parseBody(req, res, jsonHandler.addRide),
  },
};

// function to handle requests
const onRequest = (request, response) => {
  // first we have to parse information from the url
  const parsedUrl = url.parse(request.url);

  const params = query.parse(parsedUrl.query);

  // next we need to ensure that we can handle the request
  // method that they are making the request with. This server
  // is only built to handle GET and HEAD requests, so we want
  // to send back a 404 if they make anything else. We can use
  // the HEAD version of notFound to send just a 404 status code.
  if (!urlStruct[request.method]) {
    return urlStruct.HEAD.notFound(request, response, params);
  }

  // now we check to see if we have something to handle the
  // request. This syntax may look verbose, but essentially
  // what we are doing is indexing into urlStruct by the method
  // which returns another object. We then index into that object
  // by the pathname to get the handler. Inside the if, we can
  // use that same syntax to call the actual function.
  if (urlStruct[request.method][parsedUrl.pathname]) {
    return urlStruct[request.method][parsedUrl.pathname](request, response, params);
  }

  return urlStruct[request.method].notFound(request, response, params);
};

// start server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
