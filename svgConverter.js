module.exports = function (escapedSvgData) {
  var r = /\\u([\d\w]{4})/gi;
  var result = escapedSvgData.replace(r, function (match, grp) {
    return String.fromCharCode(parseInt(grp, 16)); } );
  return unescape(result);
};
