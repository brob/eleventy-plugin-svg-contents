const fs = require('fs');
const jsdom = require('jsdom');
const path = require('path');

const { JSDOM } = jsdom;

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

    const dom = new JSDOM(svgContent);
    const svg = dom.window.document.querySelector('svg');

    svg.classList.add(...this.options.class.split(' '));

    return svg.outerHTML.toString('utf8');
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
