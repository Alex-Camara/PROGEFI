import jimp from 'jimp';

function convertImage(photoCollect) {
    return new Promise(function (resolve, reject) {
        jimp.read(photoCollect.path, function (err, retrievedPhotoCollect) {
            if (!err) {
                retrievedPhotoCollect.write("converted.png");
                resolve('éxito')
            } else {
                reject(err);
            }
        });
    })
}

export default {
    convertImage
};