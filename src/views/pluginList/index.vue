/*
 * @Author: lxm 
 * @Date: 2019-08-28 15:27:13 
 * @Last Modified by: lxm
 * @Last Modified time: 2019-10-15 19:01:55
 * @tron plugin list  
 */
<template>
    <div class="app-container">
        <div class="tron-content">
            <div class="tron-filter-section">
                <el-button size="mini" type="primary">申请配置</el-button>
            </div>
            <div class="filter-container tron-table">
                <!--tron table-->
                <table>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>4</td>
                    </tr>
                </table>
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
            }
        };
    },

    created() {},
    methods: {
        addNodeFun() {}
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
