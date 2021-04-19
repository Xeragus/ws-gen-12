const BlogPost = require('../models/blogpost');

module.exports = {
  fetchAll: async (req, res) => { 
    const blogPosts = await BlogPost.find();

    res.send({
      error: false,
      message: 'List of all blogposts',
      blogPosts
    })
  },
  fetchOne: async (req, res) => { 
    const blogPost = await BlogPost.findById(req.params.id);

    res.send({
      error: false,
      message: `Blog post with id #${blogPost._id} is fetched`,
      blogPost
    });
  },
  create: async (req, res) => {
    const blogPost = await BlogPost.create(req.body);

    res.send({
      error: false,
      message: `Blog post is successfully created`,
      blogPost
    });
  },
  putUpdate: async (req, res) => {
    await BlogPost.findOneAndReplace({ _id: req.params.id }, req.body);

    res.send({
      error: false,
      message: `Blog post with id ${req.params.id} is updated`
    });
  },
  patchUpdate: async (req, res) => {
    await BlogPost.findByIdAndUpdate(req.params.id, req.body);

    res.send({
      error: false,
      message: `Blog post with id ${req.params.id} is PATCH updated`
    });
  },
  delete: async (req, res) => {
    await BlogPost.findByIdAndDelete(req.params.id);

    res.send({
      error: false,
      message: `Blog post with id ${req.params.id} is deleted`,
    });
  },
}
