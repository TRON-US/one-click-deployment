/*
 * @Author: lxm 
 * @Date: 2019-10-15 11:03:42 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-21 18:12:00
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
                label-width="210px"
                class="tronp2pSettingForm"
                label-position="left"
            >
                <el-form-item label="p2pVersion" prop="p2pVersion">
                    <el-input
                        :maxlength="50"
                        v-model="p2pSettingForm.p2pVersion"
                        placeholder="请填写p2pVersion"
                    ></el-input>
                </el-form-item>
                <el-form-item label="maxActionNodes" prop="maxActionNodes">
                    <el-input
                        :maxlength="50"
                        v-model="p2pSettingForm.maxActionNodes"
                        placeholder="请填写maxActionNodes"
                    ></el-input>
                </el-form-item>
                <el-form-item label="maxActiveNodesWithSample" prop="blockProducedTimeOut">
                    <el-input
                        :maxlength="50"
                        v-model="p2pSettingForm.maxActiveNodesWithSample"
                        placeholder="请填写maxActiveNodesWithSample"
                    ></el-input>
                </el-form-item>
                <el-form-item label="activeConnectFactor" prop="activeConnectFactor">
                    <el-input
                        :maxlength="50"
                        v-model="p2pSettingForm.activeConnectFactor"
                        placeholder="请填写activeConnectFactor"
                    ></el-input>
                </el-form-item>
                <el-form-item label="seedNode" prop="seedNode">
                    <el-input
                        :maxlength="50"
                        v-model="p2pSettingForm.seedNode"
                        placeholder="请填写seedNode"
                    ></el-input>
                </el-form-item>
                <el-form-item label="trustNode" prop="trustNode">
                    <el-input
                        :maxlength="50"
                        v-model="p2pSettingForm.trustNode"
                        placeholder="请填写trustNode"
                    ></el-input>
                </el-form-item>
                <el-form-item label-width="0" class="textCenter">
                    <el-button type="primary" @click="saveData('p2pSettingDialogForm')">保存</el-button>
                    <el-button @click="cancelFun">取消</el-button>
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
            dialogTitle: "p2pSetting",
            p2pSettingForm: {},
            p2pSettingRules: {
                p2pVersion: [
                    {
                        required: true,
                        message: "请填写分支编码",
                        trigger: "change"
                    }
                ],
                maxActionNodes: [
                    {
                        required: true,
                        message: "请选择分支名称",
                        trigger: "change"
                    }
                ],
                trustNodeWithSample: {
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
            this.$refs.p2pSettingDialogForm.resetFields();
            this.dialogVisible = false;
        },
        cancelFun() {
            this.$refs.p2pSettingDialogForm.resetFields();
            this.dialogVisible = false;
        },
        saveData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$set(
                        this.p2pSettingForm,
                        "nursery_id",
                        this.$route.query.id
                    );

                    // branchSave(this.p2pSettingForm)
                    //     .then(response => {
                    //         this.$emit("addClassSuccess", true);
                    //         this.$refs.p2pSettingDialogForm.resetFields();
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
</style>

