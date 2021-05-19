const City = require("../models/city");
const errorResponse = require("../lib/responses/error");
const successResponse = require("../lib/responses/success");

module.exports = {
    addCity: async (req, res) => {
        try {
            const newCity = await City.create(req.body);
            successResponse(
                res,
                `Successfully added city ${newCity.name}`,
                newCity
            );
        } catch (error) {
            errorResponse(res, 400, error);
        }
    },
    fetchOneCity: async (req, res) => {
        try {
            let city = await City.findById(req.params.id);

            successResponse(
                res,
                `Successfully fetched city with id ${req.params.id}`,
                city
            );
        } catch (error) {
            errorResponse(res, 400, error);
        }
    },
    fetchAll: async (req, res) => {
        try {
            const cities = await City.find();
            successResponse(res, "Cities list: ", cities);
        } catch (error) {
            errorResponse(res, 400, error);
        }
    },
};
