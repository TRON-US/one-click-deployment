/*
 * @Author: lxm 
 * @Date: 2019-10-15 11:03:42 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-18 18:01:35
 * @operation branch 
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
            width="600px"
            center
        >
            <el-form
                ref="branchDialogForm"
                :rules="branchRules"
                :model="branchForm"
                label-width="100px"
                label-position="left"
            >
                <el-form-item label="分支编码" prop="branch_code">
                    <el-input :maxlength="20" v-model="branchForm.branch_code" placeholder="请填写别名"></el-input>
                </el-form-item>
                <el-form-item label="分支名称" prop="branch_name">
                    <el-input :maxlength="20" v-model="branchForm.branch_name" placeholder="请填写别名"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="note">
                    <el-input :maxlength="20" v-model="branchForm.note" placeholder="请填写别名"></el-input>
                </el-form-item>
                <el-form-item label-width="0" class="textCenter">
                    <el-button type="primary" @click="saveData('branchDialogForm')">保存</el-button>
                    <el-button @click="cancelFun">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
// import { branchSave, classUpdate } from "@/api/garden";
export default {
    name: "operationBranch",
    props: ["branchDialogVisible", "branchObj", "editStatus"],
    data() {
        return {
            classLoading: false,
            dialogVisible: this.branchDialogVisible,
            dialogTitle: "新增分支",
            branchForm: {},
            branchRules: {
                branch_code: [
                    {
                        required: true,
                        message: "请填写分支编码",
                        trigger: "change"
                    }
                ],
                branch_name: [
                    {
                        required: true,
                        message: "请选择分支名称",
                        trigger: "change"
                    }
                ],
                note: {
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
            this.$refs.branchDialogForm.resetFields();
            this.dialogVisible = false;
        },
        cancelFun() {
            this.$refs.branchDialogForm.resetFields();
            this.dialogVisible = false;
        },
        saveData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$set(
                        this.branchForm,
                        "nursery_id",
                        this.$route.query.id
                    );

                    // branchSave(this.branchForm)
                    //     .then(response => {
                    //         this.$emit("addClassSuccess", true);
                    //         this.$refs.branchDialogForm.resetFields();
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
        branchObj(val) {
            if (val.classId) {
            } else {
                this.branchForm = {
                    class_name: "",
                    enrol_date: ""
                };
            }
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
</style>

