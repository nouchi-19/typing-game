<template>
    <v-container fluid>
        <v-divider></v-divider>
        <v-row justify="center">
            <span class="text-center display-3 ma-2"
            >
                spaseを押してスタート
            </span>
        </v-row>
        <v-row justify="center">
            <div class="ma-2">
                <span class="transparent text-center display-2">escapeでリセット</span>
            </div>
        </v-row>
        <v-divider></v-divider>
    </v-container>
</template>

<script lang='ts'>
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class StartMessage extends Vue {
    }
</script>

<style scoped>

</style>