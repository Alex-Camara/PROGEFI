const fs = require("fs");
const path = require('path');

exports.default = async function(context) {
    fs.mkdir(path.join(__dirname, 'test'), (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    });
}