const {
    ipcRenderer
} = require('electron')
const fs = require('fs')

const datacard = {
    namespaced: true,
    state: {
        activeStep: 0,
        photoCollect: {
            name: null,
            path: null,
            url: null,
            loading: false,
            changed: false,
            hasMetadata: null
        },
        datacard: {
            longitude: -101.433236,
            latitude: 20.102365,
            altitude: null,
            country: null,
            countryState: null,
            municipality: null,
            locality: null,
            species: {
                scientificName: null,
                commonName: null,
                genus: null,
                order: null,
                family: null,
                speciesClass: null,
                phylum: null,
                kingdom: null,
                sex: null,
                lifeStage: null
            },
            metadataValues: {
                device: "Apple",
                model: "iPhone",
                collectDate: "30/01/17",
                collectHour: "03:43"
            }
        }
    },
    mutations: {
        setActiveStep(state, activeStep) {
            state.activeStep = activeStep
        },
        isLoading(state, status) {
            state.photoCollect.loading = status;
        },
        hasChanged(state, status) {
            state.photoCollect.changed = status;
        },
        hasMetadata(state, status) {
            state.photoCollect.hasMetadata = status;
        },
        setPhotoCollectURL(state, photoCollect) {
            var reader = new FileReader();

            reader.onloadend = () => {
                state.photoCollect = {
                    name: state.photoCollect.name,
                    path: state.photoCollect.path,
                    url: reader.result,
                    loading: false,
                    changed: true,
                    hasMetadata: null
                }
            };
            reader.readAsDataURL(photoCollect);
        },
        setPhotoCollect(state, photoCollect) {
            state.photoCollect = {
                "name": photoCollect.name,
                "path": photoCollect.path,
                "type": photoCollect.type,
                loading: false,
                changed: false,
                "hasMetadata": null
            };
        },
        setPhotoCollectNull(state) {
            state.photoCollect = {
                name: null,
                path: null,
                url: null,
                loading: false,
                hasMetadata: null
            }
        },
        setLongitude(state, longitude) {
            state.datacard.longitude = longitude
        },
        setLatitude(state, latitude) {
            state.datacard.latitude = latitude
        },
        setCountry(state, country) {
            state.datacard.country = country
        },
        setCountryState(state, countryState) {
            state.datacard.countryState = countryState
        },
        setMunicipality(state, municipality) {
            state.datacard.municipality = municipality
        },
        setLocality(state, locality) {
            state.datacard.locality = locality
        },
        setScientificName(state, scientificName) {
            state.datacard.species.scientificName = scientificName;
        },
        setCommonName(state, commonName) {
            state.datacard.species.commonName = commonName;
        },
        setGenus(state, genus) {
            state.datacard.species.genus = genus;
        },
        setOrder(state, order) {
            state.datacard.species.order = order;
        },
        setFamily(state, family) {
            state.datacard.species.family = family
        },
        setSpeciesClass(state, speciesClass) {
            state.datacard.species.speciesClass = speciesClass
        },
        setPhylum(state, phylum) {
            state.datacard.species.phylum = phylum
        },
        setKingdom(state, kingdom) {
            state.datacard.species.kingdom = kingdom
        },
        setSex(state, sex) {
            state.datacard.species.sex = sex;
        },
        setLifeStage(state, lifeStage) {
            state.datacard.species.lifeStage = lifeStage;
        },
        setMetadataValues(state, metadata) {
            state.datacard.metadataValues = {
                device: metadata.device,
                model: metadata.model,
                collectDate: metadata.collectDate,
                collectHour: metadata.collectHour,
                longitude: metadata.longitude,
                latitude: metadata.latitude,
                altitude: metadata.altitude
            }
        }
    },
    actions: {
        setPhotoCollect({
            dispatch,
            commit,
            state
        }, photoCollect) {
            if (photoCollect != null) {
                commit('setPhotoCollect', photoCollect);

                ipcRenderer.send('savePhotoCollect', state.photoCollect)
                commit("isLoading", true)

                //Si se guardó, actualizar la url de la imagen
                ipcRenderer.on('photoCollectSaved', (event, arg) => {
                    try {
                        console.log('valor entrante: ' + arg)
                        var fileReceived = fs.readFileSync(arg)
                        var imageFile = new File([fileReceived], 'filename')
                        commit('setPhotoCollectURL', imageFile);
                    } catch (error) {
                        commit("isLoading", false)
                        throw error;
                    }
                })

                ipcRenderer.on('photoCollectNotSaved', (event, arg) => {
                    state.photoCollect = {
                        name: state.photoCollect.name,
                        path: state.photoCollect.path,
                        url: arg,
                        loading: false
                    }
                })
            }
        },
        resetPhotoCollect({
            commit
        }) {
            commit("setActiveStep", 0);
            commit("setPhotoCollectNull");
        },
        getImageMetadata({
            commit,
            state
        }) {
            ipcRenderer.send('getImageMetadata')
            ipcRenderer.on('imageMetadata', (event, arg) => {
                state.datacard = arg;
                commit("hasMetadata", true);
                commit("hasChanged", false);
                commit("setMetadataValues", arg);
            })

            ipcRenderer.on('imageMetadataFailed', (event, arg) => {
                commit("hasMetadata", false);
                commit("hasChanged", false);
            })
        }
    }
}

export default datacard;