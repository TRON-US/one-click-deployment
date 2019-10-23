/*
 * @Author: lxm 
 * @Date: 2019-10-15 11:03:42 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-23 18:42:29
 * @setting genesis setting
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
                label-width="200px"
                class="tronbaseSettingForm"
                label-position="left"
            >
                <div class="asset">
                    <el-button class="newAsset" @click="innerAssetVisible = true">new asset</el-button>
                    <el-row>
                        <el-button style="width:100%">Asset A</el-button>
                    </el-row>
                    <el-row>
                        <el-button style="width:100%;">Asset B</el-button>
                    </el-row>
                    <el-row>
                        <el-button style="width:100%;">Asset C</el-button>
                    </el-row>
                </div>
                <div class="witeness">
                    <el-button class="newWiteness" @click="innerWitenessVisible = true">new witeness</el-button>
                    <el-row>
                        <el-button style="width:100%">witeness A</el-button>
                    </el-row>
                    <el-row>
                        <el-button style="width:100%;">witeness B</el-button>
                    </el-row>
                    <el-row>
                        <el-button style="width:100%;">witeness C</el-button>
                    </el-row>
                </div>
                <!-- <el-form-item label-width="0" class="textCenter">
                    <el-button type="primary">保存</el-button>
                    <el-button @click="cancelFun">取消</el-button>
                </el-form-item>-->
            </el-form>
            <!-- asset -->
            <el-dialog
                center
                width="700px"
                :title="$t('tronAssetSetting')"
                :visible.sync="innerAssetVisible"
                append-to-body
            >
                <el-form
                    ref="assetDialogForm"
                    :rules="assetRules"
                    :model="assetForm"
                    label-width="120px"
                    label-position="left"
                >
                    <el-form-item label="accountName" prop="accountName">
                        <el-input
                            :maxlength="50"
                            v-model="assetForm.id"
                            :placeholder="$t('tronSettingPlaceholder')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="accountType" prop="accountType">
                        <el-input
                            :maxlength="50"
                            v-model="assetForm.accountType"
                            :placeholder="$t('tronSettingPlaceholder')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="address" prop="address">
                        <el-input
                            :maxlength="50"
                            v-model="assetForm.address"
                            :placeholder="$t('tronSettingPlaceholder')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="balance" prop="balance">
                        <el-input
                            :maxlength="50"
                            v-model="assetForm.balance"
                            :placeholder="$t('tronSettingPlaceholder')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label-width="0" class="textCenter">
                        <el-button
                            type="primary"
                            @click="saveData('assetDialogForm')"
                        >{{$t('tronSettingSave')}}</el-button>
                        <el-button @click="innerAssetVisible = false">{{$t('tronSettingCancel')}}</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!-- witeness -->
            <el-dialog
                center
                width="700px"
                :title="$t('tronWitenessSetting')"
                :visible.sync="innerWitenessVisible"
                append-to-body
            >
                <el-form
                    ref="witenessDialogForm"
                    :rules="witenessRules"
                    :model="witenessForm"
                    label-width="120px"
                    label-position="left"
                >
                    <el-form-item label="address" prop="address">
                        <el-input
                            :maxlength="50"
                            v-model="witenessForm.address"
                            :placeholder="$t('tronSettingPlaceholder')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="url" prop="url">
                        <el-input
                            :maxlength="50"
                            v-model="witenessForm.url"
                            :placeholder="$t('tronSettingPlaceholder')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="voteCount" prop="voteCount">
                        <el-input
                            :maxlength="50"
                            v-model="witenessForm.voteCount"
                            :placeholder="$t('tronSettingPlaceholder')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="privateKey" prop="privateKey">
                        <el-input
                            :maxlength="50"
                            v-model="witenessForm.privateKey"
                            :placeholder="$t('tronSettingPlaceholder')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label-width="0" class="textCenter">
                        <el-button
                            type="primary"
                            @click="saveData('witenessDialogForm')"
                        >{{$t('tronSettingSave')}}</el-button>
                        <el-button @click="innerWitenessVisible = false">{{$t('tronSettingCancel')}}</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </el-dialog>
    </div>
</template>
<script>
import { branchSaveApi, branchGetApi } from "@/api/branchApi";
export default {
    name: "baseSetting",
    props: ["genesisDialogVisible", "detailInfoData"],
    data() {
        return {
            classLoading: false,
            dialogVisible: this.genesisDialogVisible,
            dialogTitle: this.$t("tronSettingGenesis"),
            innerAssetVisible: false,
            innerWitenessVisible: false,
            assetRules: {
                accountName: [
                    {
                        required: true,
                        message: "请填写accountName",
                        trigger: "blur"
                    }
                ],
                accountType: [
                    {
                        required: true,
                        message: "请填写accountType",
                        trigger: "blur"
                    }
                ],
                address: {
                    required: true,
                    message: "请填写address",
                    trigger: "blur"
                },
                balance: {
                    required: true,
                    message: "请填写balance",
                    trigger: "blur"
                }
            },
            assetForm: {
                accountName: "",
                accountType: "",
                address: "",
                balance: ""
            },
            witenessRules: {
                address: {
                    required: true,
                    message: "请填写address",
                    trigger: "blur"
                },
                url: {
                    required: true,
                    message: "请填写url",
                    trigger: "blur"
                },
                voteCount: {
                    required: true,
                    message: "请填写voteCount",
                    trigger: "blur"
                },
                privateKey: {
                    required: true,
                    message: "请填写privateKey",
                    trigger: "blur"
                }
            },
            witenessForm: {
                address: "",
                url: "",
                voteCount: "",
                privateKey: ""
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
        saveData() {}
    },
    watch: {
        detailInfoData(val) {
            this.baseSettingForm = this.detailInfoData;
        },
        genesisDialogVisible(val) {
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
    padding: 0;
}
.asset,
.witeness {
    position: relative;
    margin: 0 auto;
    width: 600px;
    min-height: 200px;
    padding: 20px 15px;
    border: 1px solid #ccc;
    button {
        margin-top: 15px;
    }
}
.witeness {
    margin: 50px auto 50px;
}
.asset {
    .newAsset {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        top: -20px;
    }
}
.witeness {
    .newWiteness {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        top: -20px;
    }
}
</style>

