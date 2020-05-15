# eleventy-plugin-svg-contents

An [Eleventy](https://github.com/11ty/eleventy) universal plugin to grab the contents of an SVG file to allow for embedding in your template with all the power of SVG.

## Installation

Available on [npm](https://www.npmjs.com/package/eleventy-plugin-svg-contents).

```bash
npm install eleventy-plugin-svg-contents --save
```

Open up your Eleventy config file (probably `.eleventy.js`) and add the plugin:

```js
const svgContents = require("eleventy-plugin-svg-contents");
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(svgContents);
};
```


## Usage

### Base usage
In your (Nunjucks, Liquid or Handlebars) templates, use the following syntax to grab the contents from any SVG in your project path:

```html
// nunjucks/liquid
{{ 'path/to/file.svg' | svgContents }}

// handlebars
{{{svgContents 'path/to/file.svg' }}}
```

_**Quick note:** You may need to pass another filter after to have this render as html. In Nunjucks, you'll add `| safe` to the end._

### Adding a class to your SVG

You can append the `svg` class with the `class` option.

```html
// Nunjucks
{{ 'path/to/file.svg' | svgContents("extra-class-one extra-class-two") }}

// Liquid
{{ 'path/to/file.svg' | svgContents: "extra-class-one extra-class-two" }}

// Handlebars
{{{svgContents 'path/to/file.svg' "extra-class-one extra-class-two" }}}
```

### Using other SVG elements

If you want to use an element selector other than SVG (or want to select a specific piece of an SVG) you can use an optional second argument to provide a selector for the element in your SVG file. Any selector strings will work (classes, ids, attr, element).

Due to limitations of Liquid and Handlebars, you'll need to have a placeholder string for the optional class name argument.


```html
// Nunjucks
{{ 'path/to/file.svg' | svgContents("", "symbol") }}
{{ 'path/to/file.svg' | svgContents("add-class", "#byId") }}

// Liquid
{{ 'path/to/file.svg' | svgContents: "", "symbol" }}
{{ 'path/to/file.svg' | svgContents: "add-class", "#byId" }}

// Handlebars
{{{svgContents 'path/to/file.svg' "" "symbol" }}}
{{{svgContents 'path/to/file.svg' "add-class" "#byId" }}}
```

### Filters

* `svgContents`: Grabs the xml from an SVG and passes it to your template. Voila! Instant embedded SVG from a file!
* Future Plan `stripTitle`: A filter to strip the `<title>` that often comes with SVGs and can cause havoc with SEO.
