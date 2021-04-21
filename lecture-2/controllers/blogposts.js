const BlogPost = require('../models/blogpost');

module.exports = {
  fetchAll: async (req, res) => { 
    try {
      const blogPosts = await BlogPost.find();

      res.send({
        error: false,
        message: 'List of all blogposts',
        blogPosts
      });
    } catch (error) {
      res.send({
        error: true,
        message: error.message
      });
    }
  },
  fetchOne: async (req, res) => { 
    try {
      const blogPost = await BlogPost.findById(req.params.id);

      res.send({
        error: false,
        message: `Blog post with id #${blogPost._id} is fetched`,
        blogPost
      });
    } catch (error) {
      res.send({
        error: true,
        message: error.message
      });
    }
  },
  create: async (req, res) => {
    try {
      const blogPost = await BlogPost.create(req.body);

      res.send({
        error: false,
        message: `Blog post is successfully created`,
        blogPost
      });
    } catch (error) {
      res.status(400).send({
        error: true,
        message: error.message
      });
    }
  },
  putUpdate: async (req, res) => {
    try {
      await BlogPost.findOneAndReplace({ _id: req.params.id }, req.body);

      res.send({
        error: false,
        message: `Blog post with id ${req.params.id} is updated`
      });
    } catch (error) {
      res.status(400).send({
        error: true,
        message: error.message
      });
    }
  },
  patchUpdate: async (req, res) => {
    try {
      await BlogPost.findByIdAndUpdate(req.params.id, req.body);

      res.send({
        error: false,
        message: `Blog post with id ${req.params.id} is PATCH updated`
      });
    } catch (error) {
      res.status(400).send({
        error: true,
        message: error.message
      });
    }
  },
  delete: async (req, res) => {
    try {
      await BlogPost.findByIdAndDelete(req.params.id);

      res.send({
        error: false,
        message: `Blog post with id ${req.params.id} is deleted`,
      });
    } catch (error) {
      res.status(400).send({
        error: true,
        message: error.message
      });
    }
  },
}
