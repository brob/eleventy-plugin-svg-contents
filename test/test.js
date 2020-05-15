const assert = require('assert');
const Cheerio = require('cheerio');
const GetSVGContents = require('../src/getSvgContents');

const testSvg = Cheerio.load(`<svg xmlns="http://www.w3.org/2000/svg">
<circle r="50"/>
</svg>`);
const testSymbol = Cheerio.load(`<symbol id="symbol-date" viewBox="0 0 32 32" width="1em" height="1em">
  <title>Date</title>
  <path d="M29.334 3H25V1c0-.553-.447-1-1-1s-1 .447-1 1v2h-6V1c0-.553-.448-1-1-1s-1 .447-1 1v2H9V1c0-.553-.448-1-1-1S7 .447 7 1v2H2.667C1.194 3 0 4.193 0 5.666v23.667C0 30.806 1.194 32 2.667 32h26.667C30.807 32 32 30.806 32 29.333V5.666C32 4.193 30.807 3 29.334 3zM30 29.333c0 .368-.3.667-.666.667H2.667C2.3 30 2 29.7 2 29.333V5.666C2 5.3 2.3 5 2.667 5H7v2c0 .553.448 1 1 1s1-.447 1-1V5h6v2c0 .553.448 1 1 1s1-.447 1-1V5h6v2c0 .553.447 1 1 1s1-.447 1-1V5h4.334c.367 0 .666.3.666.666v23.667z"/>
  <path d="M7 12h4v3H7v-3zm0 5h4v3H7v-3zm0 5h4v3H7v-3zm7 0h4v3h-4v-3zm0-5h4v3h-4v-3zm0-5h4v3h-4v-3zm7 10h4v3h-4v-3zm0-5h4v3h-4v-3zm0-5h4v3h-4v-3z"/>
</symbol>`);

describe('SVG Test', function() {
  describe('File contents received', function() {
    it('Fails if not an SVG file', function() {
      const getSVGContents = new GetSVGContents('/sample/notsvg.png');
      const expected = Error('eleventy-plugin-svg-contents requires a filetype of svg');
      assert.throws(
        function() {getSVGContents.getSvg()},
        expected
      );
    });

    it('Returns SVG contents when provided SVG file', function() {
      const getSVGContents = new GetSVGContents('/sample/simple.svg');
      let svg = Cheerio.load(getSVGContents.getSvg())
      
      assert.equal(svg.html(), testSvg.html());
    });

    it('Returns symbol contents when provided symbol in SVG file', function() {
      const selector = 'symbol';
      const getSVGContents = new GetSVGContents('/sample/symbol.svg', '', selector);
      let svg = Cheerio.load(getSVGContents.getSvg());

      assert.equal(svg(selector).prop('tagName'), testSymbol(selector).prop('tagName'))
    });
  });
  describe('Add Class', function() {
    it('Returns an SVG with the right class', function () {
      const className = 'classname'
      const getSVGContents = new GetSVGContents('/sample/simple.svg', className);
      let svg = Cheerio.load(getSVGContents.getSvg());
      let svgClass = svg('svg').attr('class')
      assert.equal(svgClass, className)
    });
    it('Returns an SVG with no class if no className provided', function () {
      const getSVGContents = new GetSVGContents('/sample/simple.svg');
      let svg = Cheerio.load(getSVGContents.getSvg());
      let svgClass = svg('svg').hasClass('');
      assert.equal(svgClass, false)
      assert.equal(svg('svg').prop('tagName'), 'SVG');
    });
    it('Returns a Symbol with the right class', function () {
      const className = 'classname';
      const selector = 'symbol';
      
      const getSVGContents = new GetSVGContents('/sample/symbol.svg', className, selector);
      let svg = Cheerio.load(getSVGContents.getSvg());
      let elementClass = svg(selector).attr('class')
      
      assert.equal(elementClass, className)
    });
    it('Returns a Symbol with no class if no className provided', function () {
      const selector = 'symbol';
      const getSVGContents = new GetSVGContents('/sample/symbol.svg', '', selector);
      
      let svg = Cheerio.load(getSVGContents.getSvg());
      let svgClass = svg(selector).hasClass('');

      assert.equal(svgClass, false)
      assert.equal(svg(selector).prop('tagName'), 'SYMBOL');
    });
  })
});