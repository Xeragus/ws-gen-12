const addWeatherData = require('./weather');
const addAirPollutionData = require('./air-pollution');

module.exports = async (blogPost) => {
  blogPost = blogPost.toObject();
  blogPost = await addWeatherData(blogPost);
  blogpost = await addAirPollutionData(blogPost);
  return blogPost;
}
