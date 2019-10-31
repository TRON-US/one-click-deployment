/*
 * @Author: lxm 
 * @Date: 2019-08-28 15:27:13 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-31 12:27:03
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
                    <el-table-column :label="$t('tronNodeOperate')" align="center" width="300">
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
        <el-dialog
            :title="$t('tronNodeBulkDeployment')"
            :visible.sync="deploymentDialogVisible"
            width="500px"
        >
            <!-- <el-upload
                action
                class="upload-demo"
                ref="upload"
                :on-change="beforeUploadChange"
                :auto-upload="false"
            >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">{{$t('deploymentUpload')}}</div>
            </el-upload>-->
            <div v-if="isDeploymentStatus">
                <el-timeline>
                    <el-timeline-item
                        type="primary"
                        v-for="(activity, index) in logInfoData"
                        :key="index"
                    >{{activity}}</el-timeline-item>
                </el-timeline>
            </div>
            <div v-else>
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    v-model="currentPath"
                ></el-input>
                <div class="el-upload__tip">{{$t('deploymentUpload')}}</div>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="deploymentDialogVisible = false">{{$t('tronNodeCancel')}}</el-button>
                <el-button
                    type="primary"
                    @click="deployMentFun"
                    :loading="deplogUploadLoading"
                >{{$t('tronNodeSave')}}</el-button>
            </span>
        </el-dialog>
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
import {
    allNodeInfo,
    deleteNote,
    deployNodeApi,
    deployLogInfoApi
} from "@/api/nodeApi.js";
import operateNode from "./nodeOperate";
export default {
    name: "nodelist",
    components: {
        operateNode
    },
    data() {
        return {
            list: [],
            deplogUploadLoading: false,
            deploymentDialogVisible: false,
            isDeploymentStatus: false,
            listLoading: false,
            currentPath: "",
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
            logInfoData: [],
            multipleSelection: []
        };
    },
    computed: {
        multipleSelectionIds() {
            let arr = [];
            this.multipleSelection.map(item => {
                arr.push({
                    id: item.id,
                    path: this.currentPath
                });
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
        beforeUploadChange(file) {
            console.log(file);
        },
        sortIdFun(a, b) {
            return a.id - b.id;
        },
        addNodeFun() {
            if (this.list.length > 50) {
                this.$message({
                    type: "info",
                    message: this.$t("tronNodesMaxTips")
                });
                return;
            }
            this.nodeObj.detail = {};
            this.nodeObj.status = 0;
            this.nodeObj.visible = true;
        },
        operateNodeFun(val) {
            this.nodeObj.detail = val;
            this.nodeObj.status = 1;
            this.nodeObj.visible = true;
        },
        deployMentFun() {
            // deploy
            this.deplogUploadLoading = true;
            this.multipleSelectionIds.forEach(async item => {
                await this.deployNodeApiFun(item);
                // this.deploymentDialogVisible = false;
            });
        },
        deployNodeApiFun(item) {
            // deploy
            console.log(item);
            deployNodeApi(item)
                .then(res => {
                    this.$message({
                        type: "success",
                        message: this.$t("deploymentLoading")
                    });
                    this.isDeploymentStatus = true;
                    this.viewNodeListFun(item.id);
                })
                .catch(err => {
                    this.deplogUploadLoading = false;
                    // this.$message({
                    //     type: "info",
                    //     message: this.$t("deploymentFail")
                    // });
                });
        },
        viewNodeListFun(_id) {
            // view current node detail
            let timer = setInterval(() => {
                deployLogInfoApi({ id: _id })
                    .then(response => {
                        console.log(response);
                        return response.data;
                        // this.$message.success(this.$t("tronNodesDeleteSuccess"));
                        // this.getDataListFun();
                    })
                    .then(res => {
                        this.logInfoData = res.logInfo;
                        this.logInfoData.forEach(item => {
                            console.log(item);
                            if (item == "Finish") {
                                clearInterval(timer);
                                this.deplogUploadLoading = false;
                                this.$message({
                                    type: "info",
                                    message: this.$t("deploymentSuccess")
                                });
                            }
                        });
                    })
                    .catch(err => {
                        this.deplogUploadLoading = false;
                        clearInterval(timer);
                    });
            }, 2000);
        },
        bulkDeploymentFun() {
            if (this.multipleSelectionIds.length > 0) {
                this.deploymentDialogVisible = true;
                // this.$confirm("此操作将批量部署, 是否继续?", "提示", {
                //     confirmButtonText: "确定",
                //     cancelButtonText: "取消",
                //     type: "warning"
                // })
                //     .then(() => {
                //         console.log(this.multipleSelectionIds);
                //         deployNodeApi(this.multipleSelectionIds)
                //             .then(res => {
                //                 this.$message({
                //                     type: "success",
                //                     message: "部署成功!"
                //                 });
                //                 this.fetchData();
                //             })
                //             .catch(err => {
                //                 this.$message({
                //                     type: "info",
                //                     message: "部署失败"
                //                 });
                //             });
                //     })
                //     .catch(() => {
                //         this.$message({
                //             type: "info",
                //             message: "已取消删除"
                //         });
                //     });
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
                    this.list = resData.sort(this.sortIdFun);
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
                        message: this.$t("tronNodesCancelDelete")
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
