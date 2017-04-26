function normaliseData (arr) {
  return arr.reduce (function(acc,elem) {
    acc[elem.id] = elem;
    return acc;
  },{});
}

module.exports = normaliseData;