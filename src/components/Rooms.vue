<template>
    <div>
        <h3 class="text-primary">Register Rooms</h3>
        <br>
        <div class="row">
            <h4 class="text-primary">Notices</h4>
            <p class="text-danger">You can register a room for the shortcut from 0 to 9. When a room is assigned to a number,
                you can use that number to quickly jump to that room</p>
            <p class="text-danger">The following inputs are acceptable:
                <ul>
                    <ol>https://www.chatwork.com/#!rid345</ol>
                    <ol>rid345</ol>
                    <ol>345</ol>
                </ul>
            </p>
            <p class="text-danger">After registering Rooms, remember to reload Chatwork to make all the changes become available ^^!</p>
        </div>
        <div class="row">
            <div class="col-md-3" v-for="n in keys" :key="n">
                <div class="row room-input">
                    <button type="button" class="btn btn-warning disabled col-xs-5">{{ n }}</button>
                    <span class="col-xs-7">
                        <input class="form-control" v-model="rooms[n]">
                    </span>
                </div>
            </div>
        </div>
        <hr>
        <button type="button" id="save-btn" class="btn btn-primary col-lg-1" @click="save">Save</button>
    </div>
</template>

<script>
    import range from 'lodash/range'
    import pickBy from 'lodash/pickBy'
    import mapValues from 'lodash/mapValues'
    import {CHROME_SYNC_ROOM_KEY} from '../js/helpers/Const'
    import StorageGroup from '../js/helpers/StorageGroup'

    const storage = new StorageGroup(CHROME_SYNC_ROOM_KEY)
    const defaultMap = [].fill(null, 0, 10)

    const keys = range(1, 10)
    keys.push(0)

    function parseRoomId(text) {
        let room = text.match(/\d+/g);
        if (!room || room.length === 0) {
            return null;
        }
        room = room[0];
        let regex = /^[0-9]{6,10}$/g;
        if (regex.test(room)) {
            return room;
        }
        return null;
    }

    export default {
        data () {
            return {
                keys,
                loaded: false,
                rooms: {},
            }
        },

        mounted () {
            storage.refresh({}).then(data => {
                this.rooms = data
                this.loaded = true
            })
        },

        methods: {
            save() {
                const map = pickBy(
                    mapValues(
                        Object.assign({}, this.rooms),
                        (room) => {
                            return parseRoomId(room.toString())
                        }
                    ),
                    (room) => {
                        return room !== null
                    }
                )
                storage.store(map).then(() => {
                    this.rooms = map
                })
            }
        }
    }
</script>

<style>
    .room-input {
        margin-bottom: 10px;
    }
</style>
