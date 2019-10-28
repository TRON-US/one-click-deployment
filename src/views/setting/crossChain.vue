/*
 * @Author: lxm 
 * @Date: 2019-10-15 11:03:42 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-28 18:21:26
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
                <el-form-item label="enableCrossChain" prop="enableCrossChain">
                    <el-switch
                        v-model="baseSettingForm.enableCrossChain"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    ></el-switch>
                </el-form-item>
                <el-form-item label="maxValidatorNumber" prop="maxValidatorNumber">
                    <el-input
                        :maxlength="50"
                        v-model="baseSettingForm.maxValidatorNumber"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item label="minValidatorNumber" prop="minValidatorNumber">
                    <el-input
                        :maxlength="50"
                        v-model="baseSettingForm.minValidatorNumber"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>

                <el-form-item label="crossChainFee" prop="crossChainFee">
                    <el-input-number
                        controls-position="right"
                        :min="0"
                        :step="0.01"
                        :maxlength="50"
                        v-model="baseSettingForm.crossChainFee"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input-number>
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
import { crossChainSettingApi } from "@/api/settingApi";
import { isvalidateNum, twoDecimal } from "@/utils/validate.js";
export default {
    name: "corssChain",
    props: ["branchDialogVisible", "detailInfoData", "editStatus"],
    data() {
        const validNum = (rule, value, callback) => {
            if (!isvalidateNum(value)) {
                callback(new Error(this.$t("tronSettingNumberPlaceholder")));
            } else {
                callback();
            }
        };
        const validTwoDecimalFun = (rule, value, callback) => {
            if (!twoDecimal(value)) {
                callback(new Error(this.$t("validTwoDecimal")));
            } else {
                callback();
            }
        };
        return {
            classLoading: false,
            dialogVisible: this.branchDialogVisible,
            dialogTitle: this.$t("tronCrossChain"),
            baseSettingForm: {},
            branchRules: {
                enableCrossChain: [
                    {
                        required: true,
                        message: this.$t("tronSettingPlaceholder"),
                        trigger: "change"
                    }
                ],
                maxValidatorNumber: [
                    {
                        required: true,
                        message: this.$t("tronSettingPlaceholder"),
                        trigger: "change"
                    },
                    {
                        message: this.$t("tronSettingNumberPlaceholder"),
                        validator: validNum,
                        trigger: "blur"
                    }
                ],
                minValidatorNumber: [
                    {
                        required: true,
                        message: this.$t("tronSettingPlaceholder"),
                        trigger: "change"
                    },
                    {
                        message: this.$t("tronSettingNumberPlaceholder"),
                        validator: validNum,
                        trigger: "blur"
                    }
                ],
                crossChainFee: [
                    {
                        required: true,
                        message: this.$t("tronSettingPlaceholder"),
                        trigger: "change"
                    },
                    {
                        message: this.$t("tronSettingNumberTwoDecimal"),
                        validator: validTwoDecimalFun,
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
                    crossChainSettingApi(this.baseSettingForm)
                        .then(response => {
                            this.$emit("addSettingSuccess", true);
                            // this.$refs.crossSettingDialogForm.resetFields();
                            this.$message.success(
                                this.$t("tronSettingCrossChainSaveSuccess")
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

