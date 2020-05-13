const assert = require('assert');
const Cheerio = require('cheerio');
const GetSVGContents = require('../src/getSvgContents');

const testSvg = Cheerio.load(`<svg xmlns="http://www.w3.org/2000/svg">
<circle r="50"/>
</svg>`)

describe('SVG Test', function() {
  describe('File contents received', function() {
    it('Fails if not an SVG file', function() {
      const getSVGContents = new GetSVGContents('/sample/notsvg.png');
      const expected = Error('eleventy-plugin-svg-contents requires a filetype of svg');
      assert.throws(
        function() {getSVGContents.getSvg()},
        expected
      );
    })
    it('Returns SVG contents when provided SVG file', function() {
      const getSVGContents = new GetSVGContents('/sample/simple.svg');
      let svg = Cheerio.load(getSVGContents.getSvg())
      
      assert.equal(svg.html, testSvg.html);
    });
  });
  describe('Add Class', function() {
    it('Returns an SVG with the right class', function () {
      const getSVGContents = new GetSVGContents('/sample/simple.svg', 'classname');
      let svg = Cheerio.load(getSVGContents.getSvg());

      console.log(svg);
    })
  })
});