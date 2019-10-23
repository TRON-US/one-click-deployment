/*
 * @Author: lxm 
 * @Date: 2019-10-15 11:03:42 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-23 18:41:11
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
                ref="branchDialogForm"
                :rules="branchRules"
                :model="baseSettingForm"
                label-width="200px"
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
                <el-form-item label="blockProducedTimeOut" prop="blockProducedTimeOut">
                    <el-input
                        :maxlength="50"
                        v-model="baseSettingForm.blockProducedTimeOut"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item label="nextMaintenanceTime" prop="nextMaintenanceTime">
                    <el-input
                        :maxlength="50"
                        v-model="baseSettingForm.nextMaintenanceTime"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item label="proposalExpireTime" prop="proposalExpireTime">
                    <el-input
                        :maxlength="50"
                        v-model="baseSettingForm.proposalExpireTime"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item label="maxActiveNodes" prop="maxActiveNodes">
                    <el-input
                        :maxlength="50"
                        v-model="baseSettingForm.maxActiveNodes"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item label="logConfigPath" prop="logConfigPath">
                    <el-input
                        :maxlength="50"
                        v-model="baseSettingForm.logConfigPath"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item label="dbDirectory" prop="dbDirectory">
                    <el-input
                        :maxlength="50"
                        v-model="baseSettingForm.dbDirectory"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item label="minParticipationRate" prop="minParticipationRate">
                    <el-input
                        :maxlength="50"
                        v-model="baseSettingForm.minParticipationRate"
                        :placeholder="$t('tronSettingPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item label-width="0" class="textCenter">
                    <el-button
                        type="primary"
                        @click="saveData('branchDialogForm')"
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
            dialogTitle: this.$t("tronSettingBase"),
            baseSettingForm: {},
            branchRules: {
                chainId: [
                    {
                        required: true,
                        message: "请填写分支编码",
                        trigger: "change"
                    }
                ],
                chainName: [
                    {
                        required: true,
                        message: "请选择分支名称",
                        trigger: "change"
                    }
                ],
                blockProducedTimeOut: {
                    required: true,
                    message: "请填写备注",
                    trigger: "change"
                }
            }
        };
    },
    methods: {
        openDialogFun() {},
        closeFun() {
            this.$refs.branchDialogForm.resetFields();
            this.dialogVisible = false;
        },
        cancelFun() {
            this.$refs.branchDialogForm.resetFields();
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
                    //         this.$refs.branchDialogForm.resetFields();
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

