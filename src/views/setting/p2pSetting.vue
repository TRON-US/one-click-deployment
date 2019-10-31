/*
 * @Author: lxm 
 * @Date: 2019-10-15 11:03:42 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-30 17:32:38
 * @setting p2p setting 
 */

<template>
    <div class="viewBranchDialog">
        <el-dialog
            :title="dialogTitle"
            @open="openDialogFun"
            @close="closeFun"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            v-loading="classLoading"
            width="800px"
            center
        >
            <el-form
                ref="p2pSettingDialogForm"
                :rules="p2pSettingRules"
                :model="p2pSettingForm"
                label-width="260px"
                class="tronp2pSettingForm"
                label-position="left"
            >
                <el-form-item label="p2pVersion" prop="node_p2p_version">
                    <el-input
                        :maxlength="50"
                        v-model="p2pSettingForm.node_p2p_version"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item label="maxActionNodes" prop="node_maxActiveNodes">
                    <el-input
                        :maxlength="50"
                        v-model="p2pSettingForm.node_maxActiveNodes"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="node_maxActiveNodesWithSameIp"
                    prop="node_maxActiveNodesWithSameIp"
                >
                    <el-input
                        :maxlength="50"
                        v-model="p2pSettingForm.node_maxActiveNodesWithSameIp"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item label="activeConnectFactor" prop="node_activeConnectFactor">
                    <el-input-number
                        controls-position="right"
                        :min="0"
                        :step="0.1"
                        :maxlength="50"
                        v-model="p2pSettingForm.node_activeConnectFactor"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input-number>
                </el-form-item>
                <el-form-item label="connectFactor" prop="connectFactor">
                    <el-input-number
                        controls-position="right"
                        :min="0"
                        :step="0.1"
                        :maxlength="50"
                        v-model="p2pSettingForm.connectFactor"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input-number>
                </el-form-item>
                <el-form-item label="seedNode" prop="seedNode">
                    <!-- <el-input
                        :maxlength="50"
                        v-model="p2pSettingForm.seedNode"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>-->
                    <el-checkbox-group
                        v-model="p2pSettingForm.defalutSelectedIp"
                        @change="checkBoxChangeFun"
                    >
                        <el-checkbox
                            class="checkBox"
                            v-for="(item,ind) in nodeListData"
                            :key="item.ip"
                            :label="item.ip"
                        >
                            {{item.ip}}:
                            <el-input
                                style="margin-left:10px;width:100px;"
                                size="mini"
                                :maxlength="50"
                                v-model="item.port"
                                :placeholder="$t('tronSettingPlaceholder')"
                            ></el-input>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label-width="0" class="textCenter">
                    <el-button
                        type="primary"
                        @click="saveData('p2pSettingDialogForm')"
                    >{{$t('tronSettingSave')}}</el-button>
                    <el-button @click="cancelFun">{{$t('tronSettingCancel')}}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import { p2pSettingApi } from "@/api/settingApi";
import { isvalidateNum } from "@/utils/validate.js";
export default {
    name: "baseSetting",
    props: [
        "branchDialogVisible",
        "detailInfoData",
        "editStatus",
        "nodeListData"
    ],
    computed: {
        ...mapGetters(["tronSetting"])
    },
    data() {
        const validNum = (rule, value, callback) => {
            if (!isvalidateNum(value)) {
                callback(new Error(this.$t("tronSettingNumberPlaceholder")));
            } else {
                callback();
            }
        };
        return {
            classLoading: false,
            dialogVisible: this.branchDialogVisible,
            dialogTitle: "p2pSetting",
            p2pSettingForm: {
                node_p2p_version: "",
                node_maxActiveNodes: "",
                node_maxActiveNodesWithSameIp: "",
                connectFactor: "",
                node_activeConnectFactor: ""
            },
            ipOptions: [],
            p2pSettingRules: {
                node_p2p_version: [
                    {
                        required: true,
                        message: this.$t("tronSettingPlaceholder"),
                        trigger: "blur"
                    },
                    {
                        message: this.$t("tronSettingNumberPlaceholder"),
                        validator: validNum,
                        trigger: "blur"
                    }
                ],
                node_maxActiveNodes: [
                    {
                        required: true,
                        message: this.$t("tronSettingPlaceholder"),
                        trigger: "blur"
                    },
                    {
                        message: this.$t("tronSettingNumberPlaceholder"),
                        validator: validNum,
                        trigger: "blur"
                    }
                ],
                node_maxActiveNodesWithSameIp: [
                    {
                        required: true,
                        message: this.$t("tronSettingPlaceholder"),
                        trigger: "blur"
                    },
                    {
                        message: this.$t("tronSettingNumberPlaceholder"),
                        validator: validNum,
                        trigger: "blur"
                    }
                ],
                node_activeConnectFactor: [
                    {
                        required: true,
                        message: this.$t("tronSettingPlaceholder"),
                        trigger: "blur"
                    }
                ],
                connectFactor: [
                    {
                        required: true,
                        message: this.$t("tronSettingPlaceholder"),
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        openDialogFun() {},
        closeFun() {
            // this.$refs.p2pSettingDialogForm.resetFields();
            this.dialogVisible = false;
        },
        checkBoxChangeFun(val) {
            console.log(val);
            // this.p2pSettingForm.
            let newipOptions = [];
            val.forEach(item => {
                newipOptions.push(`${item}":"18889`);
            });
            console.log(newipOptions);
            this.ipOptions = newipOptions;
        },
        cancelFun() {
            // this.$refs.p2pSettingDialogForm.resetFields();
            this.dialogVisible = false;
        },
        saveData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    const newp2pForm = {
                        p2pVersion: this.p2pSettingForm.node_p2p_version,
                        maxActiveNodes: this.p2pSettingForm.node_maxActiveNodes,
                        nodeActiveConnectFactor: this.p2pSettingForm
                            .node_activeConnectFactor,
                        nodeMaxActiveNodesWithSameIp: this.p2pSettingForm
                            .node_maxActiveNodesWithSameIp,
                        connectFactor: this.p2pSettingForm.connectFactor
                    };

                    let nodeList = this.p2pSettingForm.seed_node_ip_list;
                    console.log(nodeList);
                    let newNodeList = [];
                    // nodeList.forEach(item => {
                    //     newNodeList.push(
                    //         item.split(":")[0] + '":"' + item.split(":")[1]
                    //     );
                    // });
                    // console.log(newNodeList);
                    p2pSettingApi(newp2pForm, this.ipOptions)
                        .then(response => {
                            this.$emit("addSettingSuccess", true);
                            this.$message.success(
                                this.$t("tronSettingp2pSaveSuccess")
                            );
                            this.dialogVisible = false;
                        })
                        .catch(error => {
                            // this.listLoading = false;
                            console.log(error);
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    },
    watch: {
        detailInfoData(val) {
            this.p2pSettingForm = this.detailInfoData;
        },
        branchDialogVisible(val) {
            this.dialogVisible = val;
        },
        dialogVisible(val) {
            this.$emit("dialog", val);
        }
    }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.textCenter {
    text-align: center;
}
.tronp2pSettingForm {
    padding: 0 70px 0 0;
}
.checkBox {
    min-width: 170px;
}
</style>

