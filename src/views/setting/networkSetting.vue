/*
 * @Author: lxm 
 * @Date: 2019-10-15 11:03:42 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-28 18:22:13
 * @setting cross setting
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
                ref="crossSettingDialogForm"
                :rules="branchRules"
                :model="baseSettingForm"
                label-width="200px"
                class="tronbaseSettingForm"
                label-position="left"
            >
                <el-form-item label="maxHttpConnectNumber" prop="node_maxHttpConnectNumber">
                    <el-input
                        :maxlength="50"
                        v-model="baseSettingForm.node_maxHttpConnectNumber"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item label="httpFullNodePort" prop="node_http_fullNodePort">
                    <el-input
                        :maxlength="50"
                        v-model="baseSettingForm.node_http_fullNodePort"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item label="httpSolidityPort" prop="node_http_solidityPort">
                    <el-input
                        :maxlength="50"
                        v-model="baseSettingForm.node_http_solidityPort"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>

                <el-form-item label="rpcPort" prop="node_rpc_port">
                    <el-input
                        :maxlength="50"
                        v-model="baseSettingForm.node_rpc_port"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item label="rpcSolidityPort" prop="node_rpc_solidityPort">
                    <el-input
                        :maxlength="50"
                        v-model="baseSettingForm.node_rpc_solidityPort"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item label-width="0" class="textCenter">
                    <el-button
                        type="primary"
                        @click="saveData('crossSettingDialogForm')"
                    >{{$t('tronSettingSave')}}</el-button>
                    <el-button @click="cancelFun">{{$t('tronSettingCancel')}}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import { networkSettingApi } from "@/api/settingApi";
import { isvalidateNum } from "@/utils/validate.js";
export default {
    name: "networkSetting",
    props: ["branchDialogVisible", "detailInfoData", "editStatus"],
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
            dialogTitle: this.$t("tronSettingHttp"),
            baseSettingForm: {
                node_maxHttpConnectNumber: "",
                node_http_solidityPort: "",
                node_http_fullNodePort: "",
                node_rpc_port: "",
                node_rpc_solidityPort: ""
            },
            branchRules: {
                node_maxHttpConnectNumber: [
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
                node_http_fullNodePort: [
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
                node_http_solidityPort: [
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
                node_rpc_port: [
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
                node_rpc_solidityPort: [
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
                ]
            }
        };
    },
    methods: {
        openDialogFun() {},
        closeFun() {
            // this.$refs.crossSettingDialogForm.resetFields();
            this.dialogVisible = false;
        },
        cancelFun() {
            // this.$refs.crossSettingDialogForm.resetFields();
            this.dialogVisible = false;
        },
        saveData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    const newSettingForm = {
                        maxHttpConnectNumber: this.baseSettingForm
                            .node_maxHttpConnectNumber,
                        rpcPort: this.baseSettingForm.node_rpc_port,
                        rpcSolidityPort: this.baseSettingForm
                            .node_rpc_solidityPort,
                        httpFullNodePort: this.baseSettingForm
                            .node_http_fullNodePort,
                        httpSolidityPort: this.baseSettingForm
                            .node_http_solidityPort
                    };
                    networkSettingApi(newSettingForm)
                        .then(response => {
                            this.$emit("addSettingSuccess", true);
                            // this.$refs.crossSettingDialogForm.resetFields();
                            this.$message.success(
                                this.$t("tronSettingNetworkSaveSuccess")
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
            this.baseSettingForm = this.detailInfoData;
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
.tronbaseSettingForm {
    padding: 0 80px 0 0;
}
</style>

