const GetSVGContents = require("./src/getSvgContents");

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter('svgContents', (file, options) => {
    const getSVGContents = new GetSVGContents(file, { ...options });

    return getSVGContents.getSvg();
  });
};
