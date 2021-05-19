<<<<<<< HEAD
const BlogPost = require("../models/blogpost");
const User = require("../models/user");

const successResponse = require("../lib/responses/success");
const errorResponse = require("../lib/responses/error");
const jwt = require("jsonwebtoken");

module.exports = {
    fetchAll: async (req, res) => {
        try {
            const blogPosts = await BlogPost.find().populate({ path: 'user', model: User });
            successResponse(res, "List of all blogposts", blogPosts);
        } catch (error) {
            errorResponse(res, 500, error);
        }
    },
    fetchOne: async (req, res) => {
        try {
            const blogPost = await BlogPost.findById(req.params.id);
            successResponse(
                res,
                `Blog post with id #${blogPost._id} is fetched`,
                blogPost
            );
        } catch (error) {
            errorResponse(res, 500, error);
        }
    },
    create: async (req, res) => {
        try {
            if (
                req.headers.authorization &&
                req.headers.authorization.startsWith("Bearer")
            ) {
                token = req.headers.authorization.split(" ")[1];
            }

            jwt.verify(token, "nikola123", (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }

                req.user = user;
            });
            // const blogPost = await BlogPost.create({req.body, ...user});
            const blogPost = await BlogPost.create({
                title: req.body.title,
                content: req.body.content,
                category: req.body.category,
                user: req.user.id,
            });
            successResponse(res, `Blog post is successfully created`, blogPost);
        } catch (error) {
            errorResponse(res, 500, error);
        }
    },
    putUpdate: async (req, res) => {
        try {
            await BlogPost.findOneAndReplace({ _id: req.params.id }, req.body);
            successResponse(
                res,
                `Blog post with id ${req.params.id} is updated`,
                blogPost
            );
        } catch (error) {
            errorResponse(res, 500, error);
        }
    },
    patchUpdate: async (req, res) => {
        try {
            await BlogPost.findByIdAndUpdate(req.params.id, req.body);
            successResponse(
                res,
                `Blog post with id ${req.params.id} is PATCH updated`,
                blogPost
            );
        } catch (error) {
            errorResponse(res, 500, error);
        }
    },
    delete: async (req, res) => {
        try {
            await BlogPost.findByIdAndDelete(req.params.id);
            successResponse(
                res,
                `Blog post with id ${req.params.id} is deleted`
            );
        } catch (error) {
            errorResponse(res, 500, error);
        }
    },
};
=======
const BlogPost = require('../models/blogpost');
const successResponse = require('../lib/responses/success');
const errorResponse = require('../lib/responses/error');
const City = require('../models/city');
const User = require('../models/user');
const enrichBlogPost = require('../lib/enrichers/blogpost');

module.exports = {
  fetchAll: async (req, res) => { 
    try {
      const blogPosts = await BlogPost.find()
                                      .populate('category')
                                      .populate({ path: 'user', model: User})
                                      .populate({ path: 'city', model: City });
      successResponse(res, 'List of all blogposts', blogPosts);
    } catch (error) {
      errorResponse(res, 500, error);
    }
  },
  fetchOne: async (req, res) => {
    try {
      let blogPost = await BlogPost.findById(req.params.id)
                                   .populate('category')
                                   .populate({ path: 'user', model: User})
                                   .populate({ path: 'city', model: City });

      blogPost = await enrichBlogPost(blogPost);
      console.log(blogPost);
      successResponse(res, `Blog post with id #${blogPost._id} is fetched`, blogPost);
    } catch (error) {
      console.log(error);
      errorResponse(res, 500, error);
    }
  },
  create: async (req, res) => {
    try {
      const blogPost = await BlogPost.create({
        ...req.body,
        user: req.user.id
      });

      successResponse(res, `Blog post is successfully created`, blogPost);
    } catch (error) {
      errorResponse(res, 500, error);
    }
  },
  putUpdate: async (req, res) => {
    try {
      await BlogPost.findOneAndReplace({ _id: req.params.id }, req.body);
      successResponse(res, `Blog post with id ${req.params.id} is updated`, blogPost);
    } catch (error) {
      errorResponse(res, 500, error);
    }
  },
  patchUpdate: async (req, res) => {
    try {
      await BlogPost.findByIdAndUpdate(req.params.id, req.body);
      successResponse(res, `Blog post with id ${req.params.id} is PATCH updated`, blogPost);
    } catch (error) {
      errorResponse(res, 500, error);
    }
  },
  delete: async (req, res) => {
    try {
      await BlogPost.findByIdAndDelete(req.params.id);
      successResponse(res, `Blog post with id ${req.params.id} is deleted`);
    } catch (error) {
      errorResponse(res, 500, error);
    }
  }
}
>>>>>>> f14f8d9b67634eb4168d3cf86c3ac176bb0f3607
