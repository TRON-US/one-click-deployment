<template>
    <div class="dashboard-container">
        <el-row>
            <!-- <el-button icon="el-icon-question" type="primary" @click.prevent.stop="guide">使用引导</el-button> -->
            <router-link :to="{path:'/node/list'}">
                <el-button type="warning">开始一键部署</el-button>
            </router-link>
        </el-row>

        <div id="first-element-introduction">
            <panel-group />
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
// import Driver from "driver.js"; // import driver.js
// import "driver.js/dist/driver.min.css"; // import driver.js css
import PanelGroup from "./components/PanelGroup";
export default {
    name: "Dashboard",
    data() {
        return {
            // steps: [
            //     {
            //         element: "#first-element-introduction",
            //         stageBackground: "#ffffff",
            //         popover: {
            //             title: "数据详情",
            //             description: "数据展示：当前页面展示所有数据详情",
            //             position: "bottom"
            //         }
            //     },
            //     {
            //         element: "#nodeMenu",
            //         stageBackground: "rgba(0, 0, 0,0)",
            //         popover: {
            //             title: "节点管理",
            //             description:
            //                 "第一步：添加节点,查看节点信息并管理节点信息",
            //             position: "right"
            //         }
            //     },
            //     {
            //         element: "#settinglist",
            //         stageBackground: "rgba(0, 0, 0,0)",
            //         popover: {
            //             title: "配置管理",
            //             description:
            //                 "第二步：配置设置,可以进行个性化配置修改或者默认当前设置",
            //             position: "right"
            //         }
            //     },
            //     {
            //         element: "#pluginlist",
            //         stageBackground: "rgba(0, 0, 0,0)",
            //         popover: {
            //             title: "导入插件",
            //             description:
            //                 "第三步：导入插件 共识模块 交易模块 数据库模块的插件个性化设置",
            //             position: "right"
            //         }
            //     },
            //     {
            //         element: "#nodeMenu",
            //         stageBackground: "rgba(0, 0, 0,0)",
            //         popover: {
            //             title: "节点部署",
            //             description:
            //                 "第四步：节点部署,部署节点信息 支持单个部署和批量部署",
            //             position: "right"
            //         }
            //     }
            // ]
        };
    },
    mounted() {
        // this.driver = new Driver({ opacity: 0.75, animate: true });
    },
    components: {
        PanelGroup
    },
    methods: {
        // guide() {
        //     this.driver.defineSteps(this.steps);
        //     this.driver.start();
        // }
    },
    computed: {
        ...mapGetters(["name"])
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
