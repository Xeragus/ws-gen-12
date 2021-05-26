const BlogPost = require('../models/blogpost');
const successResponse = require('../lib/responses/success');
const errorResponse = require('../lib/responses/error');
const City = require('../models/city');
const User = require('../models/user');
const enrichBlogPost = require('../lib/enrichers/blogpost');
const createPDF = require('../lib/pdf/blogpost');
const sendMail = require('../lib/mailers/mailgun');
const path = require('path');

const generateEmailData = (blogPost, toEmail) => {
  var filepath = path.join(__dirname, `../pdfs/blogpost-${blogPost._id}.pdf`);

  return {
    from: "BlogApp Admin <postmaster@sandbox72058639b9c7438293d2246a5a55ce69.mailgun.org>",
    to: toEmail,
    subject: "You have created a new blog post",
    text: "Attached below you will find the blog post details.",
    attachment: filepath
  };
}

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

      successResponse(res, `Blog post with id #${blogPost._id} is fetched`, blogPost);
    } catch (error) {
      errorResponse(res, 500, error);
    }
  },
  create: async (req, res) => {
    try {
      const blogPost = await BlogPost.create({
        ...req.body,
        user: req.user.id
      });

      // callbacks, promises
      // 1. Callback implementation
      // 2. Promisification of the createPDF function
      createPDF(blogPost);
      sendMail(generateEmailData(blogPost, req.user.email));

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
