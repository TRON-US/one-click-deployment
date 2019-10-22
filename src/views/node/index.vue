/*
 * @Author: lxm 
 * @Date: 2019-08-28 15:27:13 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-21 16:23:32
 * @tron node list  
 */
<template>
    <div class="app-container">
        <div class="tron-content">
            <div class="tron-filter-section">
                <el-button size="mini" @click="addNodeFun()" type="primary">添加节点</el-button>
                <el-button size="mini" type="info" @click>批量部署</el-button>
            </div>
            <div class="filter-container tron-table">
                <!--tron table-->
                <el-table
                    v-loading="listLoading"
                    ref="multipleTable"
                    empty-text="暂无数据"
                    :data="list"
                    tooltip-effect="dark"
                    style="width: 100%"
                    border
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="nodeName" label="节点名称" align="center"></el-table-column>
                    <el-table-column prop="ip" label="IP/HOST" align="center"></el-table-column>
                    <el-table-column prop="port" label="SSH PORT" align="center"></el-table-column>
                    <el-table-column label="是否为SR" align="center">
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.isSr">yes</el-tag>
                            <el-tag type="error" v-else>yes</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="节点状态" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status">成功</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <el-button size="mini" type="warning">修改</el-button>
                        <el-button size="mini" type="danger" @click="deleteNodeListFun()">删除</el-button>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <operate-node
            :nodeDialogVisible="nodeObj.visible"
            :detailInfoData="nodeObj.detail"
            @dialog="nodeDetailFun"
        ></operate-node>
    </div>
</template>
<script>
// import { getNodeList, deleteNode, updateNode } from "@/api/nodeApi.js";
import operateNode from "./nodeOperate";
export default {
    name: "nodelist",
    components: {
        operateNode
    },
    data() {
        return {
            list: [
                {
                    id: 0,
                    nodeName: "节点一",
                    ip: "127.0.0.1",
                    port: "8080",
                    isSr: false
                }
            ],
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
                detail: {}
            }
        };
    },
    computed: {
        // parames() {
        //     return Object.assign(this.filterItem, this.listQuery);
        // }
    },
    created() {
        this.getDataListFun();
    },
    methods: {
        addNodeFun() {
            this.nodeObj.visible = true;
        },
        getDataListFun() {
            // getAgentList(this.parames)
            //     .then(response => {
            //         let resBody = response.items || [];
            //         resBody.forEach(element => {
            //             if (element.status == 1) {
            //                 element.statusName = true;
            //             } else {
            //                 element.statusName = false;
            //             }
            //         });
            //         this.list = resBody;
            //         this.listQuery.total = response.total;
            //         this.listLoading = false;
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSizeChange(val) {
            this.listQuery.limit = val;
            this.getDataListFun();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.listQuery.page = val;
            this.getDataListFun();
        },
        deleteNodeListFun(_id) {
            this.$confirm("此操作将删除该节点信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    // deleteAgent(_id)
                    //     .then(response => {
                    //         this.$message.success("删除节点信息成功");
                    //         this.getDataListFun();
                    //     })
                    //     .catch(err => {});
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
