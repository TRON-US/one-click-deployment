/*
 * @Author: lxm 
 * @Date: 2019-10-15 11:03:42 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-28 18:21:34
 * @setting base setting 
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
                ref="baseSettingDialogForm"
                :rules="branchRules"
                :model="baseSettingForm"
                label-width="230px"
                class="tronbaseSettingForm"
                label-position="left"
            >
                <el-form-item label="chainId" prop="chainId">
                    <el-input
                        :maxlength="50"
                        v-model="baseSettingForm.chainId"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item label="chainName" prop="chainName">
                    <el-input
                        :maxlength="50"
                        v-model="baseSettingForm.chainName"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item label="blockProducedTimeOut" prop="block_proposalExpireTime">
                    <el-input
                        :maxlength="50"
                        v-model="baseSettingForm.block_proposalExpireTime"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="blockMaintenanceTimeInterval"
                    prop="block_maintenanceTimeInterval"
                >
                    <el-input
                        :maxlength="50"
                        v-model="baseSettingForm.block_maintenanceTimeInterval"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item label="nodeBlockProducedTimeOut" prop="node_blockProducedTimeOut">
                    <el-input
                        :maxlength="50"
                        v-model="baseSettingForm.node_blockProducedTimeOut"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item label="nodeMinParticipationRate" prop="node_minParticipationRate">
                    <el-input
                        :maxlength="50"
                        v-model="baseSettingForm.node_minParticipationRate"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item label-width="0" class="textCenter">
                    <el-button
                        type="primary"
                        @click="saveData('baseSettingDialogForm')"
                    >{{$t('tronSettingSave')}}</el-button>
                    <el-button @click="cancelFun">{{$t('tronSettingCancel')}}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import { baseSettingApi } from "@/api/settingApi";
import { isvalidateNum } from "@/utils/validate.js";
export default {
    name: "baseSetting",
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
            dialogTitle: this.$t("tronSettingBase"),
            baseSettingForm: {},
            branchRules: {
                chainId: [
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
                chainName: [
                    {
                        required: true,
                        message: this.$t("tronSettingPlaceholder"),
                        trigger: "blur"
                    }
                ],
                block_proposalExpireTime: [
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
                block_maintenanceTimeInterval: [
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
                node_blockProducedTimeOut: [
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
                node_minParticipationRate: [
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
            // this.$refs.baseSettingDialogForm.resetFields();
            this.dialogVisible = false;
        },
        cancelFun() {
            // this.$refs.baseSettingDialogForm.resetFields();
            this.dialogVisible = false;
        },
        saveData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log(this.baseSettingForm);
                    const newBaseSettingForm = {
                        chainId: this.baseSettingForm.chainId,
                        chainName: this.baseSettingForm.chainName,
                        blockProducedTimeOut: this.baseSettingForm
                            .node_blockProducedTimeOut,
                        maintenanceTimeInterval: this.baseSettingForm
                            .block_maintenanceTimeInterval,
                        proposalExpireTime: this.baseSettingForm
                            .block_proposalExpireTime,
                        minParticipationRate: this.baseSettingForm
                            .node_minParticipationRate
                    };
                    baseSettingApi(newBaseSettingForm)
                        .then(response => {
                            this.$emit("addSettingSuccess", true);
                            // this.$refs.baseSettingDialogForm.resetFields();
                            this.$message.success(
                                this.$t("tronSettingBaseSaveSuccess")
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

