const GetSVGContents = require("./src/getSvgContents");

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter('svgContents', (file, className) => {
    const getSVGContents = new GetSVGContents(file, className);

    return getSVGContents.getSvg();
  });
};
