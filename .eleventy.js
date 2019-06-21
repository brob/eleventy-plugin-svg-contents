const svgContents = require("./src/getSvgContents");


module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("svgContents", svgContents);

};