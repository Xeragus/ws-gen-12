const User = require("../models/user");
const successResponse = require("../lib/responses/success");
const errorResponse = require("../lib/responses/error");

module.exports = {
    getAll: async (req, res) => {
        try {
            const users = await User.find();
            successResponse(res, "List of all users", users);
        } catch (error) {
            errorResponse(res, 500, error);
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            successResponse(
                res,
                `User with that  id #${user._id} is fetched`,
                user
            );
        } catch (error) {
            errorResponse(res, 500, error);
        }
    },
};
