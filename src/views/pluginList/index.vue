/*
 * @Author: lxm 
 * @Date: 2019-08-28 15:27:13 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-11-04 12:03:30
 * @tron plugin list  
 */
<template>
    <div class="app-container">
        <div class="tron-content">
            <div class="tron-filter-section">
                <div>
                    <el-steps :active="currentStep" align-center type="mini">
                        <el-step @click="stepClickFun(1)" :title="$t('tronPluginConsensusModule')"></el-step>
                        <el-step
                            @click="stepClickFun(2)"
                            :title="$t('tronPluginTransactionModule')"
                        ></el-step>
                        <el-step @click="stepClickFun(3)" :title="$t('tronPluginDatabaseModule')"></el-step>
                    </el-steps>
                </div>
            </div>
            <el-form
                ref="pluginFormDialogForm"
                :model="pluginOnsensusForm"
                label-width="200px"
                class="pluginSettingForm"
                label-position="left"
                v-if="currentStep == 1"
            >
                <el-row :gutter="12">
                    <el-col :span="24">
                        <el-card shadow="hover">
                            <div @click="baseContentShow = !baseContentShow">
                                <i
                                    :class="baseContentShow?'el-icon-arrow-down': 'el-icon-arrow-right'"
                                ></i>
                                {{$t('tronPluginConsensusModule')}}
                            </div>
                            <div v-if="baseContentShow">
                                <el-form-item
                                    label="enableCrossChain"
                                    prop="enableCrossChain"
                                    class="baseFormItem mgt20"
                                >
                                    <el-radio-group v-model="pluginOnsensusForm.onsensus">
                                        <el-radio :label="'dpos'">DPOS</el-radio>
                                        <el-radio :label="'PBFT'">PBFT</el-radio>
                                        <br />
                                        <el-radio
                                            style="margin:15px 0"
                                            :label="3"
                                        >{{$t('tronPluginCustomConsensusModule')}}：</el-radio>
                                    </el-radio-group>
                                    <el-input
                                        :maxlength="50"
                                        v-model="pluginOnsensusForm.onsensusContent"
                                        :placeholder="$t('tronSettingPlaceholder')"
                                    ></el-input>
                                </el-form-item>
                            </div>
                        </el-card>
                    </el-col>
                    <el-form-item label-width="0" class="textRight">
                        <el-button
                            type="primary"
                            @click="saveData('pluginsDialogForm')"
                        >{{$t('tronSettingNextStep')}}</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
            <el-form
                ref="transactionDialogForm"
                :model="pluginTransactionForm"
                label-width="200px"
                class="transactionSettingForm"
                label-position="left"
                v-if="currentStep == 2"
            >
                <el-row :gutter="12">
                    <el-col :span="24">
                        <el-card shadow="hover">
                            <div @click="transcationContentShow = !transcationContentShow">
                                <i
                                    :class="transcationContentShow?'el-icon-arrow-down': 'el-icon-arrow-right'"
                                ></i>
                                {{$t('tronPluginTransactionModule')}}
                            </div>
                            <div v-if="transcationContentShow">
                                <el-form-item
                                    label="transaction"
                                    prop="transaction"
                                    class="baseFormItem mgt20"
                                >
                                    <el-checkbox-group v-model="pluginForm.transaction">
                                        <el-checkbox label="AccountUpdate"></el-checkbox>
                                        <el-checkbox style="margin:0 66px" label="TransferaSSET"></el-checkbox>
                                        <el-checkbox label="VoteWitness"></el-checkbox>
                                        <el-checkbox style="margin:10px 0" label="AccountCreate"></el-checkbox>
                                        <el-checkbox
                                            style="margin:10px 68px 10px 100px"
                                            label="UnfreezeAsset"
                                        ></el-checkbox>
                                        <el-checkbox label="FreezeBalance"></el-checkbox>
                                        <el-checkbox label="UpdateAsset"></el-checkbox>
                                        <el-checkbox style="margin:0 82px" label="SetAccountId"></el-checkbox>
                                        <br />
                                        <el-checkbox
                                            style="margin:15px 0"
                                            :label="9"
                                        >{{$t('tronPluginCustomTradingModule')}}</el-checkbox>
                                        <el-input
                                            :maxlength="50"
                                            v-model="pluginForm.transactionContent"
                                            :placeholder="$t('tronSettingPlaceholder')"
                                        ></el-input>
                                    </el-checkbox-group>
                                </el-form-item>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-form>
            <!-- <el-form
                ref="pluginFormDialogForm"
                :model="pluginOnsensusForm"
                label-width="200px"
                class="pluginSettingForm"
                label-position="left"
                v-if="currentStep == 3"
            >
                <el-row :gutter="12" v-if="currentStep == 3">
                    <el-col :span="24">
                        <el-card shadow="hover">
                            <div @click="dbsettingContentShow = !dbsettingContentShow">
                                <i
                                    :class="dbsettingContentShow?'el-icon-arrow-down': 'el-icon-arrow-right'"
                                ></i>
                                {{$t('tronPluginTransactionModule')}}
                            </div>
                            <div v-if="dbsettingContentShow">
                                <el-form-item
                                    label="dbsetting"
                                    prop="dbsetting"
                                    class="baseFormItem mgt20"
                                >
                                    <el-radio-group v-model="pluginForm.dbsetting">
                                        <el-radio :label="'leveldb'">leveldb</el-radio>
                                        <el-radio :label="'rockdb'">rockdb</el-radio>
                                        <br />
                                        <el-radio
                                            style="margin:15px 0"
                                            :label="3"
                                        >{{$t('tronPluginCustomDatabaseModule')}}</el-radio>
                                    </el-radio-group>
                                    <el-input
                                        :maxlength="50"
                                        v-model="pluginForm.dbsettingContent"
                                        :placeholder="$t('tronSettingPlaceholder')"
                                    ></el-input>
                                </el-form-item>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-form>-->
        </div>
    </div>
