const Category = require("../models/category");
const successResponse = require('../lib/responses/success');
const errorResponse = require('../lib/responses/error');

module.exports = {
  fetchAll: async (req, res) => {
    try {
      const categories = await Category.find();
      successResponse(res, "List of all categories", categories);
    } catch (error) {
      errorResponse(res, 400, error);
    }
  },
  fetchOne: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      successResponse(res, `Category with id #${category._id} is fetched`, category);
    } catch (error) {
      errorResponse(res, 400, error);
    }
  },
  create: async (req, res) => {
    try {
      const category = await Category.create(req.body);
      successResponse(res, `Category is successfully created`, category);
    } catch (error) {
      errorResponse(res, 400, error);
    }
  },
  putUpdate: async (req, res) => {
    try {
      await Category.findOneAndReplace({ _id: req.params.id }, req.body);
      successResponse(res, `Category with id ${req.params.id} is PUT updated`, {});
    } catch (error) {
      errorResponse(res, 400, error);
    }
  },
  patchUpdate: async (req, res) => {
    try {
      await Category.findByIdAndUpdate(req.params.id, req.body);
      successResponse(res, `Category with id ${req.params.id} is PATCH updated`, {});
    } catch (error) {
      errorResponse(res, 400, error);
    }
  },
  delete: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      successResponse(res, `Category with id ${req.params.id} is deleted`, {});
    } catch (error) {
      errorResponse(res, 400, error);
    }
  },
};
