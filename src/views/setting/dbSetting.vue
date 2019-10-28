/*
 * @Author: lxm 
 * @Date: 2019-10-15 11:03:42 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-28 18:21:49
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
                <el-form-item :label="$t('tronSettingwriteSynchronously')" prop="storage_db_sync">
                    <el-switch v-model="dbSettingForm.storage_db_sync"></el-switch>
                </el-form-item>
                <el-form-item
                    :label="$t('tronSettingOpenTransaction')"
                    prop="storage_transHistory_switch"
                >
                    <el-switch
                        active-value="on"
                        inactive-value="off"
                        v-model="dbSettingForm.storage_transHistory_switch"
                    ></el-switch>
                </el-form-item>
                <el-form-item
                    :label="$t('tronSelectDatabaseConfiguration')"
                    prop="storage_db_Enine"
                >
                    <el-radio-group v-model="dbSettingForm.storage_db_Enine">
                        <el-radio label="LEVELDB">leveldb</el-radio>
                        <el-radio label="ROCKSDB">rocksdb</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    :label="$t('tronSettingIndexDirectory')"
                    prop="storage_index_directory"
                >
                    <el-switch active-value="index" v-model="dbSettingForm.storage_index_directory"></el-switch>
                </el-form-item>
                <el-form-item
                    :label="$t('tronSettingNeedToUpdateAsset')"
                    prop="storage_needToUpdateAsset"
                >
                    <el-switch v-model="dbSettingForm.storage_needToUpdateAsset"></el-switch>
                </el-form-item>

                <!-- next version -->
                <!-- <div v-if="radioVal == 0">
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
                </div>-->
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
import { dbconfigApi } from "@/api/settingApi";

export default {
    name: "dbetting",
    props: ["branchDialogVisible", "detailInfoData"],
    data() {
        return {
            classLoading: false,
            dialogVisible: this.branchDialogVisible,
            dialogTitle: this.$t("tronSettingDb"),
            dbSettingForm: {},
            radioVal: 0,
            branchRules: {
                storage_db_sync: [
                    {
                        required: true,
                        message: this.$t("tronSettingPlaceholder"),
                        trigger: "change"
                    }
                ],
                storage_transHistory_switch: {
                    required: true,
                    message: this.$t("tronSettingPlaceholder"),
                    trigger: "change"
                },
                storage_db_Enine: {
                    required: true,
                    message: this.$t("tronSettingPlaceholder"),
                    trigger: "change"
                },
                storage_index_directory: {
                    required: true,
                    message: this.$t("tronSettingPlaceholder"),
                    trigger: "change"
                },
                storage_needToUpdateAsset: {
                    required: true,
                    message: this.$t("tronSettingPlaceholder"),
                    trigger: "change"
                }
            }
        };
    },
    methods: {
        openDialogFun() {},
        closeFun() {
            // this.$refs.dbSettingDialogForm.resetFields();
            this.dialogVisible = false;
        },
        cancelFun() {
            // this.$refs.dbSettingDialogForm.resetFields();
            this.dialogVisible = false;
        },
        saveData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    const newForm = {
                        isDBSync: this.dbSettingForm.storage_db_sync,
                        isOpenTransaction: this.dbSettingForm
                            .storage_transHistory_switch,
                        dbEnine: this.dbSettingForm.storage_db_Enine,
                        indexDirectory: this.dbSettingForm
                            .storage_index_directory,
                        needToUpdateAsset: this.dbSettingForm
                            .storage_needToUpdateAsset
                    };
                    dbconfigApi(newForm)
                        .then(response => {
                            this.$emit("addSettingSuccess", true);
                            // this.$refs.dbSettingDialogForm.resetFields();
                            this.$message.success(
                                this.$t("tronSettingDBSaveSuccess")
                            );
                            this.dialogVisible = false;
                        })
                        .catch(error => {
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

