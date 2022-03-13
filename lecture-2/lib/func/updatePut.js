const successRes = require("../responses/success");
const errorRes = require("../responses/error");

module.exports = updatePut = (Model, msg, successCode, errCode) => {
    return async (req, res) => {
        try {
            const doc = await Model.findOneAndReplace(
                { _id: req.params.id },
                req.body
            );

            let mess = msg.replace(">x<", req.params.id);

            successRes(res, mess, successCode, doc);
        } catch (error) {
            errorRes(res, errCode, error);
        }
    };
};
