"use strict";

class Datacard {
    constructor() {
        this.photoCollectPath = null;
        this.photoCollectDuplicatePath = null;
    }
    setPhotoCollectPath(photoCollectPath){
        console.log('setting...' + photoCollectPath);
        this.photoCollectPath = photoCollectPath;
    }
    getPhotoCollectPath(){
        return this.photoCollectPath;
    }
    setPhotoCollectDuplicatePath(photoCollectDuplicatePath){
        console.log('setting...' + photoCollectPath);
        this.photoCollectDuplicatePath = photoCollectDuplicatePath;
    }
    getPhotoCollectDuplicatePath(){
        return this.photoCollectDuplicatePath;
    }
}

export default Datacard;