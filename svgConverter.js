module.exports = function (escapedSvgData) {
  var r = /\\u([\d\w]{4})/gi;
  // var res1 = escapedSvgData.replace('//', '/');
  var res2 = escapedSvgData.replace(r, function (match, grp) {
    return String.fromCharCode(parseInt(grp, 16));
  });
  var result = unescape(res2);
  return result;
};


  // var r = /\\u([\d\w]{4})/gi;
  // var result = escapedSvgData.replace(r, function (match, grp) {
  //   return String.fromCharCode(parseInt(grp, 16)); } );
  // return unescape(result);
