const { v4: uuidv4 } = require("uuid");
const passengerRequest = ({ from, to, passengerId, paymentMethod }) => {
  const distance = calculateDistance(from.lat, from.lon, to.lat, to.lon);
  const cost = 1.5 + distance * 0.2;
  const broadCastObject = {
    from,
    to,
    distance,
    cost,
    passengerId,
    paymentMethod,
    sessionId: uuidv4(),
  };
  return broadCastObject;
};

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};

module.exports = passengerRequest;
