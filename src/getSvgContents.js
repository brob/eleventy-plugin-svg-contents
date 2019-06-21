const fs = require('fs');
const path = require('path');


module.exports = function(file) {
    let relativeFilePath = `.${file}`
    if (path.extname(file) != '.svg') {
        throw new Error("eleventy-plugin-svg-contents requires a filetype of svg");
    }
    let data = fs.readFileSync(relativeFilePath, function(err, contents) {
        if (err) {
            throw new Error(err)
        }
        return contents
    });
    return data.toString('utf8')
}

