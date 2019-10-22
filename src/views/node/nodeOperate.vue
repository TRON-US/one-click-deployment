/*
 * @Author: lxm 
 * @Date: 2019-10-15 11:03:42 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-21 16:28:11
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
            width="600px"
            center
        >
            <el-form
                ref="nodeDialogForm"
                :rules="nodeRules"
                :model="nodeForm"
                label-width="100px"
                label-position="left"
            >
                <el-form-item label="ID" prop="id">
                    <el-input :maxlength="50" v-model="nodeForm.id" placeholder="请填写id"></el-input>
                </el-form-item>
                <el-form-item label="节点名称" prop="nodeName">
                    <el-input :maxlength="50" v-model="nodeForm.nodeName" placeholder="请填写节点名称"></el-input>
                </el-form-item>
                <el-form-item label="IP/HOST" prop="ip">
                    <el-input :maxlength="50" v-model="nodeForm.ip" placeholder="请填写IP/HOST"></el-input>
                </el-form-item>
                <el-form-item label="PORT" prop="port">
                    <el-input :maxlength="50" v-model="nodeForm.port" placeholder="请填写PORT"></el-input>
                </el-form-item>
                <el-form-item label="是否为SR" prop="isSr">
                    <el-select v-model="nodeForm.isSr" placeholder="请选择是否为SR">
                        <el-option
                            v-for="item in srAry"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="0" class="textCenter">
                    <el-button type="primary" @click="saveData('nodeDialogForm')">保存</el-button>
                    <el-button @click="cancelFun">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
// import { nodeSaveApi, nodeGetApi } from "@/api/nodeApi";
export default {
    name: "operationNode",
    props: ["nodeDialogVisible", "detailInfoData", "editStatus"],
    data() {
        return {
            classLoading: false,
            dialogVisible: this.nodeDialogVisible,
            dialogTitle: "新增节点",
            nodeForm: {},
            srAry: [
                { id: 0, label: "是", value: true },
                { id: 1, label: "否", value: false }
            ],
            nodeRules: {
                id: [
                    {
                        required: true,
                        message: "请填写id",
                        trigger: "blur"
                    }
                ],
                nodeName: [
                    {
                        required: true,
                        message: "请选择节点名称",
                        trigger: "blur"
                    }
                ],
                ip: {
                    required: true,
                    message: "请填写IP/HOST",
                    trigger: "blur"
                },
                port: {
                    required: true,
                    message: "请填写PORT",
                    trigger: "blur"
                },
                isSr: {
                    required: true,
                    message: "请选择是否为SR",
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
                    this.$set(
                        this.nodeForm,
                        "nursery_id",
                        this.$route.query.id
                    );

                    // nodeSave(this.nodeForm)
                    //     .then(response => {
                    //         this.$emit("addClassSuccess", true);
                    //         this.$refs.nodeDialogForm.resetFields();
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
</style>

