const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

class GetSVGContents {
  constructor(file = '', className, extractTag = 'svg') {
    this.file = file;
    this.className = className;
    this.extractTag = extractTag;
  }

  appendClass() {
    const svgContent = this.getFileContents();
    if (this.className === '') {
      return svgContent;
    }

    const $ = cheerio.load(svgContent);

    $(this.extractTag).addClass(this.className);
    return $.html(this.extractTag);
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
