// Returns a list of objects filtered through their provided keys' values
const filterListOfObjects = function(list, keys, filter) {
  // Removing special chars from filter to match litteral string
  const regex = new RegExp(
    filter.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"),
    "gi"
  );

  return list.filter(item => {
    let keepItem = false;
    keys.forEach(k => {
      if (item[k] !== null && item[k].match(regex)) keepItem = true;
    });

    return keepItem;
  });
};

export { filterListOfObjects };
