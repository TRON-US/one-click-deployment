/*
 * @Author: lxm 
 * @Date: 2019-10-15 11:03:42 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-23 18:35:00
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
                :model="pluginForm"
                class="tronbaseSettingForm"
                label-position="left"
            >
                <div class="onsensus">
                    <el-button class="newonsensus">{{$t('tronPluginConsensusModule')}}</el-button>
                    <el-radio-group v-model="pluginForm.onsensus">
                        <el-radio :label="0">DPOS</el-radio>
                        <el-radio :label="1">PBFT</el-radio>
                        <br />
                        <el-radio
                            style="margin:15px 0"
                            :label="9"
                        >{{$t('tronPluginCustomConsensusModule')}}：</el-radio>
                    </el-radio-group>
                    <el-input :maxlength="50" v-model="pluginForm.id" placeholder="请填写"></el-input>
                </div>
                <div class="transaction">
                    <el-button class="newtransaction">{{$t('tronPluginTransactionModule')}}</el-button>
                    <el-checkbox-group v-model="pluginForm.transaction">
                        <el-checkbox label="AccountUpdate"></el-checkbox>
                        <el-checkbox style="margin:0 66px" label="TransferaSSET"></el-checkbox>
                        <el-checkbox label="VoteWitness"></el-checkbox>
                        <el-checkbox style="margin:10px 0" label="AccountCreate"></el-checkbox>
                        <el-checkbox style="margin:10px 68px 10px 100px" label="UnfreezeAsset"></el-checkbox>
                        <el-checkbox label="FreezeBalance"></el-checkbox>
                        <el-checkbox label="UpdateAsset"></el-checkbox>
                        <el-checkbox style="margin:0 82px" label="SetAccountId"></el-checkbox>
                        <br />
                        <el-checkbox
                            style="margin:15px 0"
                            :label="$t('tronPluginCustomTradingModule')"
                        ></el-checkbox>
                        <el-input :maxlength="50" v-model="pluginForm.id" placeholder="请填写"></el-input>
                    </el-checkbox-group>
                </div>
                <div class="dbModal">
                    <el-button class="newBbModal">{{$t('tronPluginDatabaseModule')}}</el-button>
                    <el-radio-group v-model="pluginForm.dbsetting">
                        <el-radio :label="0">leveldb</el-radio>
                        <el-radio :label="1">rockdb</el-radio>
                        <br />
                        <el-radio
                            style="margin:15px 0"
                            :label="9"
                        >{{$t('tronPluginCustomDatabaseModule')}}</el-radio>
                    </el-radio-group>
                    <el-input :maxlength="50" v-model="pluginForm.id" placeholder="请填写"></el-input>
                </div>
                <el-form-item label-width="0" class="textCenter">
                    <el-button type="primary">{{$t('tronPluginInputSave')}}</el-button>
                    <el-button @click="cancelFun">{{$t('tronPluginInputCancel')}}</el-button>
                </el-form-item>
            </el-form>
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
            dialogTitle: this.$t("tronPluginImport"),
            pluginForm: {
                onsensus: "",
                transaction: "",
                dbsetting: ""
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
    margin-top: 20px;
}
.tronbaseSettingForm {
    padding: 0;
}
.onsensus,
.transaction,
.dbModal {
    position: relative;
    margin: 0 auto;
    width: 600px;
    padding: 30px 15px;
    border: 1px solid #ccc;
    button {
        margin-top: 15px;
    }
}
.transaction {
    margin: 50px auto 50px;
}
.onsensus {
    .newonsensus {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        top: -20px;
    }
}
.transaction {
    .newtransaction {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        top: -20px;
    }
}
.dbModal {
    .newBbModal {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        top: -20px;
    }
}
</style>

