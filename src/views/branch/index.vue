<template>
    <div class="app-container">
        <div class="topButton">
            <!-- <el-button size="mini" type="primary" @click="openSpace()">选择空间</el-button> -->

            <el-button size="mini" type="primary" @click="openAdd()">新增分支</el-button>

            <el-button size="mini" type="warning" @click="openGet()">修改分支信息</el-button>

            <!-- <el-button size="mini" type="info" @click="postM()">保存</el-button> -->
            <!-- <el-button size="mini" type="info" @click="handleDownload" :loading="downloadLoading">打印</el-button> -->
        </div>
        <div class="list">
            <el-table
                :data="material.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                style="width: 100%"
                highlight-current-row
                border
                @current-change="handleCurrentsChange"
            >
                <el-table-column label="分支编码" prop="materialNum"></el-table-column>
                <el-table-column label="分支名称" prop="materialName"></el-table-column>
                <el-table-column label="分支状态" prop="materialState"></el-table-column>
                <el-table-column label="备注" prop="remark"></el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 20, 40]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="material.length"
                ></el-pagination>
            </div>
        </div>

        <div v-if="flag3" class="getM">
            <div class="title">
                <h2>选择空间</h2>
                <i class="el-icon-close" @click="closeSpace()"></i>
            </div>
            <div class="change">
                <el-form ref="form" :model="addM" label-width="80px">
                    <el-form-item label="选择空间">
                        <el-input v-model="addM.materialName" placeholder="请填写空间名称"></el-input>
                    </el-form-item>
                    <div class="addButton">
                        <el-form-item>
                            <el-button type="primary" @click="addMa()">保存</el-button>
                            <el-button @click="closeSpace()">取消</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>

        <!-- 弹框 -->
        <div v-if="flag2" class="getMt">
            <div class="title">
                <h2>新增分支</h2>
                <!-- <i class="el-icon-close" @click="clossAdd()"></i> -->
            </div>

            <div class="change">
                <el-form ref="form" :model="addM" label-width="80px">
                    <el-form-item label="分支编码">
                        <el-input v-model="addM.materialName" placeholder="请填写分支编码"></el-input>
                    </el-form-item>

                    <el-form-item label="分支名称">
                        <el-input v-model="addM.materialName" placeholder="请填写分支名称"></el-input>
                    </el-form-item>

                    <el-form-item label="备注">
                        <el-input v-model="addM.remark" placeholder="请填写分支描述"></el-input>
                    </el-form-item>

                    <div class="addButton">
                        <el-form-item>
                            <el-button type="primary" @click="addMa()">保存</el-button>
                            <el-button @click="clossAdd()">取消</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>

        <!-- 修改 -->
        <div v-if="flag" class="getM">
            <div class="title">
                <h2>修改分支信息</h2>
                <i class="el-icon-close" @click="closeGet()"></i>
            </div>

            <div class="change">
                <el-form ref="form" :model="changematerial" label-width="80px">
                    <el-form-item label="分支名称">
                        <el-input v-model="changematerial.materialName"></el-input>
                    </el-form-item>

                    <el-form-item label="描述信息">
                        <el-input v-model="changematerial.remark"></el-input>
                    </el-form-item>

                    <div class="addButton">
                        <el-form-item>
                            <el-button type="primary" @click="change()">保存</el-button>
                            <el-button @click="closeGet()">取消</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
        <!-- 蒙版 -->
        <div class="popContainer" v-if="flag"></div>
        <div class="popContainer" v-if="flag2"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            material: [],
            currentPage: 1, //初始页
            pagesize: 10,
            changematerial: [
                {
                    id: "",
                    materialName: "",
                    remark: "",
                    materialState: ""
                }
            ],
            addM: [
                {
                    materialName: "",
                    remark: "",
                    materialTypeName: "",
                    address: "",
                    materialTypeMode: "",
                    cluster: "",
                    poster: "",
                    content: ""
                }
            ],
            flag: false,
            flag2: false,
            flag3: false,
            downloadLoading: false
        };
    },
    created() {
        let _this = this;
        this.$axios
            .get("/materials")
            .then(function(res) {
                if (res.data) {
                    _this.material = res.data;
                }
            })
            .catch(function(err) {
                if (err.response) {
                    console.log(err.response);
                }
            });
    },
    methods: {
        setCurrent(row) {
            this.$refs.singleTable.setCurrentRow(row);
        },
        handleCurrentsChange(val) {
            this.currentRow = val;

            this.changematerial = val;
        },

        handleSizeChange: function(size) {
            this.pagesize = size;
        },
        handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
        },
        openGet() {
            if (this.changematerial.id) {
                this.flag = !this.flag;
            } else {
                this.$message("请选择一条数据");
            }
        },
        closeGet() {
            this.flag = !this.flag;
            this.$message("已取消操作");
        },
        openAdd() {
            this.flag2 = !this.flag2;
        },
        clossAdd() {
            this.flag2 = !this.flag2;
        },
        openSpace() {
            this.flag3 = !this.flag3;
        },
        closeSpace() {
            this.flag3 = !this.flag3;
        },
        addMa() {
            // let _this = this;
            // this.$axios
            //   .post("/materials", {
            //     materialName: _this.addM.materialName,
            //     price: _this.addM.price,
            //     materialTypeName: _this.addM.materialTypeName,
            //     poster: _this.addM.poster,
            //     remark: _this.addM.remark
            //   })
            //   .then(res => {
            //     if (res.data.code === 200) {
            //       this.$message("添加成功");
            //       this.flag2 = !this.flag2;
            //       this.reload();
            //     }
            //   })
            //   .catch(function(err) {
            //     if (err.response) {
            //       console.log(err.response);
            //     }
            //   });
            if (this.addM.materialName) {
                let _this = this;
                this.$axios
                    .post("/materials", {
                        materialName: "",
                        remark: "",
                        materialTypeName: "",
                        address: "",
                        materialTypeMode: "",
                        cluster: "",
                        poster: "",
                        content: ""
                    })
                    .then(res => {
                        if (res.data.code === 200) {
                            this.$message("添加成功");
                            this.flag2 = !this.flag2;
                            this.reload();
                        }
                    })
                    .catch(function(err) {
                        if (err.response) {
                            console.log(err.response);
                        }
                    });
            } else {
                this.$message("请添全数据");
            }
        },
        postM() {
            if (this.changematerial.materialState) {
                let _this = this;
                this.$axios
                    .put("/materialState", {
                        id: _this.changematerial.id,
                        materialState: _this.changematerial.materialState
                    })
                    .then(res => {
                        if (res.data.code === 200) {
                            this.$message("保存成功");
                            this.flag = !this.flag;
                            this.reload();
                        }
                    })
                    .catch(function(err) {
                        if (err.response) {
                            console.log(err.response);
                        }
                    });
            } else {
                this.$message("请选择一条未保存的数据");
            }
        },
        handleDownload() {
            this.downloadLoading = true;
            console.log(this.material);
            // require.ensure([], () => {
            //     const {
            //         export_json_to_excel
            //     } = require("@/vendor/Export2Excel");
            //     const tHeader = [
            //         "分支名称",
            //         "描述信息",
            //         "开启审核",
            //         "仓库地址",
            //         "上线模式",
            //         "集群设置",
            //         "用户",
            //         "目录"
            //     ];
            //     const filterVal = [
            //         "materialName",
            //         "remark",
            //         "materialTypeName",
            //         "address",
            //         "materialTypeMode",
            //         "cluster",
            //         "poster",
            //         "content"
            //     ];
            //     const list = this.material;
            //     const data = this.formatJson(filterVal, list);
            //     export_json_to_excel(tHeader, data, "列表excel");
            //     this.downloadLoading = false;
            // });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
        },
        change() {
            let _this = this;
            this.$axios
                .put("/materials", {
                    id: _this.changematerial.id,
                    materialName: _this.changematerial.materialName,
                    materialTypeName: _this.changematerial.materialTypeName,
                    poster: _this.changematerial.poster,
                    remark: _this.changematerial.remark,
                    materialState: _this.changematerial.materialState
                })
                .then(res => {
                    if (res.data.code === 200) {
                        this.$message("保存成功");
                        this.flag = !this.flag;
                        this.reload();
                    }
                })
                .catch(function(err) {
                    if (err.response) {
                        console.log(err.response);
                    }
                });
        }
    }
};
</script>

