<template>
    <div>
        <div class="row">
            <h3 class="text-primary">Create Mention Group</h3>
            <div class="col-sm-12" id="group-input-div">
                <div class="col-sm-3">
                    <input class="form-control" id="data-group-name" placeholder="Enter group name here" v-model="newGroup.group_name">
                </div>
                <div class="col-sm-7">
                    <input class="form-control col-sm-9" id="data-group-members" placeholder="Enter group users here" v-model="newGroup.group_members">
                </div>
                <div class="col-sm-2">
                    <button class="btn btn-success" id="button-group-add" @click="create">Add</button>
                </div>
            </div>
        </div>

        <div class="row">
            <h3 class="text-primary">Notices</h3>
            <ul>
                <li class="text-danger">Just enter group name, and list of group members (by coping only member id, or all member id and name)<br>
                    For example, the following inputs are acceptable: <br>
                    ■　[To:34][To:345]<br>
                    ■　[To:34] Nguyen Anh Tienさん[To:345] Tran Duc Thangさん<br>
                    ■　34, 345<br>
                </li>
                <li class="text-danger">Group's name MUST have more than 1 and less than 16 characters, and MUST NOT have more than 2 spaces</li>
                <li class="text-danger">If a name has already existed, its members list will be overwritten.</li>
                <li class="text-danger">Chat++ uses Chrome Storage API to sync your data via Google Account.
                    The maximum total amount of group data that can be stored is 8KB.<br>
                    So do not create too many Groups!</li>
                <li class="text-danger">After registering Group, remember to reload Chatwork to make all the changes become available ^^!</li>
                <li class="text-danger">You can mention a Group everywhere you want, just type the FULL NAME of the Group and the suggestion will appear.</li>
            </ul>
        </div>

        <div class="row">
            <h3 class="text-primary">Group Data</h3>
            <div class="col-sm-12 table-responsive" id="group-data-div">
                <table class="table table-bordered" id="table-data">
                    <thead>
                    <tr class="success text-center">
                        <th class="text-center">Group Name</th>
                        <th>Group Members</th>
                        <th class="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(group, key) in groups" :key="group.group_name">
                            <td class="text-center">{{ group.group_name }}</td>
                            <td>{{ group.group_members }}</td>
                            <td class="text-center">
                                <button
                                    class="btn btn-warning btn-sm btn-data-remove"
                                    :data-name="group.group_name"
                                    :id="'btn-' + key"
                                    @click="remove(group.group_name)"
                                >Remove</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import find from 'lodash/find'
    import reject from 'lodash/reject'
    import isArray from 'lodash/isArray'
    import {CHROME_SYNC_GROUP_KEY} from '../js/helpers/Const'
    import StorageGroup from '../js/helpers/StorageGroup'

    const storage = new StorageGroup(CHROME_SYNC_GROUP_KEY)

    const newDefault = {
        group_name: '',
        group_members: '',
    }

    function isNumeric(obj) {
        let realStringObj = obj && obj.toString()
		return !isArray(obj) && (realStringObj - parseFloat(realStringObj) + 1) >= 0;
    }

    function validateGroupName(data) {
        if (data.length > 15 || data.length < 2) {
            return false
        }

        return data.split(' ').length - 1 <= 2
    }

    function getGroupMembers(data) {
        const members = data.split(',')
        const valid_members = []
        for (let i = 0; i < members.length; i++) {
            let member = members[i].trim()
            if (member && isNumeric(member)) {
                if (valid_members.indexOf(member) === -1) {
                    valid_members.push(member);
                }
            }
        }

        const regex = /\[[a-zA-Z]+:([0-9]+)\]/g;
        let match;
        while ((match = regex.exec(data)) != null) {
            valid_members.push(match[1]);
        }
        return valid_members;
    }

    export default {
        meta: {
            title: 'Groups',
        },

        data () {
            return {
                groups: [],
                loaded: false,
                newGroup: newDefault,
            }
        },

        mounted () {
            storage.refresh([]).then(data => {
                this.groups = data
                this.loaded = true
            })
        },

        methods: {
            create() {
                let name = this.newGroup.group_name.trim()
                let members = getGroupMembers(this.newGroup.group_members)
                if (find(this.groups, {group_name: name})) {
                    alert('Select unique name')
                } else if (!validateGroupName(name) || members.length === 0) {
                    alert('Invalid input')
                } else {
                    this.groups.push({
                        group_name: name,
                        group_members: members,
                    })
                    storage.store(Object.assign({}, this.groups)).then(() => {
                        this.newGroup.group_name = newDefault.group_name
                        this.newGroup.group_members = newDefault.group_members
                    })
                }
            },
            remove(name) {
                const removed = reject(this.groups, group => {
                    return group.group_name === name
                })
                storage.store(removed).then(() => {
                    this.groups = removed
                })
            }
        }
    }
</script>
