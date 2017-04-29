function normaliseData (arr) {
  return arr.reduce (function(acc,elem) {
    acc[elem.id] = elem;
    return acc;
  },{});
}

function sortByUsername (arr) {
  return arr.reduce (function (acc, elem) {
    acc[elem.username] = elem;
    return acc;
  }, {});
}

module.exports = {
  normaliseData,
  sortByUsername
};