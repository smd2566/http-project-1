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
    message: 'Ride name, location and ride type are all required.',
  };

  if (!body.location || !body.name || !body.rideType) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 204;
  if (!rides[body.location]) {
    responseCode = 201;
    rides[body.location] = {};
  }

  rides[body.location].location = body.location;
  rides[body.location].name = body.name;
  rides[body.location].rideType = body.rideType;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

const viewPlot = (request, response, params) => {
  const responseObject = {
    message: 'This request has the required parameters',
  };

  switch (params.plotNumber) {
    case 0:
      // content.innerHTML = '<b>Success</b>';
      break;
    case 1:
      // content.innerHTML = '<b>Bad Request</b>';
      break;
    case 2:
      // content.innerHTML = '<b>Unauthorized</b>';
      break;
    case 3:
      // content.innerHTML = '<b>Forbidden</b>';
      break;
    case 4:
      // content.innerHTML = '<b>Not Found</b>';
      break;
    case 5:
      // content.innerHTML = '<b>Internal Server Error<b>';
      break;
    case 6:
      // content.innerHTML = '<b>Not Implemented<b>';
      break;
    case 7:
      // content.innerHTML = '<b>Not Implemented<b>';
      break;
    case 8:
      // content.innerHTML = '<b>Not Implemented<b>';
      break;
    default: // Anything Else
      // content.innerHTML = '<p>Status Code not Implemented By Client</p>';
      break;
  }
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
  viewPlot,
};
