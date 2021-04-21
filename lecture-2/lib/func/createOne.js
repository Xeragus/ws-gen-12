const successRes = require("../responses/success");
const errorRes = require("../responses/error");

module.exports = createOne = (Model, msg, successCode, errCode) => {
    return async (req, res) => {
        try {
            const doc = await Model.create(req.body);

            successRes(res, msg, successCode, doc);
        } catch (error) {
            errorRes(res, errCode, error);
        }
    };
};
