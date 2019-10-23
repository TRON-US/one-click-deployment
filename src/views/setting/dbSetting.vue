/*
 * @Author: lxm 
 * @Date: 2019-10-15 11:03:42 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-23 18:58:58
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
                label-width="230px"
                class="trondbSettingForm"
                label-position="left"
            >
                <el-form-item :label="$t('tronSettingwriteSynchronously')" prop="isSyncWrite">
                    <el-switch v-model="dbSettingForm.isSyncWrite"></el-switch>
                </el-form-item>
                <el-form-item :label="$t('tronSettingOpenTransaction')" prop="isOpenTransaction">
                    <el-switch v-model="dbSettingForm.isOpenTransaction"></el-switch>
                </el-form-item>
                <el-form-item :label="$t('tronSelectDatabaseConfiguration')" prop="rpcPort">
                    <el-radio-group v-model="radioVal">
                        <el-radio :label="0">leveldb</el-radio>
                        <el-radio :label="1">rocksdb</el-radio>
                        <el-radio :label="2">{{$t('tronSelectCustomDatebaseSetting')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div v-if="radioVal == 0">
                    <el-divider>{{$t('tronSelectleveldbDatebaseSetting')}}</el-divider>
                    <el-form-item label="writeBufferSize" prop="writeBufferSize">
                        <el-input
                            :maxlength="50"
                            v-model="dbSettingForm.writeBufferSize"
                            :placeholder="$t('tronSettingPlaceholder')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="maxOpenFiles" prop="maxOpenFiles">
                        <el-input
                            :maxlength="50"
                            v-model="dbSettingForm.maxOpenFiles"
                            :placeholder="$t('tronSettingPlaceholder')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="blockSize" prop="blockSize">
                        <el-input
                            :maxlength="50"
                            v-model="dbSettingForm.blockSize"
                            :placeholder="$t('tronSettingPlaceholder')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="compressionType" prop="compressionType">
                        <el-input
                            :maxlength="50"
                            v-model="dbSettingForm.compressionType"
                            :placeholder="$t('tronSettingPlaceholder')"
                        ></el-input>
                    </el-form-item>
                </div>
                <div v-if="radioVal == 1">
                    <el-divider>{{$t('tronSelectrocksdbDatebaseSetting')}}</el-divider>
                    <el-form-item label="levelNumber" prop="levelNumber">
                        <el-input
                            :maxlength="50"
                            v-model="dbSettingForm.levelNumber"
                            :placeholder="$t('tronSettingPlaceholder')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="blocksize" prop="blocksize">
                        <el-input
                            :maxlength="50"
                            v-model="dbSettingForm.blocksize"
                            :placeholder="$t('tronSettingPlaceholder')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="maxBytesForLevelBase" prop="maxBytesForLevelBase">
                        <el-input
                            :maxlength="50"
                            v-model="dbSettingForm.maxBytesForLevelBase"
                            :placeholder="$t('tronSettingPlaceholder')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="maxBytesForLevelMultiplier"
                        prop="maxBytesForLevelMultiplier"
                    >
                        <el-input
                            :maxlength="50"
                            v-model="dbSettingForm.maxBytesForLevelMultiplier"
                            :placeholder="$t('tronSettingPlaceholder')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="targetFileSizeBase" prop="targetFileSizeBase">
                        <el-input
                            :maxlength="50"
                            v-model="dbSettingForm.targetFileSizeBase"
                            :placeholder="$t('tronSettingPlaceholder')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="targetFileSizeMultiplier" prop="targetFileSizeMultiplier">
                        <el-input
                            :maxlength="50"
                            v-model="dbSettingForm.targetFileSizeMultiplier"
                            :placeholder="$t('tronSettingPlaceholder')"
                        ></el-input>
                    </el-form-item>
                </div>
                <div v-if="radioVal == 2">
                    <el-divider>{{$t('tronSelectCustomDatebaseSetting')}}</el-divider>
                    <el-form-item :label="$t('tronSelectCustomDatebaseSetting')" prop="otherdb">
                        <el-input
                            :maxlength="50"
                            v-model="dbSettingForm.otherdb"
                            :placeholder="$t('tronSettingPlaceholder')"
                        ></el-input>
                    </el-form-item>
                </div>
                <el-form-item label-width="0" class="textCenter">
                    <el-button
                        type="primary"
                        @click="saveData('dbSettingDialogForm')"
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
            dialogTitle: this.$t("tronSettingDb"),
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

