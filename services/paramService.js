const crypto = require("crypto");

const generateOurParam = (key, version) => {
  return crypto
    .createHash("sha256")
    .update(`${key}&version=${version}`)
    .digest("hex")
    .substring(0, 12);
};

module.exports = { generateOurParam };
