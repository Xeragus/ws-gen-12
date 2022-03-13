const successRes = require("../responses/success");
const errorRes = require("../responses/error");

module.exports = deleteOne = (Model, msg, successCode, errCode) => {
    return async (req, res) => {
        try {
           const doc = await Model.findByIdAndDelete(req.params.id);

            let mess = msg.replace(">x<", req.params.id);

            successRes(res, mess, successCode, doc);
        } catch (error) {
            errorRes(res, errCode, error);
        }
    };
};
