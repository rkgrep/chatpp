<template>
    <div>
        <h3 class="text-primary">Change Features Status</h3>
        <br>
        <div class="row">
            <p class="text-danger">Enable <strong>Thumbnail</strong> and <strong>Highlight Code</strong> feature may slow down Chatwork.<br>
                Please consider disable them if your Chatwork does not run as smoothly as expected.
            </p>
            <table class="table table-bordered text-center" v-if="loaded">
                <thead>
                    <tr class="info text-center">
                        <th class="text-center">Feature</th>
                        <th class="text-center">Status</th>
                        <th class="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(title, key) in features" :key="key">
                        <td>{{ title }}</td>
                        <td>
                            <span class="text-danger" :id="key + '-status'">
                                {{ stored[key] ? 'Enabled' : 'Disabled' }}
                            </span>
                        </td>
                        <td>
                            <button
                                :id="key + '-status-btn'"
                                type="button"
                                class="btn"
                                :class="{
                                    'btn-primary': !stored[key],
                                    'btn-danger': stored[key],
                                }"
                                @click="toggle(key)"
                            >
                                <span
                                    class="glyphicon"
                                    :class="{
                                        'glyphicon-ok-circle': !stored[key],
                                        'glyphicon-remove-circle': stored[key],
                                    }"
                                    aria-hidden="true"
                                ></span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import assign from 'lodash/assign'
    import { CHROME_SYNC_KEY } from '../js/helpers/Const'
    import StorageGroup from '../js/helpers/StorageGroup'
    const storage = new StorageGroup(CHROME_SYNC_KEY)

    const features = {
        emoticon: 'Emoticon',
        mention: 'Mention',
        shortcut: 'Shortcut',
        thumbnail: 'Thumbnail',
        highlight: 'Highlight Code',
    }

    const defaults = {
        emoticon: false,
        mention: false,
        shortcut: false,
        thumbnail: false,
        highlight: false,
    }

    export default {
        meta: {
            title: 'Settings',
        },

        data () {
            return {
                features,
                stored: defaults,
                loaded: false,
            }
        },

        mounted () {
            storage.refresh(defaults).then(data => {
                this.stored = data
                this.loaded = true
            })
        },

        methods: {
            toggle(key) {
                storage.set(key, ! this.stored[key]).then(data => this.stored = data)
            }
        }
    }
</script>
