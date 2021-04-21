const Category = require("..models/category.js");

module.exports = {
  fetchAll: async (req, res) => {
    const Categories = await Category.find();

    res.send({
      error: false,
      message: "List of all Categories",
      Categories,
    });
  },
  fetchOne: async (req, res) => {
    const Categories = await Category.findById(req.params.id);

    res.send({
      error: false,
      message: `Category with id #${Categories._id} is fetched`,
      Categories,
    });
  },
  create: async (req, res) => {
    try {
      const Categories = await Category.create(req.body);

      res.send({
        error: false,
        message: `Category is successfully created`,
        Categories,
      });
    } catch (error) {
      res.status(400).send({
        error: true,
        message: error.message,
      });
    }
  },
  putUpdate: async (req, res) => {
    await Category.findOneAndReplace({ _id: req.params.id }, req.body);

    res.send({
      error: false,
      message: `Category with id ${req.params.id} is updated`,
    });
  },
  patchUpdate: async (req, res) => {
    await Category.findByIdAndUpdate(req.params.id, req.body);

    res.send({
      error: false,
      message: `Category with id ${req.params.id} is PATCH updated`,
    });
  },
  delete: async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);

    res.send({
      error: false,
      message: `Category with id ${req.params.id} is deleted`,
    });
  },
};
