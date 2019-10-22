/*
 * @Author: lxm 
 * @Date: 2019-08-28 15:27:13 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-21 19:00:22
 * @tron node list  
 */
<template>
    <div class="app-container">
        <div class="tron-content">
            <div class="tron-filter-section">
                <el-button size="mini" @click="addNodeFun()" type="primary">申请配置</el-button>
            </div>
            <div class="filter-container tron-table tabSection">
                <!--tron table-->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <th>创世信息配置</th>
                        <th>
                            <el-button size="mini" type="warning" @click="modifySettingFun(1)">修改配置</el-button>
                        </th>
                        <th>
                            <el-button size="mini" type="danger" @click="resetSettingFun(1)">重置配置</el-button>
                        </th>
                    </tr>
                    <tr>
                        <th>基础配置</th>
                        <th>
                            <el-button size="mini" type="warning" @click="modifySettingFun(2)">修改配置</el-button>
                        </th>
                        <th>
                            <el-button size="mini" type="danger" @click="resetSettingFun(2)">重置配置</el-button>
                        </th>
                    </tr>
                    <tr>
                        <th>p2p配置</th>
                        <th>
                            <el-button size="mini" type="warning" @click="modifySettingFun(3)">修改配置</el-button>
                        </th>
                        <th>
                            <el-button size="mini" type="danger" @click="resetSettingFun(3)">重置配置</el-button>
                        </th>
                    </tr>
                    <tr>
                        <th>数据库基础配置</th>
                        <th>
                            <el-button size="mini" type="warning" @click="modifySettingFun(4)">修改配置</el-button>
                        </th>
                        <th>
                            <el-button size="mini" type="danger" @click="resetSettingFun(4)">重置配置</el-button>
                        </th>
                    </tr>
                    <tr>
                        <th>网络链接配置(http/rpc)</th>
                        <th>
                            <el-button size="mini" type="warning" @click="modifySettingFun(5)">修改配置</el-button>
                        </th>
                        <th>
                            <el-button size="mini" type="danger" @click="resetSettingFun(5)">重置配置</el-button>
                        </th>
                    </tr>
                    <tr>
                        <th>跨链配置</th>
                        <th>
                            <el-button size="mini" type="warning" @click="modifySettingFun(6)">修改配置</el-button>
                        </th>
                        <th>
                            <el-button size="mini" type="danger" @click="resetSettingFun(6)">重置配置</el-button>
                        </th>
                    </tr>
                </table>
            </div>
        </div>
        <genesis-setting
            :genesisDialogVisible="genesisSetting.visible"
            :detailInfoData="genesisSetting.detail"
            @dialog="genesisSettingDetailFun"
        ></genesis-setting>
        <base-setting
            :branchDialogVisible="baseSetting.visible"
            :detailInfoData="baseSetting.detail"
            @dialog="baseSettingDetailFun"
        ></base-setting>
        <p2p-setting
            :branchDialogVisible="p2pSetting.visible"
            :detailInfoData="p2pSetting.detail"
            @dialog="p2pSettingDetailFun"
        ></p2p-setting>
        <dbSetting
            :branchDialogVisible="dbSetting.visible"
            :detailInfoData="dbSetting.detail"
            @dialog="dbSettingDetailFun"
        ></dbSetting>
        <network-setting
            :branchDialogVisible="networkSetting.visible"
            :detailInfoData="networkSetting.detail"
            @dialog="networkSettingDetailFun"
        ></network-setting>
        <cross-chain
            :branchDialogVisible="crossChainSetting.visible"
            :detailInfoData="crossChainSetting.detail"
            @dialog="crossChainSettingDetailFun"
        ></cross-chain>
    </div>
</template>
<script>
// import { getNodeList, deleteNode, updateNode } from "@/api/nodeApi.js";
import genesisSetting from "./genesisSetting";
import baseSetting from "./baseSetting";
import p2pSetting from "./p2pSetting";
import crossChain from "./crossChain";
import dbSetting from "./dbSetting";
import networkSetting from "./networkSetting";
export default {
    name: "nodelist",
    components: {
        genesisSetting,
        baseSetting,
        p2pSetting,
        crossChain,
        dbSetting,
        networkSetting
    },
    data() {
        return {
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
            dbSetting: {
                visible: false,
                detail: {}
            },
            networkSetting: {
                visible: false,
                detail: {}
            }
        };
    },
    methods: {
        addNodeFun() {},
        modifySettingFun(type) {
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
                    this.dbSetting.visible = true;
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
        resetSettingFun() {},
        genesisSettingDetailFun(val) {
            this.genesisSetting.visible = val;
        },
        baseSettingDetailFun(val) {
            this.baseSetting.visible = val;
        },
        p2pSettingDetailFun(val) {
            this.p2pSetting.visible = val;
        },
        crossChainSettingDetailFun(val) {
            this.crossChainSetting.visible = val;
        },
        dbSettingDetailFun(val) {
            this.dbSetting.visible = val;
        },
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
