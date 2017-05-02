function normaliseDataById (arr) {
  return arr.reduce (function(acc,elem) {
    acc[elem.id] = elem;
    return acc;
  },{});
}

function normaliseDataByUsername (arr) {
  return arr.reduce (function (acc, elem) {
    acc[elem.username] = elem;
    return acc;
  }, {});
}

module.exports = {
  normaliseDataById,
  normaliseDataByUsername
};