/*
 * @Author: lxm 
 * @Date: 2019-08-28 15:27:13 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-15 18:55:02
 * @tron node list  
 */
<template>
    <div class="app-container">
        <div class="tron-content">
            <div class="tron-filter-section">
                <el-button size="mini" @click="addNodeFun()" type="primary">申请配置</el-button>
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
                    <el-table-column prop="mobile" label="所需配置编码" align="center"></el-table-column>
                    <el-table-column prop="name" label="配置网络名称" align="center"></el-table-column>
                    <el-table-column prop="address" label="配置数据库名称" align="center"></el-table-column>
                    <el-table-column prop="created_at" label="端口" align="center"></el-table-column>
                    <el-table-column prop="created_at" label="提交人" align="center"></el-table-column>
                    <el-table-column label="备注" align="center"></el-table-column>
                </el-table>
                <div v-show="!listLoading" class="pagination-container mgt20">
                    <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="listQuery.page"
                        style="text-align:right"
                        :page-size="listQuery.limit"
                        :page-sizes="[20, 50, 100]"
                        layout="total, prev, pager,next,sizes,jumper"
                        :total="listQuery.total"
                    ></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import { getNodeList, deleteNode, updateNode } from "@/api/nodeApi.js";
export default {
    name: "nodelist",
    data() {
        return {
            list: [{ id: 0 }],
            listLoading: false,
            filterItem: {
                name: ""
            },
            listQuery: {
                limit: 20,
                page: 1,
                total: 0
            }
        };
    },
    computed: {
        parames() {
            return Object.assign(this.filterItem, this.listQuery);
        }
    },
    created() {
        this.getDataListFun();
    },
    methods: {
        addNodeFun() {},
        clickSearch() {
            this.getDataListFun();
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
