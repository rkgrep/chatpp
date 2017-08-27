import get from 'lodash/get'
import set from 'lodash/set'
import assign from 'lodash/assign'
import Storage from './Storage'

class StorageGroup {
    constructor(group, storage = new Storage()) {
        this.storage = storage
        this.group = group
    }

    async refresh(fallback = {}) {
        this.data = assign(fallback, await this.storage.get(this.group, {}))
        return this.data
    }

    async store(data) {
        this.data = data
        return this.storage.set(this.group, this.data)
    }

    async get(key, fallback) {
        if (!this.data) await this.refresh()
        return get(this.data, key, fallback)
    }

    async set(key, value) {
        if (!this.data) await this.refresh()
        set(this.data, key, value)
        await this.storage.set(this.group, this.data)
        return this.data
    }
}

export default StorageGroup
