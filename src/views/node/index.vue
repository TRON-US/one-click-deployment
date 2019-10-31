/*
 * @Author: lxm 
 * @Date: 2019-08-28 15:27:13 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-31 16:21:34
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
                            <el-button
                                size="mini"
                                type="info"
                                @click="viewLogFun(scope.row.id)"
                            >{{$t('tronNodeLog')}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('tronNodeOperate')" align="center" width="200">
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
            <div v-if="isDeploymentStatus">
                <el-timeline>
                    <el-timeline-item
                        type="primary"
                        v-for="(activity, index) in logInfoData"
                        :key="index"
                    >{{activity}}</el-timeline-item>
                </el-timeline>
                <el-button
                    style="margin-left: 30px;"
                    :loading="deplogUploadLoading"
                >{{$t('deploymentSearchLoading')}}</el-button>
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
        <el-dialog :title="$t('tronNodeStatus')" :visible.sync="currentLogDialog" width="400px">
            <el-timeline v-if="currentlogInfoData.length>0">
                <el-timeline-item
                    type="primary"
                    v-for="(activity, index) in currentlogInfoData"
                    :key="index"
                >{{activity}}</el-timeline-item>
            </el-timeline>
            <span v-else>{{$t("tronNodeLogNodata")}}</span>
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
    deployLogInfoApi,
    nodeInfoApi
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
            currentlogInfoData: [],
            deplogUploadLoading: false,
            deploymentDialogVisible: false,
            isDeploymentStatus: false,
            currentLogDialog: false,
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
    },
    created() {
        this.getDataListFun();
    },
    methods: {
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
        viewLogFun(_id) {
            deployLogInfoApi({ id: _id })
                .then(response => {
                    return response.data;
                })
                .then(res => {
                    this.currentlogInfoData = res.logInfo;
                    this.currentLogDialog = true;
                })
                .catch(err => {});
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
            // console.log(item);
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
                        return response.data;
                    })
                    .then(res => {
                        this.logInfoData = res.logInfo;
                        this.logInfoData.forEach(async item => {
                            if (item == "Finish") {
                                clearInterval(timer);
                                await this.getDataListFun();
                                this.deplogUploadLoading = false;
                                this.deploymentDialogVisible = false;
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
            } else {
                this.$message({
                    type: "warning",
                    message: this.$t("deploymentSelectTips")
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
