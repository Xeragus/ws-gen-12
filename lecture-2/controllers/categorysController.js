const Category = require("../models/category");
const getAll = require("../lib/func/getAll");
const getOne = require("../lib/func/getOne");
const createOne = require("../lib/func/createOne");
const updatePut = require("../lib/func/updatePut");
const updatePatch = require("../lib/func/updatePatch");
const deleteOne = require("../lib/func/deleteOne");


exports.fetchAll = getAll(Category, "List of all blogposts", 200, 404);
exports.fetchOne = getOne(Category, `Category with id >x< is fetched`, 200, 404);
exports.create = createOne(Category, `Category is successfully created`, 201, 400);
exports.putUpdate = updatePut(Category, `Category with id >x< is updated`, 200, 404);
exports.patchUpdate = updatePatch(Category, `Category with id >x< is updated`, 200, 404);
exports.delete = deleteOne(Category, `Category with id >x< is deleted`, 204, 404);

// exports.fetchAll = async (req, res) => {
//     try {
//         const category = await Category.find();

//         res.status(200).json({
//             status: "success",
//             categorys: category.length,
//             category,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({
//             status: "fail",
//             message: error.message,
//         });
//     }
// };

// exports.create = async (req, res) => {
//     try {
//         const category = await Category.create(req.body);

//         res.status(201).json({
//             status: "success",
//             category,
//         });
//     } catch (error) {
//         res.status(400).json({
//             status: "fail",
//             message: error.message,
//         });
//     }
// };

// exports.fetchOne = async (req, res) => {
//     try {
//         const category = await Category.findById(req.params.id);

//         res.status(200).json({
//             status: "success",
//             category,
//         });
//     } catch (error) {
//         res.status(400).json({
//             status: "fail",
//             message: error.message,
//         });
//     }
// };

// exports.putUpdate = async (req, res) => {
//     try {
//         const category = await Category.findOneAndReplace(
//             { _id: req.params.id },
//             req.body
//         );

//         res.status(200).json({
//             status: "success",
//             category,
//         });
//     } catch (error) {
//         res.status(400).json({
//             status: "fail",
//             message: error.message,
//         });
//     }
// };

// exports.patchUpdate = async (req, res) => {
//     try {
//         const category = await Category.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true, runValidators: true }
//         );

//         res.status(200).json({
//             status: "success",
//             category,
//         });
//     } catch (error) {
//         res.status(400).json({
//             status: "fail",
//             message: error.message,
//         });
//     }
// };

// exports.delete = async (req, res) => {
//     try {
//         await Category.findByIdAndDelete(req.params.id);

//         res.status(204).json({
//             status: "success",
//         });
//     } catch (error) {
//         res.status(400).json({
//             status: "fail",
//             message: error.message,
//         });
//     }
// };
