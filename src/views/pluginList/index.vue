/*
 * @Author: lxm 
 * @Date: 2019-08-28 15:27:13 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-21 17:05:59
 * @tron plugin list  
 */
<template>
    <div class="app-container">
        <div class="tron-content">
            <div class="tron-filter-section">
                <el-button size="mini" type="primary" @click="pluginSetting.visible =true">点击导入配置</el-button>
            </div>
            <div class="filter-container tron-table">
                <!--tron table-->
                <!-- <el-form
                    ref="crossSettingDialogForm"
                    :model="pluginForm"
                    label-width="200px"
                    label-position="left"
                >
                    <el-steps :active="currentStep" align-center>
                        <el-step title="步骤1" description="共识模块配置"></el-step>
                        <el-step title="步骤2" description="交易模块配置"></el-step>
                        <el-step title="步骤3" description="数据库模块配置"></el-step>
                    </el-steps>
                    <div>
                        <el-form-item label="ID" prop>
                            <el-input
                                :maxlength="50"
                                v-model="pluginForm.publicModal"
                                placeholder="请填写id"
                            ></el-input>
                        </el-form-item>
                    </div>
                    <div></div>
                    <div></div>

                    <el-button>下一步</el-button>
                </el-form>-->
            </div>
        </div>
        <operate-plugin
            :genesisDialogVisible="pluginSetting.visible"
            :detailInfoData="pluginSetting.detail"
            @dialog="pluginSettingDetailFun"
        ></operate-plugin>
    </div>
</template>
<script>
import operatePlugin from "./operatePluginList";
export default {
    name: "nodelist",
    components: {
        operatePlugin
    },
    data() {
        return {
            pluginForm: {
                publicModal: "",
                transactionModal: "",
                dbModal: ""
            },
            pluginSetting: {
                visible: false,
                detail: {}
            },
            list: [{ id: 0 }],
            listLoading: false,
            filterItem: {
                name: ""
            },
            currentStep: 1
        };
    },

    created() {},
    methods: {
        addNodeFun() {},
        pluginSettingDetailFun(val) {
            this.pluginSetting.visible = val;
        }
    }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.license {
    display: block;
    width: 120px;
    height: 80px;
}
</style>
