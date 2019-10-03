export const sanitizeNulls = function(data) {
  return data.map(obj => {
    replaceNulls(obj);
  });
};

// "== null" => test for null or undefined
function replaceNulls(obj) {
  Object.keys(obj).map(key => {
    if (obj[key] == null) {
      obj[key] = "";
    }
  });
}
