function deepClone(obj) {
  // Process null
  if (obj === null) {
    return obj;
  }
  const result = Array.isArray(obj) ? [] : {};
  for (let prop of Object.keys(obj)) {
    if (obj[prop] !== null && typeof obj[prop] === "object") {
      result[prop] = deepClone(obj[prop]);
    } else {
      result[prop] = obj[prop];
    }
  }
  return result;
}


function klona(val) {
  var k, out, tmp;

  if (Array.isArray(val)) {
    out = Array((k = val.length));
    while (k--)
      out[k] = (tmp = val[k]) && typeof tmp === "object" ? klona(tmp) : tmp;
    return out;
  }

  if (Object.prototype.toString.call(val) === "[object Object]") {
    out = {}; // null
    for (k in val) {
      if (k === "__proto__") {
        Object.defineProperty(out, k, {
          value: klona(val[k]),
          configurable: true,
          enumerable: true,
          writable: true,
        });
      } else {
        out[k] = (tmp = val[k]) && typeof tmp === "object" ? klona(tmp) : tmp;
      }
    }
    return out;
  }

  return val;
}

module.exports = deepClone;
