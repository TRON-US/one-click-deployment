/*
 * @Author: lxm 
 * @Date: 2019-10-15 11:03:42 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-23 18:44:08
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
                <el-form-item label="maxHttpConnectNumber" prop="maxHttpConnectNumber">
                    <el-input
                        :maxlength="50"
                        v-model="baseSettingForm.maxHttpConnectNumber"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item label="httpEnable" prop="httpEnable">
                    <el-switch
                        v-model="baseSettingForm.httpEnable"
                        active-text="On"
                        inactive-text="Off"
                    ></el-switch>
                </el-form-item>
                <el-form-item label="httpPort" prop="httpPort">
                    <el-input
                        :maxlength="50"
                        v-model="baseSettingForm.httpPort"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item label="rpcEnable" prop="rpcEnable">
                    <el-switch
                        v-model="baseSettingForm.rpcEnable"
                        active-text="On"
                        inactive-text="Off"
                    ></el-switch>
                </el-form-item>
                <el-form-item label="rpcPort" prop="rpcPort">
                    <el-input
                        :maxlength="50"
                        v-model="baseSettingForm.rpcPort"
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
import { branchSaveApi, branchGetApi } from "@/api/branchApi";

export default {
    name: "baseSetting",
    props: ["branchDialogVisible", "detailInfoData", "editStatus"],
    data() {
        return {
            classLoading: false,
            dialogVisible: this.branchDialogVisible,
            dialogTitle: this.$t("tronSettingHttp"),
            baseSettingForm: {},
            branchRules: {
                maxHttpConnectNumber: [
                    {
                        required: true,
                        message: "请填写maxHttpConnectNumber",
                        trigger: "change"
                    }
                ],
                httpEnable: [
                    {
                        required: true,
                        message: "请填写maxValidatorNumber",
                        trigger: "change"
                    }
                ],
                httpPort: {
                    required: true,
                    message: "请填写httpPort",
                    trigger: "change"
                }
            }
        };
    },
    methods: {
        openDialogFun() {},
        closeFun() {
            this.$refs.crossSettingDialogForm.resetFields();
            this.dialogVisible = false;
        },
        cancelFun() {
            this.$refs.crossSettingDialogForm.resetFields();
            this.dialogVisible = false;
        },
        saveData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$set(
                        this.baseSettingForm,
                        "nursery_id",
                        this.$route.query.id
                    );

                    // branchSave(this.baseSettingForm)
                    //     .then(response => {
                    //         this.$emit("addClassSuccess", true);
                    //         this.$refs.crossSettingDialogForm.resetFields();
                    //         this.$message.success("添加班级信息成功");
                    //         this.dialogVisible = false;
                    //     })
                    //     .catch(error => {
                    //         // this.listLoading = false;
                    //         console.log(error);
                    //     });
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

