const crypto = require("crypto");

// Generate a unique random ID that doesn't collide with existing IDs
module.exports = function (list) {
  let id;
  const existingIds = new Set(list.map((i) => i.id));
  do {
    id = crypto.randomBytes(4).toString("hex"); // e.g. "a3f2c1b0"
  } while (existingIds.has(id));
  return id;
};