/*
 * @Author: lxm 
 * @Date: 2019-10-15 11:03:42 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-18 15:54:31
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
        >
            <el-form
                ref="classDialogForm"
                :rules="classRules"
                :model="classForm"
                label-width="100px"
                label-position="left"
            >
                <el-form-item label="分支编码" v-if="editStatus == 1">
                    <el-col :span="8">{{studentObj.classId}}</el-col>
                </el-form-item>
                <el-form-item label="分支名称" prop="class_name">
                    <el-col :span="8">
                        <el-input
                            :maxlength="20"
                            v-model="classForm.class_name"
                            placeholder="请填写别名"
                        ></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="备注" v-if="editStatus == 1">
                    <el-col :span="8">{{studentObj.classId}}</el-col>
                </el-form-item>
                <el-form-item label-width="0" class="textCenter">
                    <el-button
                        v-if="editStatus == 0"
                        type="primary"
                        @click="saveData('classDialogForm')"
                    >保存</el-button>
                    <el-button @click="cancelFun">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import { classAdd, classUpdate } from "@/api/garden";
export default {
    name: "operationBranch",
    props: ["dialogTitle", "branchDialogVisible", "studentObj", "editStatus"],
    data() {
        return {
            classLoading: false,
            dialogVisible: this.branchDialogVisible,
            classId: "",
            classForm: {},
            newGradeListAry: [],
            newClassListAry: [],
            classRules: {
                class_name: [
                    { required: true, message: "请填写别名", trigger: "change" }
                ],
                enrol_date: [
                    {
                        required: true,
                        message: "请选择入学年份",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    methods: {
        openDialogFun() {},
        closeFun() {
            this.$refs.classDialogForm.resetFields();
            this.dialogVisible = false;
        },
        cancelFun() {
            this.$refs.classDialogForm.resetFields();
            this.dialogVisible = false;
        },
        saveData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$set(
                        this.classForm,
                        "nursery_id",
                        this.$route.query.id
                    );
                    this.classForm.enrol_year = this.classForm.enrol_date.slice(
                        0,
                        4
                    );
                    this.classForm.enrol_month = this.classForm.enrol_date.slice(
                        4,
                        6
                    );
                    classAdd(this.classForm)
                        .then(response => {
                            this.$emit("addClassSuccess", true);
                            this.$refs.classDialogForm.resetFields();
                            this.$message.success("添加班级信息成功");
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
        studentObj(val) {
            if (val.classId) {
            } else {
                this.classForm = {
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

