"use strict";

class Datacard {
    constructor() {
        this.photoCollectPath = null;
        this.photoCollectDuplicatePath = null;
        this.device = null;
        this.model = null;
        this.collectDate = null;
        this.latitud = null;
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
    setMetadata(device, model, latitud, altitude, longitude, collectDate){
        this.device = device;
        this.model = model;
        this.latitud = latitud;
        this.altitude = altitude;
        this.longitude = longitude;
        this.collectDate = collectDate;
    }
}

export default Datacard;