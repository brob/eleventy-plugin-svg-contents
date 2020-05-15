const GetSVGContents = require("./src/getSvgContents");

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter('svgContents', (file, className, extractTag = 'svg') => {
    const getSVGContents = new GetSVGContents(file, className, extractTag);

    return getSVGContents.getSvg();
  });
};
