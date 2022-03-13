const successRes = require("../responses/success");
const errorRes = require("../responses/error");

module.exports = getAll = (Model, msg, successCode, errCode) => {
    return async (req, res) => {
        try {
            const doc = await Model.find();

            successRes(res, msg, successCode, doc);
        } catch (error) {
            errorRes(res, errCode, error);
        }
    };
};
