const successRes = require("../responses/success");
const errorRes = require("../responses/error");

module.exports = updatePatch = (Model, msg, successCode, errCode) => {
    return async (req, res) => {
        try {
            const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });

            let mess = msg.replace(">x<", req.params.id);

            successRes(res, mess, successCode, doc);
        } catch (error) {
            errorRes(res, errCode, error);
        }
    };
};
