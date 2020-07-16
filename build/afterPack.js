const fs = require("fs");
const path = require('path');
const electron = require('electron');

exports.default = async function(context) {
    fs.mkdir(path.join(electron.app.getPath("userData"), 'testUserData'), (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    });
}