<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="text-warning">
                    <img src="../img/icon64.png" id="popup_page" alt="Angelic">
                    <strong><span id="chatpp_name">{{ appName }}</span></strong>
                    {{ title }}
                    <br>
                </h1>
                <h3 class="text-success">*** A Chatwork Enhancement Toolkit ***</h3>
                <hr>
                <div class="row media-body pull-left" style="padding-top: 10px">
                    <router-link
                        tag="button"
                        v-for="page in pages"
                        type="button"
                        class="btn btn-primary btn-xs"
                        style="margin-bottom: 10px"
                        :key="page"
                        :to="page"
                    >
                        {{ page }}
                    </router-link>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    const appName = 'Chat++'
    const pages = ['settings', 'emoticons', 'groups', 'shortcuts', 'rooms', 'notifications']

    export default {
        meta () {
            return {
                title: appName,
                titleTemplate: `%s | ${appName}`,
            }
        },

        beforeRouteUpdate (to, from, next) {
            this.updateTitle()
        },

        mounted () {
            this.updateTitle()
        },

        data () {
            return {
                appName,
                title: 'Chat++',
                pages,
            }
        },

        methods: {
            updateTitle () {
                this.title = this.$meta().inject().titleChunk
            }
        }
    }
</script>

<style src="bootstrap/dist/css/bootstrap.css"></style>