<style>
.topButton {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding-bottom: 20px;
}
.list {
    position: relative;
}
.page {
    /* margin-top: 20px;
    margin-left: 800px; */
    position: absolute;
    right: 0;
    bottom: -50px;
}
.getM {
    position: absolute;
    z-index: 1001;
    width: 400px;
    height: 290px;
    left: 0;
    top: -50px;
    bottom: 0;
    right: 0;
    margin: auto;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
}
.getM .title {
    height: 50px;
    width: 100%;
    text-align: center;
    line-height: 30px;
    /* border-bottom: 1px solid #dcdfe6; */
    color: #409eff;
    text-shadow: 2px 2px 2px #ccc;
}
.getM .title i {
    position: relative;
    top: -55px;
    right: -170px;
    color: black;
    font-size: 20px;
}
.getM .change {
    margin-right: 40px;
    margin-top: 30px;
    margin-left: 10px;
}
.getM .addButton .el-button {
    width: 115px;
}
.getM .el-select {
    width: 280px;
}

.getMt {
    position: absolute;
    z-index: 1001;
    width: 500px;
    height: 350px;
    left: 0;
    top: -5px;
    bottom: 0;
    right: 0;
    margin: auto;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
}
.getMt .title {
    height: 40px;
    width: 100%;
    text-align: center;
    line-height: 30px;
    /* border-bottom: 1px solid #dcdfe6; */
    color: #409eff;
    text-shadow: 2px 2px 2px #ccc;
}
. .title i {
    position: relative;
    top: -55px;
    right: -170px;
    color: black;
    font-size: 20px;
}
.getMt .change {
    margin-right: 40px;
    margin-top: 30px;
    margin-left: 10px;
}
.getMt .addButton .el-button {
    width: 115px;
}
.getMt .el-select {
    width: 280px;
}
.popContainer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 500;
}
</style>
