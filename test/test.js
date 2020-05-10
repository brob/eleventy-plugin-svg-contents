const assert = require('assert');
const Cheerio = require('cheerio');
const GetSVGContents = require('../src/getSvgContents');

const testSvg = Cheerio.load(`<svg xmlns="http://www.w3.org/2000/svg">
<circle r="50"/>
</svg>`)

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return an svg', function() {
      const getSVGContents = new GetSVGContents('/sample/simple.svg');
      let svg = Cheerio.load(getSVGContents.getSvg())
      
      assert.equal(svg.html, testSvg.html);
    });
  });
});