const addWeatherData = require("./weather");
const airPollution = require("./airPollution");

module.exports = async (blogPost) => {
    blogPost = blogPost.toObject();
    blogPost = await addWeatherData(blogPost);
    blogPost = await airPollution(blogPost);
    return blogPost;
};
