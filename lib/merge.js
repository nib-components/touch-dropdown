/**
 * Merges the properties from the two objects into a new object
 * @param   {Object} arg1
 * @param   {Object} arg2
 * @return  {Object}
 */
module.exports = function(arg1, arg2) {
  var obj = {};

  for (var key in arg1) {
    if (arg1.hasOwnProperty(key) && !obj[key]) {
      obj[key] = arg1[key];
    }
  }

  for (var key in arg2) {
    if (arg2.hasOwnProperty(key) && !obj[key]) {
      obj[key] = arg2[key];
    }
  }

  return obj;
};
