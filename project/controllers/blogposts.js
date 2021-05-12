const BlogPost = require("../models/blogpost");
const successResponse = require("../lib/responses/success");
const errorResponse = require("../lib/responses/error");
const jwt = require("jsonwebtoken");

module.exports = {
    fetchAll: async (req, res) => {
        try {
            const blogPosts = await BlogPost.find(); //.populate("category");
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
