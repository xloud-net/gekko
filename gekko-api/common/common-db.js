const DbUtils = {};

// 一意制約違反チェック
DbUtils.isDuplicationError = (err) => {
    if (!err || !err.errors || !err.errors.length) {
        return false;
    }
    for (let i = 0; i < err.errors.length; i++) {
        if (err.errors[i].type === "unique violation") {
            return true;
        }
    }
    return false;
};

module.exports = {
    DbUtils
}