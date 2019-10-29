/*
 * @Author: lxm 
 * @Date: 2019-10-15 11:03:42 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-29 11:55:29
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
                ref="genesisSettingDialogForm"
                label-width="200px"
                class="tronbaseSettingForm"
                label-position="left"
            >
                <div class="asset">
                    <el-button class="newAsset" @click="innerAssetVisible = true">new asset</el-button>
                    <el-row
                        v-for="(item,index) in detailInfoData.genesis_block_assets"
                        :key="index"
                    >
                        <el-button
                            @click="currentAssetFun(item)"
                            style="width:100%"
                        >{{item.accountName}}</el-button>
                    </el-row>
                </div>
                <div class="witeness">
                    <el-button class="newWiteness" @click="innerWitenessVisible = true">new witeness</el-button>
                    <el-row
                        v-for="(item,index) in detailInfoData.genesis_block_witnesses"
                        :key="index"
                    >
                        <el-button style="width:100%">{{item.address}}</el-button>
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
                            v-model="assetForm.accountName"
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
                            @click="saveWitenessData('witenessDialogForm')"
                        >{{$t('tronSettingSave')}}</el-button>
                        <el-button @click="innerWitenessVisible = false">{{$t('tronSettingCancel')}}</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </el-dialog>
    </div>
</template>
<script>
import { genesisSettingApi } from "@/api/settingApi";
export default {
    name: "genesisSetting",
    props: ["genesisDialogVisible", "detailInfoData"],
    data() {
        return {
            classLoading: false,
            dialogVisible: this.genesisDialogVisible,
            dialogTitle: this.$t("tronSettingGenesis"),
            innerAssetVisible: false,
            innerWitenessVisible: false,
            genesisSetting: {},
            assetRules: {
                accountName: [
                    {
                        required: true,
                        message: this.$t("tronSettingPlaceholder"),
                        trigger: "blur"
                    }
                ],
                accountType: [
                    {
                        required: true,
                        message: this.$t("tronSettingPlaceholder"),
                        trigger: "blur"
                    }
                ],
                address: {
                    required: true,
                    message: this.$t("tronSettingPlaceholder"),
                    trigger: "blur"
                },
                balance: {
                    required: true,
                    message: this.$t("tronSettingPlaceholder"),
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
                    message: this.$t("tronSettingPlaceholder"),
                    trigger: "blur"
                },
                url: {
                    required: true,
                    message: this.$t("tronSettingPlaceholder"),
                    trigger: "blur"
                },
                voteCount: {
                    required: true,
                    message: this.$t("tronSettingPlaceholder"),
                    trigger: "blur"
                },
                privateKey: {
                    required: true,
                    message: this.$t("tronSettingPlaceholder"),
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
        currentAssetFun(item) {
            console.log(item);
        },
        closeFun() {
            // this.$refs.genesisSettingDialogForm.resetFields();
            this.dialogVisible = false;
        },
        cancelFun() {
            // this.$refs.genesisSettingDialogForm.resetFields();
            this.dialogVisible = false;
        },
        saveData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log(this.assetForm);
                    this.genesisSetting.genesis_block_assets.push(
                        this.assetForm
                    );

                    const newSettingForm = {
                        assets: this.genesisSetting.genesis_block_assets,
                        witness: this.genesisSetting.genesis_block_witnesses
                    };

                    newSettingForm.witness.forEach(item => {
                        console.log(`'\'+${item.url}+'\'`);
                        item.url = `\"+${item.url}+\"`;
                    });
                    console.log(newSettingForm);
                    genesisSettingApi(newSettingForm)
                        .then(response => {
                            this.$emit("addSettingSuccess", true);
                            this.$message.success(
                                this.$t("tronSettingGenesisSaveSuccess")
                            );
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        saveWitenessData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log(this.assetForm);
                    this.genesisSetting.genesis_block_assets.push(
                        this.assetForm
                    );
                    // genesisSettingApi(this.genesisSetting)
                    //     .then(response => {
                    //         this.$emit("addSettingSuccess", true);
                    //         // this.$refs.genesisSettingDialogForm.resetFields();
                    //         this.$message.success(
                    //             this.$t("tronSettingGenesisSaveSuccess")
                    //         );
                    //         // this.dialogVisible = false;
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
            this.genesisSetting = this.detailInfoData;
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

