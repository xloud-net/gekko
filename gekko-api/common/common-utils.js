const moment = require("moment");

const FORMAT_TIMESTAMP = "YYYY-MM-DDTHH:mm:ss.SSSZ";

const Utils = {};

Utils.formatTimestamp = (dt) => {
    return moment(dt).format(FORMAT_TIMESTAMP);
};

Utils.parseTimestamp = (str) => {
    const result = moment(str);
    if (result.isValid()) {
        return result;
    }
    return null;
};

module.exports = {
    Utils
}