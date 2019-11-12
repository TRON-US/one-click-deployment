<template>
    <div class="dashboard-container">
        <el-row>
            <!-- <el-button icon="el-icon-question" type="primary" @click.prevent.stop="guide">使用引导</el-button> -->
            <!-- <router-link :to="{path:'/node/list'}"> -->
            <el-button type="warning" @click="startOneClickFun">{{$t('startTronOneClickDeploy')}}</el-button>
            <!-- </router-link> -->
        </el-row>

        <div id="first-element-introduction">
            <panel-group />
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

import { setToken } from "@/utils/auth"; // get token from cookie
import PanelGroup from "./components/PanelGroup";
import { oneClickApi } from "@/api/dashboard";
export default {
    name: "Dashboard",
    created() {},
    components: {
        PanelGroup
    },
    methods: {
        startOneClickFun() {
            // if (this.token == "plugin") {
            //     setToken("plugin");
            // } else {
            //     setToken("node");
            // }
            this.newp2pTimestampFun();
        },
        newp2pTimestampFun() {
            oneClickApi()
                .then(async response => {
                    console.log(response);
                    await this.$store
                        .dispatch("user/changeRoles", "node")
                        .then(res => {
                            console.log(res);
                        });
                    this.$router.push("/node/list");
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    computed: {
        ...mapGetters(["name", "token"])
    }
};
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>
