const addWeatherData = require('./weather');

module.exports = async (blogPost) => {
  blogPost = blogPost.toObject();
  blogPost = await addWeatherData(blogPost)
  return blogPost;
}