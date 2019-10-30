/*
 * @Author: lxm 
 * @Date: 2019-08-28 15:27:13 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-30 12:05:20
 * @tron node list  
 */
<template>
    <div class="app-container">
        <div class="tron-content">
            <div class="tron-filter-section">
                <el-button size="mini" @click="addNodeFun()" type="primary">{{$t('tronNodeAdd')}}</el-button>
                <el-button
                    size="mini"
                    type="info"
                    @click="bulkDeploymentFun"
                >{{$t('tronNodeBulkDeployment')}}</el-button>
            </div>
            <div class="filter-container tron-table">
                <!--tron table-->
                <el-table
                    v-loading="listLoading"
                    ref="multipleTable"
                    :empty-text="$t('tronNodesNoData')"
                    :data="list"
                    tooltip-effect="dark"
                    style="width: 100%"
                    border
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="id" label="ID" align="center"></el-table-column>
                    <el-table-column prop="userName" :label="$t('tronNodeName')" align="center"></el-table-column>
                    <el-table-column prop="ip" label="IP/HOST" align="center"></el-table-column>
                    <el-table-column prop="port" label="SSH PORT" align="center"></el-table-column>
                    <el-table-column :label="$t('tronNodeWhetherIsSR')" align="center">
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.isSR">yes</el-tag>
                            <el-tag type="danger" v-else>no</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" :label="$t('tronNodeStatus')" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status">成功</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('tronNodeOperate')" align="center">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="warning"
                                @click="operateNodeFun(scope.row)"
                            >{{$t('tronNodeOperate')}}</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="deleteNodeListFun(scope.row.id)"
                            >{{$t('tronNodeDelete')}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <operate-node
            :nodeDialogVisible="nodeObj.visible"
            :editStatus="nodeObj.status"
            :detailInfoData="nodeObj.detail"
            @dialog="nodeDetailFun"
            @addNodeSuccess="addNodeSuccessFun"
        ></operate-node>
    </div>
</template>
<script>
import { allNodeInfo, deleteNote, deployNodeApi } from "@/api/nodeApi.js";
import operateNode from "./nodeOperate";
export default {
    name: "nodelist",
    components: {
        operateNode
    },
    data() {
        return {
            list: [],
            listLoading: false,
            filterItem: {
                name: ""
            },
            listQuery: {
                limit: 20,
                page: 1,
                total: 0
            },
            nodeObj: {
                visible: false,
                detail: {},
                status: 0
            },
            multipleSelection: []
        };
    },
    computed: {
        multipleSelectionIds() {
            let arr = [];
            this.multipleSelection.map(item => {
                arr.push({ ip: item.ip, port: item.port });
            });
            return arr;
        }
        // parames() {
        //     return Object.assign(this.filterItem, this.listQuery);
        // }
    },
    created() {
        this.getDataListFun();
    },
    methods: {
        addNodeFun() {
            this.nodeObj.status = 0;
            this.nodeObj.visible = true;
        },
        operateNodeFun(val) {
            this.nodeObj.detail = val;
            this.nodeObj.status = 1;
            this.nodeObj.visible = true;
        },
        bulkDeploymentFun() {
            if (this.multipleSelectionIds.length > 0) {
                this.$confirm("此操作将批量部署, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        console.log(this.multipleSelectionIds);
                        deployNodeApi(this.multipleSelectionIds)
                            .then(res => {
                                this.$message({
                                    type: "success",
                                    message: "部署成功!"
                                });
                                this.fetchData();
                            })
                            .catch(err => {
                                this.$message({
                                    type: "info",
                                    message: "部署失败"
                                });
                            });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            } else {
                this.$message({
                    type: "warning",
                    message: "请选择至少一个节点"
                });
            }
        },
        getDataListFun() {
            allNodeInfo()
                .then(response => {
                    return response.data;
                })
                .then(res => {
                    let resData = res;
                    resData.forEach(item => {});
                    //  this.list = res;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSizeChange(val) {
            this.listQuery.limit = val;
            this.getDataListFun();
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getDataListFun();
        },
        deleteNodeListFun(_id) {
            this.$confirm(
                this.$t("tronNodesDeleteTips"),
                this.$t("tronNodesDeleteTipsTitle"),
                {
                    confirmButtonText: this.$t("tronNodeDetermine"),
                    cancelButtonText: this.$t("tronNodeCancel"),
                    type: "warning"
                }
            )
                .then(() => {
                    deleteNote({ id: _id })
                        .then(response => {
                            this.$message.success(
                                this.$t("tronNodesDeleteSuccess")
                            );
                            this.getDataListFun();
                        })
                        .catch(err => {});
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        nodeDetailFun(val) {
            this.nodeObj.visible = val;
        },
        addNodeSuccessFun(val) {
            if (val) {
                this.getDataListFun();
            }
        }
    }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.license {
    display: block;
    width: 120px;
    height: 80px;
}
</style>
