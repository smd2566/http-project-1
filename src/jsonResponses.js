// respondJSON, respondJSONMeta, notFound, notFoundMeta by Austin Willoughby

const rides = {};

const respondJSON = (request, response, status, object) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response with json object
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

// function to respond without json body
// takes request, response and status code
const respondJSONMeta = (request, response, status) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response without json object, just headers
  response.writeHead(status, headers);
  response.end();
};

const getRides = (request, response) => {
  // json object to send
  const responseJSON = {
    rides,
  };

  // return 200 with message
  return respondJSON(request, response, 200, responseJSON);
};

// get meta info about user object
// should calculate a 200
// return 200 without message, just the meta data
const getRidesMeta = (request, response) => respondJSONMeta(request, response, 200);

// function just to update our object
const addRide = (request, response, body) => {
  const responseJSON = {
    message: 'Ride name and placement are both required.',
  };

  if (!body.name || !body.placement) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 204;
  if (!rides[body.name]) {
    responseCode = 201;
    rides[body.name] = {};
  }

  rides[body.name].name = body.name;
  rides[body.name].placement = body.placement;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

const notFound = (request, response) => {
  // create error message for response
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return a 404 with an error message
  respondJSON(request, response, 404, responseJSON);
};

// function for 404 not found without message
const notFoundMeta = (request, response) => {
  // return a 404 without an error message
  respondJSONMeta(request, response, 404);
};

// set public modules
module.exports = {
  notFound,
  notFoundMeta,
  getRides,
  getRidesMeta,
  addRide,
};
