<template>
    <div class="dashboard-container">
        <div id="first-element-introduction">
            <panel-group />
        </div>
        <el-button icon="el-icon-question" type="primary" @click.prevent.stop="guide">使用引导</el-button>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Driver from "driver.js"; // import driver.js
import "driver.js/dist/driver.min.css"; // import driver.js css
import PanelGroup from "./components/PanelGroup";
export default {
    name: "Dashboard",
    data() {
        return {
            steps: [
                {
                    element: "#first-element-introduction",
                    stageBackground: "#ffffff",
                    popover: {
                        title: "数据详情",
                        description: "当前页面展示所有数据详情",
                        position: "bottom"
                    }
                },
                {
                    element: "#nodeMenu",
                    stageBackground: "rgba(0, 0, 0,0)",
                    popover: {
                        title: "节点管理",
                        description: "添加节点,并管理节点信息",
                        position: "right"
                    }
                },
                {
                    element: "#settinglist",
                    stageBackground: "rgba(0, 0, 0,0)",
                    popover: {
                        title: "配置管理",
                        description:
                            "默认所有设置,可以进行个性化修改或者默认设置",
                        position: "right"
                    }
                },
                {
                    element: "#pluginlist",
                    stageBackground: "rgba(0, 0, 0,0)",
                    popover: {
                        title: "导入插件",
                        description:
                            "可以导入插件 进行公式模块 交易模块 数据库模块的修改",
                        position: "right"
                    }
                },
                {
                    element: "#nodeMenu",
                    stageBackground: "rgba(0, 0, 0,0)",
                    popover: {
                        title: "节点部署",
                        description: "最后部署节点信息 支持单个部署和批量部署",
                        position: "right"
                    }
                }
            ]
        };
    },
    mounted() {
        this.driver = new Driver({ opacity: 0.75, animate: true });
    },
    components: {
        PanelGroup
    },
    methods: {
        guide() {
            this.driver.defineSteps(this.steps);
            this.driver.start();
        }
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