</template>
<script>
export default {
    name: "pluginlist",

    data() {
        return {
            currentStep: 1,
            baseContentShow: true,
            transcationContentShow: true,
            dbsettingContentShow: true,
            pluginOnsensusForm: {
                onsensus: "dpos",
                onsensusContent: ""
            },
            pluginForm: {
                onsensus: "dpos",
                transaction: [],
                dbsetting: "leveldb",
                onsensusContent: "",
                transactionContent: "",
                dbsettingContent: ""
            },
            pluginFormRules: {
                transaction: [
                    {
                        required: true,
                        message: this.$t("tronSettingPlaceholder"),
                        trigger: "blur"
                    }
                ]
            }
        };
    },

    methods: {
        saveData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log(this.pluginForm);
                    // if (this.pluginForm.onsensus == 3) {
                    //     this.pluginForm.onsensus = this.pluginForm.onsensusContent;
                    // }
                    // if (this.pluginForm.transactionContent != "") {
                    //     this.pluginForm.transaction.forEach((item, ind) => {
                    //         if (item === 9) {
                    //             this.pluginForm.transaction.splice(ind, 1);
                    //         }
                    //     });
                    //     this.pluginForm.transaction.push(
                    //         this.pluginForm.transactionContent
                    //     );
                    // }
                    // if (this.pluginForm.dbsetting == 3) {
                    //     this.pluginForm.dbsetting = this.pluginForm.dbsettingContent;
                    // }
                    // console.log(this.pluginForm);
                    // await consensusApi({ onsensus: this.pluginForm.onsensus })
                    //     .then(response => {})
                    //     .catch(error => {
                    //         console.log(error);
                    //     });
                    // await transactionApi(this.pluginForm.transaction)
                    //     .then(response => {})
                    //     .catch(error => {
                    //         console.log(error);
                    //     });
                    // dbEngineApi({ dbEngine: this.pluginForm.dbsetting })
                    //     .then(response => {
                    //         this.$message.success(
                    //             this.$t("tronPluginInputSaveSuccess")
                    //         );
                    //         this.dialogVisible = false;
                    //     })
                    //     .catch(error => {
                    //         console.log(error);
                    //     });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.textRight {
    margin-top: 40px;
    text-align: right;
}
</style>
