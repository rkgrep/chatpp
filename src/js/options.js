import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'

Vue.use(VueRouter)

Vue.use(VueMeta, {
    keyName: 'meta',
    attribute: 'data-vue-meta',
    tagIDKeyName: 'vmid',
})

import Options from '../components/Options.vue'
import Settings from '../components/Settings.vue'
import Shortcuts from '../components/Shortcuts.vue'
import Groups from '../components/Groups.vue'
import Rooms from '../components/Rooms.vue'

const routes = [
    { path: '/', alias: '/settings', component: Settings },
    { path: '/shortcuts', component: Shortcuts },
    { path: '/rooms', component: Rooms },
]

const router = new VueRouter({
    routes,
})

import Const from './helpers/Const'

const app = new Vue({
    el: '#app',
    router,
    render: (h) => h(Options)
})
