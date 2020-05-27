const crypto = require("crypto");

const CryptoUtils = {};

CryptoUtils.md5 = (src) => {
    if (!src) {
        return src;
    }
    const md5 = crypto.createHash("md5");
    md5.update(src, "utf8");
    return md5.digest("hex");
};

module.exports = {
    CryptoUtils
}