# eleventy-plugin-svg-contents

An [Eleventy](https://github.com/11ty/eleventy) plugin to grab the contents of an SVG file to allow for embedding in your template with all the power of SVG.

## Installation

Available on [npm](https://www.npmjs.com/package/eleventy-plugin-svg-contents).

```
npm install eleventy-plugin-svg-contents --save
```

Open up your Eleventy config file (probably `.eleventy.js`) and add the plugin:

```
const svgContents = require("eleventy-plugin-svg-contents");
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(svgContents);
};
```


## Usage

In your (Nunjucks or Liquid) templates, use the following syntax to grab the contents from any SVG in your project path:

```
{{ 'path/to/file.svg' | svgContents }}
```

_**Quick note:** You may need to pass another filter after to have this render as html. In Nunjucks, you'll add `| safe` to the end._

### Filters

* `svgContents`: Grabs the xml from an SVG and passes it to your template. Voila! Instant embedded SVG from a file!
* Future Plan `stripTitle`: A filter to strip the `<title>` that often comes with SVGs and can cause havoc with SEO.
