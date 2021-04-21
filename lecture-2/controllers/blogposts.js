const BlogPost = require("../models/blogpost");
const getAll = require("../lib/func/getAll");
const getOne = require("../lib/func/getOne");
const createOne = require("../lib/func/createOne");
const updatePut = require("../lib/func/updatePut");
const updatePatch = require("../lib/func/updatePatch");
const deleteOne = require("../lib/func/deleteOne");

exports.fetchAll = getAll(BlogPost, "List of all blogposts", 200, 404);
exports.fetchOne = getOne(BlogPost, `Blog post with id >x< is fetched`, 200, 404);
exports.create = createOne(BlogPost, `Blog Posts is successfully created`, 201, 400);
exports.putUpdate = updatePut(BlogPost, `Blog post with id >x< is updated`, 200, 404);
exports.patchUpdate = updatePatch(BlogPost, `Blog post with id >x< is PATCH updated`, 200, 404);
exports.delete = deleteOne(BlogPost, `Blog post with id >x< is PATCH deleted`, 204, 404);

// module.exports = {
//     fetchAll: getAll(BlogPost, "List of all blogposts", 200, 404),
//     fetchOne: getOne(BlogPost, `Blog post with id >x< is fetched`, 200, 404),
//     create: createOne(BlogPost, `Blog Posts is successfully created`, 201, 400),
//     putUpdate: updatePut(BlogPost, `Blog post with id >x< is updated`, 200, 404),
//     patchUpdate: updatePatch(BlogPost, `Blog post with id >x< is PATCH updated`, 200, 404),
//     delete: deleteOne(BlogPost, `Blog post with id >x< is PATCH deleted`, 204, 404),
// };
