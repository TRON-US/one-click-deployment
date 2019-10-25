/*
 * @Author: lxm 
 * @Date: 2019-10-15 11:03:42 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-25 15:47:11
 * @operation node 
 */

<template>
    <div class="viewnodeDialog">
        <el-dialog
            :title="dialogTitle"
            @open="openDialogFun"
            @close="closeFun"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            v-loading="classLoading"
            width="650px"
            center
        >
            <el-form
                ref="nodeDialogForm"
                :rules="nodeRules"
                :model="nodeForm"
                label-width="130px"
                label-position="left"
                class="nodeDialogForm"
            >
                <el-form-item label="ID" prop="id">
                    <el-input
                        :maxlength="50"
                        v-model="nodeForm.id"
                        :placeholder="$t('tronNodeIDPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="$t('tronNodeName')" prop="nodeName">
                    <el-input
                        :maxlength="50"
                        v-model="nodeForm.nodeName"
                        :placeholder="$t('tronNodeNamePlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item label="IP/HOST" prop="ip">
                    <el-input
                        :maxlength="50"
                        v-model="nodeForm.ip"
                        :placeholder="$t('tronNodeIpPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item label="PORT" prop="port">
                    <el-input
                        :maxlength="50"
                        v-model="nodeForm.port"
                        :placeholder="$t('tronNodePortPlaceholder')"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="$t('tronNodeWhetherIsSR')" prop="isSR">
                    <el-select v-model="nodeForm.isSR" :placeholder="$t('tronNodeSRPlaceholder')">
                        <el-option
                            v-for="item in srAry"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="0" class="textCenter">
                    <el-button
                        type="primary"
                        @click="saveData('nodeDialogForm')"
                    >{{$t('tronNodeSave')}}</el-button>
                    <el-button @click="cancelFun">{{$t('tronNodeCancel')}}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import { addNote, editNote } from "@/api/nodeApi";
export default {
    name: "operationNode",
    props: ["nodeDialogVisible", "detailInfoData", "editStatus"],
    data() {
        return {
            classLoading: false,
            dialogVisible: this.nodeDialogVisible,
            dialogTitle:
                this.editStatus == 1
                    ? this.$t("tronNodeEditTitle")
                    : this.$t("tronNodeAdd"),
            nodeForm: {
                id: "",
                nodeName: "",
                ip: "",
                port: "",
                isSR: ""
            },
            srAry: [
                { id: 0, label: "是", value: true },
                { id: 1, label: "否", value: false }
            ],
            nodeRules: {
                id: [
                    {
                        required: true,
                        message: this.$t("tronNodeIDPlaceholder"),
                        trigger: "blur"
                    }
                ],
                nodeName: [
                    {
                        required: true,
                        message: this.$t("tronNodeNamePlaceholder"),
                        trigger: "blur"
                    }
                ],
                ip: {
                    required: true,
                    message: this.$t("tronNodeIpPlaceholder"),
                    trigger: "blur"
                },
                port: {
                    required: true,
                    message: this.$t("tronNodePortPlaceholder"),
                    trigger: "blur"
                },
                isSR: {
                    required: true,
                    message: this.$t("tronNodeSRPlaceholder"),
                    trigger: "blur"
                }
            }
        };
    },
    methods: {
        openDialogFun() {},
        closeFun() {
            this.$refs.nodeDialogForm.resetFields();
            this.dialogVisible = false;
        },
        cancelFun() {
            this.$refs.nodeDialogForm.resetFields();
            this.dialogVisible = false;
        },
        saveData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.editStatus == 1) {
                        editNote(this.nodeForm)
                            .then(response => {
                                this.$emit("addNodeSuccess", true);
                                this.$refs.nodeDialogForm.resetFields();
                                this.$message.success(
                                    this.$t("tronNodeAddSuccess")
                                );
                                this.dialogVisible = false;
                            })
                            .catch(error => {
                                // this.listLoading = false;
                                console.log(error);
                            });
                        return;
                    }
                    addNote(this.nodeForm)
                        .then(response => {
                            this.$emit("addNodeSuccess", true);
                            this.$refs.nodeDialogForm.resetFields();
                            this.$message.success(
                                this.$t("tronNodeAddSuccess")
                            );
                            this.dialogVisible = false;
                        })
                        .catch(error => {
                            // this.listLoading = false;
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
            this.nodeForm = this.detailInfoData;
        },
        nodeDialogVisible(val) {
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
.nodeDialogForm {
    padding: 0 20px;
}
</style>

