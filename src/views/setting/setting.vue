/*
 * @Author: lxm 
 * @Date: 2019-08-28 15:27:13 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-11-03 15:29:10
 * @tron setting default  
 */
<template>
    <div class="app-container">
        <div class="tron-content">
            <div class="tron-filter-section">
                <div>
                    <el-steps :active="currentStep" align-center type="mini">
                        <el-step :title="$t('tronSettingGenesis')"></el-step>
                        <el-step :title="$t('tronSettingBase')"></el-step>
                        <el-step :title="$t('tronSettingP2p')"></el-step>
                        <el-step :title="$t('tronSettingDb')"></el-step>
                        <el-step :title="$t('tronSettingHttp')"></el-step>
                        <el-step :title="$t('tronCrossChain')"></el-step>
                    </el-steps>
                </div>
            </div>
            <div class="filter-container tron-table tabSection">
                <!--tron form-->
                <genesis-setting
                    v-if="currentStep == 1"
                    :detailInfoData="genesisSetting.detail"
                    @dialog="genesisSettingDetailFun"
                ></genesis-setting>
                <base-setting
                    v-if="currentStep == 2"
                    :branchDialogVisible="baseSetting.visible"
                    :detailInfoData="baseSetting.detail"
                    @dialog="baseSettingDetailFun"
                    @addSettingSuccess="addSettingSuccessFun"
                ></base-setting>
                <p2p-setting
                    v-if="currentStep == 3"
                    :branchDialogVisible="p2pSetting.visible"
                    :detailInfoData="p2pSetting.detail"
                    @addSettingSuccess="addSettingSuccessFun"
                    @dialog="p2pSettingDetailFun"
                ></p2p-setting>
                <databaseSetting
                    v-if="currentStep == 4"
                    :branchDialogVisible="databaseSettingForm.visible"
                    :detailInfoData="databaseSettingForm.detail"
                    @addSettingSuccess="addSettingSuccessFun"
                    @dialog="dbSettingDetailFun"
                ></databaseSetting>
                <network-setting
                    v-if="currentStep == 5"
                    :branchDialogVisible="networkSetting.visible"
                    :detailInfoData="networkSetting.detail"
                    @addSettingSuccess="addSettingSuccessFun"
                    @dialog="networkSettingDetailFun"
                ></network-setting>
                <cross-chain
                    v-if="currentStep == 6"
                    :branchDialogVisible="crossChainSetting.visible"
                    :detailInfoData="crossChainSetting.detail"
                    @addSettingSuccess="addSettingSuccessFun"
                    @dialog="crossChainSettingDetailFun"
                ></cross-chain>
            </div>
        </div>
    </div>
</template>
<script>
import { originSettingApi, configSettingfdApi } from "@/api/settingApi.js";
import genesisSetting from "./genesisSetting";
import baseSetting from "./baseSetting";
import p2pSetting from "./p2pSetting";
import crossChain from "./crossChain";
import databaseSetting from "./dbSetting";
import networkSetting from "./networkSetting";
export default {
    name: "settingList",
    components: {
        genesisSetting,
        baseSetting,
        p2pSetting,
        crossChain,
        databaseSetting,
        networkSetting
    },
    data() {
        return {
            currentStep: 1,
            genesisSetting: {
                visible: false,
                detail: {}
            },
            baseSetting: {
                visible: false,
                detail: {}
            },
            p2pSetting: {
                visible: false,
                detail: {}
            },
            crossChainSetting: {
                visible: false,
                detail: {}
            },
            databaseSettingForm: {
                visible: false,
                detail: {}
            },
            networkSetting: {
                visible: false,
                detail: {}
            },
            originSettingObj: {},
            seedNodeIpList: []
        };
    },
    created() {
        this.getOriginSettingFun();
        this.getCurrentSettingFun();
    },

    methods: {
        getOriginSettingFun() {
            this.$store
                .dispatch("tronSetting/getOriginConfig")
                .then(response => {
                    this.originSettingObj = response;
                    if (response.p2pConfig.seed_node_ip_list) {
                        let newIpList = [];
                        response.p2pConfig.seed_node_ip_list.forEach(item => {
                            newIpList.push({
                                ip: item,
                                port: ""
                            });
                        });
                        this.seedNodeIpList = newIpList;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getCurrentSettingFun() {
            this.$store
                .dispatch("tronSetting/getConfigSetting")
                .then(response => {
                    this.genesisSetting.detail = response.genesisSetting;
                    this.baseSetting.detail = response.baseSettingConfig;
                    this.p2pSetting.detail = {
                        ...response.p2pConfig,
                        defalutSelectedIp: []
                    };
                    this.databaseSettingForm.detail = response.dbConfig;
                    this.networkSetting.detail = response.networkConfig;
                    this.crossChainSetting.detail = response.crossChainConfig;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        async modifySettingFun(type) {
            await this.getCurrentSettingFun();
            switch (type) {
                case 1:
                    this.genesisSetting.visible = true;
                    break;
                case 2:
                    this.baseSetting.visible = true;
                    break;
                case 3:
                    this.p2pSetting.visible = true;
                    break;
                case 4:
                    this.databaseSettingForm.visible = true;
                    break;
                case 5:
                    this.networkSetting.visible = true;
                    break;
                case 6:
                    this.crossChainSetting.visible = true;
                    break;
                default:
            }
        },
        resetSettingFun() {
            // rest setting
            this.genesisSetting.detail = this.originSettingObj.genesisSetting;
            this.baseSetting.detail = this.originSettingObj.baseSettingConfig;
            this.p2pSetting.detail = this.originSettingObj.p2pConfig;
            this.databaseSettingForm.detial = this.originSettingObj.dbConfig;
            this.networkSetting.detail = this.originSettingObj.networkConfig;
        },

        // genesis setting
        genesisSettingDetailFun(val) {
            this.genesisSetting.visible = val;
        },
        // base setting
        baseSettingDetailFun(val) {
            this.baseSetting.visible = val;
        },
        addSettingSuccessFun(val) {
            if (val) {
                this.getCurrentSettingFun();
            }
        },
        // p2p setting
        p2pSettingDetailFun(val) {
            this.p2pSetting.visible = val;
        },
        // cross chain setting
        crossChainSettingDetailFun(val) {
            this.crossChainSetting.visible = val;
        },
        // db setting
        dbSettingDetailFun(val) {
            this.databaseSettingForm.visible = val;
        },
        // network setting
        networkSettingDetailFun(val) {
            this.networkSetting.visible = val;
        }
    }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.tabSection {
    table {
        border-left: 1px solid #ebeef5;
        border-top: 1px solid #ebeef5;
    }
    td {
        padding: 12px 0;
        border-bottom: 1px solid #ebeef5;
        border-right: 1px solid #ebeef5;
    }
    th {
        padding: 12px 0;
        border-bottom: 1px solid #ebeef5;
        border-right: 1px solid #ebeef5;
    }
}
</style>
