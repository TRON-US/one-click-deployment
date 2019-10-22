/*
 * @Author: lxm 
 * @Date: 2019-10-15 11:03:42 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-21 19:09:10
 * @setting db setting
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
                ref="dbSettingDialogForm"
                :rules="branchRules"
                :model="dbSettingForm"
                label-width="200px"
                class="trondbSettingForm"
                label-position="left"
            >
                <el-form-item label="是否同步写入" prop="isSyncWrite">
                    <el-switch v-model="dbSettingForm.isSyncWrite"></el-switch>
                </el-form-item>
                <el-form-item label="是否打开transaction" prop="isOpenTransaction">
                    <el-switch v-model="dbSettingForm.isOpenTransaction"></el-switch>
                </el-form-item>
                <el-form-item label="选择数据库配置" prop="rpcPort">
                    <el-radio-group v-model="radioVal">
                        <el-radio :label="0">leveldb</el-radio>
                        <el-radio :label="1">rocksdb</el-radio>
                        <el-radio :label="2">自定义数据库配置</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div v-if="radioVal == 0">
                    <el-divider>leveldb数据库配置</el-divider>
                    <el-form-item label="writeBufferSize" prop="writeBufferSize">
                        <el-input
                            :maxlength="50"
                            v-model="dbSettingForm.writeBufferSize"
                            placeholder="请填写writeBufferSize"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="maxOpenFiles" prop="maxOpenFiles">
                        <el-input
                            :maxlength="50"
                            v-model="dbSettingForm.maxOpenFiles"
                            placeholder="请填写maxOpenFiles"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="blockSize" prop="blockSize">
                        <el-input
                            :maxlength="50"
                            v-model="dbSettingForm.blockSize"
                            placeholder="请填写blockSize"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="compressionType" prop="compressionType">
                        <el-input
                            :maxlength="50"
                            v-model="dbSettingForm.compressionType"
                            placeholder="请填写compressionType"
                        ></el-input>
                    </el-form-item>
                </div>
                <div v-if="radioVal == 1">
                    <el-divider>rocksdb数据库配置</el-divider>
                    <el-form-item label="levelNumber" prop="levelNumber">
                        <el-input
                            :maxlength="50"
                            v-model="dbSettingForm.levelNumber"
                            placeholder="请填写levelNumber"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="blocksize" prop="blocksize">
                        <el-input
                            :maxlength="50"
                            v-model="dbSettingForm.blocksize"
                            placeholder="请填写blocksize"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="maxBytesForLevelBase" prop="maxBytesForLevelBase">
                        <el-input
                            :maxlength="50"
                            v-model="dbSettingForm.maxBytesForLevelBase"
                            placeholder="请填写maxBytesForLevelBase"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="maxBytesForLevelMultiplier"
                        prop="maxBytesForLevelMultiplier"
                    >
                        <el-input
                            :maxlength="50"
                            v-model="dbSettingForm.maxBytesForLevelMultiplier"
                            placeholder="请填写maxBytesForLevelMultiplier"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="targetFileSizeBase" prop="targetFileSizeBase">
                        <el-input
                            :maxlength="50"
                            v-model="dbSettingForm.targetFileSizeBase"
                            placeholder="请填写targetFileSizeBase"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="targetFileSizeMultiplier" prop="targetFileSizeMultiplier">
                        <el-input
                            :maxlength="50"
                            v-model="dbSettingForm.targetFileSizeMultiplier"
                            placeholder="请填写targetFileSizeMultiplier"
                        ></el-input>
                    </el-form-item>
                </div>
                <div v-if="radioVal == 2">
                    <el-divider>自定义数据库配置</el-divider>
                    <el-form-item prop="otherdb">
                        <el-input :maxlength="50" v-model="dbSettingForm.otherdb" placeholder="请填写"></el-input>
                    </el-form-item>
                </div>
                <el-form-item label-width="0" class="textCenter">
                    <el-button type="primary" @click="saveData('dbSettingDialogForm')">保存</el-button>
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
            dialogTitle: "数据库基本配置",
            dbSettingForm: {},
            radioVal: 0,
            branchRules: {
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
            this.$refs.dbSettingDialogForm.resetFields();
            this.dialogVisible = false;
        },
        cancelFun() {
            this.$refs.dbSettingDialogForm.resetFields();
            this.dialogVisible = false;
        },
        saveData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$set(
                        this.dbSettingForm,
                        "nursery_id",
                        this.$route.query.id
                    );

                    // branchSave(this.dbSettingForm)
                    //     .then(response => {
                    //         this.$emit("addClassSuccess", true);
                    //         this.$refs.dbSettingDialogForm.resetFields();
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
            this.dbSettingForm = this.detailInfoData;
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
.trondbSettingForm {
    padding: 0 80px 0 0;
}
</style>

