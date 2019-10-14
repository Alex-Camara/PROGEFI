"use strict";

class Datacard {
    constructor() {
        this.photoCollectPath = null;
        this.photoCollectDuplicatePath = null;
        this.device = null;
        this.model = null;
        this.collectDate = null;
        this.collectHour = null,
        this.latitude = null;
        this.altitude = null;
        this.longitude = null;
    }
    setPhotoCollectPath(photoCollectPath) {
        this.photoCollectPath = photoCollectPath;
    }
    getPhotoCollectPath() {
        return this.photoCollectPath;
    }
    setPhotoCollectDuplicatePath(photoCollectDuplicatePath) {
        this.photoCollectDuplicatePath = photoCollectDuplicatePath;
    }
    getPhotoCollectDuplicatePath() {
        return this.photoCollectDuplicatePath;
    }
    setMetadata(device, model, latitude, altitude, longitude, collectDate, collectHour){
        this.device = device;
        this.model = model;
        this.latitude = latitude;
        this.altitude = altitude;
        this.longitude = longitude;
        this.collectDate = collectDate;
        this.collectHour = collectHour;
    }
}

export default Datacard;