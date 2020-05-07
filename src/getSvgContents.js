const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const defaults = {
  class: '',
};

class GetSVGContents {
  constructor(file = '', options = defaults) {
    this.file = file;
    this.options = { ...defaults, ...options };
  }

  appendClass() {
    const svgContent = this.getFileContents();

    if (this.options.class === '') {
      return svgContent;
    }

    const $ = cheerio.load(svgContent);

    $('svg').addClass(this.options.class);

    return $.html('svg');
  }

  createSvg() {
    const svg = this.appendClass();

    return svg;
  }

  getFileContents() {
    if (path.extname(this.file) !== '.svg') {
      throw new Error('eleventy-plugin-svg-contents requires a filetype of svg');
    }

    const relativeFilePath = `.${this.file}`;

    const data = fs.readFileSync(relativeFilePath, (err, contents) => {
      if (err) {
        throw new Error(err);
      }

      return contents;
    });

    return data.toString('utf8');
  }

  getSvg() {
    return this.createSvg();
  }
}

module.exports = GetSVGContents;
