const chrome = require('chrome')
const Promise = require('bluebird')

function getStorageDriver (local = false) {
    if (!local) {
        return chrome.storage.sync;
    }

    return chrome.storage.local;
}

class Storage {
    constructor (local, resolver = getStorageDriver) {
        this.storage = resolver(local)
    }

    get(key, fallback) {
        return new Promise((resolve, reject) => {
            this.storage.get(key, (info) => {
                info = info ? info[key] : fallback;
                resolve(info)
            });
        })
    }

    set (key, data) {
        let sync = {};
        sync[key] = data;
        return new Promise((resolve, reject) => {
            this.storage.set(sync, () => resolve());
        })
    }

    setData(data) {
        return new Promise((resolve, reject) => {
            this.storage.set(data, () => resolve());
        })
    }
}

export default Storage
