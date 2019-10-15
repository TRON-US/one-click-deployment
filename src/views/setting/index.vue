<template>
  <div class="app-container">
    <div class="topButton">
      <el-button size="mini" type="primary" @click="showAdd()">申请配置</el-button>
      <!-- <el-button size="mini" type="warning" @click="showC()">修改配置</el-button>
      <el-button size="mini" type="danger">重置配置</el-button> -->
      <!-- <el-button size="mini" type="info" @click="putP()">保存</el-button> -->
    </div>
    <!-- 表格 -->
    <div class="list">
      <el-table
        :data="needPlan.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
        highlight-current-row
        border
        @current-change="handleCurrentsChange"
      >
        <el-table-column label="所需配置编码" prop="needPlanNum"></el-table-column>

        <!-- <el-table-column label="物资编码" prop="materialNum"></el-table-column> -->

        <el-table-column label="配置网络名称" prop="net_type"></el-table-column>

        <el-table-column label="配置数据库名称" prop="storage_db_engine"></el-table-column>

        <el-table-column label="端口" prop="node_http_fullNodePort"></el-table-column>

        <el-table-column label="提交人" prop="poster"></el-table-column>

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
          :total="needPlan.length"
        ></el-pagination>
      </div>
    </div>

    <!-- 弹框 -->
    <div v-if="flag" class="addPlans">
      <div class="title">
        <h2>跨链配置</h2>
        <i class="el-icon-close" @click="closeAdd()"></i>
      </div>

      <div class="change">
        <el-form ref="form" :model="addPlan" label-width="150px">

          <el-form-item label="是否支持跨链交易">
            <el-input v-model="addPlan.node_http_fullNodePort" ></el-input>
          </el-form-item>


          <el-form-item label="验证节点最多支持的数目">
            <el-input v-model="addPlan.node_http_fullNodePort" ></el-input>
          </el-form-item>

          <el-form-item label="验证节点最少支持的数目">
            <el-input v-model="addPlan.node_http_fullNodePort" ></el-input>
          </el-form-item>

          <el-form-item label="交互链chainid列表">
            <el-input v-model="addPlan.node_http_fullNodePort" ></el-input>
          </el-form-item>


          <el-form-item label="跨链交易费用">
            <el-input v-model="addPlan.node_http_fullNodePort" ></el-input>
          </el-form-item>


          <!-- <el-form-item label="网络类型">
              <el-select v-model="addPlan.net_type" placeholder="请选择类别" class="s1">
                <el-option label="测试" value="test"></el-option>
                <el-option label="正式" value="normal"></el-option>
              </el-select> -->

            <!-- <el-select v-model="addPlan.net_type" placeholder="请选择" class="s1">
              <el-option
                v-for="item in materials"
                :key="item.id"
                :label="item.net_type"
                :value="item.net_type"
              ></el-option>
            </el-select> -->
        </el-form-item>

        <!-- <el-form-item label="数据库">
            <el-select v-model="addPlan.storage_db_engine" placeholder="请选择类别" class="s1">
              <el-option label="Level DB" value="Level"></el-option>
              <el-option label="Rocks DB" value="Rocks"></el-option>
            </el-select>
      </el-form-item>

          <el-form-item label="端口">
            <el-input v-model="addPlan.node_http_fullNodePort" placeholder="请输入端口号"></el-input>
          </el-form-item>

          <el-form-item label="备注">
            <el-input v-model="addPlan.remark"></el-input>
          </el-form-item>
-->
          <div class="addButton">
            <el-form-item>
              <el-button type="primary" @click="addPlans()">保存</el-button>
              <el-button @click="closeAdd()">取消</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>

    <!-- 修改探矿 -->
    <div v-if="flag2" class="changePlan">
      <div class="title">
        <h2>修改编码信息</h2>
        <i class="el-icon-close" @click="closeC()"></i>
      </div>

      <div class="change">
        <el-form ref="form" :model="changePlan" label-width="80px">
          <el-form-item label="网络类型">
              <el-select v-model="addPlan.net_type" placeholder="请选择类别" class="s1">
                <el-option label="测试" value="test"></el-option>
                <el-option label="正式" value="normal"></el-option>
              </el-select>
            </el-form-item>

          <el-form-item label="端口">
            <el-input v-model="changePlan.node_http_fullNodePort"></el-input>
          </el-form-item>

          <el-form-item label="备注">
            <el-input v-model="changePlan.remark"></el-input>
          </el-form-item>

          <div class="addButton">
            <el-form-item>
              <el-button type="primary" @click="passC()">保存</el-button>
              <el-button @click="closeC()">取消</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>

    <div class="popContainer" v-if="flag"></div>
    <div class="popContainer" v-if="flag2"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      needPlan: [],
      currentPage: 1, //初始页
      pagesize: 10,
      downloadLoading: false,
      addPlan: [
        {
          net_type: "",
          node_http_fullNodePort: "",
          storage_db_engine: "",
          remark: ""
        }
      ],
      flag: false,
      flag2: false,
      flag3: false,
      changePlan: [
        {
          id:'',
          net_type: "",
          node_http_fullNodePort: "",
          storage_db_engine: "",
          remark: ""
        }
      ],
      materials: []
    };
  },
  computed: {
    username() {
      return this.$store.state.user_name;
    }
  },
//   inject: ["reload"],
  created() {
    let _this = this;
    this.$axios
      .get("/needplans")
      .then(function(res) {
        if (res.data) {
          _this.needPlan = res.data;
        }
      })
      .catch(function(err) {
        if (err.response) {
          console.log(err.response);
        }
      });

    this.$axios
      .get("/passMaterials")
      .then(function(res) {
        if (res.data) {
          _this.materials = res.data;
          //   console.log(res.data)
          //   console.log(_this.materials)
        }
      })
      .catch(function(err) {
        if (err.response) {
          console.log(err.response);
        }
      });
  },
  methods: {
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentsChange(val) {
      this.currentRow = val;

      this.changePlan = val;
    },
    showAdd() {
      this.flag = !this.flag;
    },
    closeAdd() {
      this.flag = !this.flag;
      this.$message("已取消操作");
    },
    addPlans() {
      // let _this = this;
      // this.$axios
      //   .post("/needplans", {
      //     // marterialNum: _this.addPlan.marterialNum,
      //     net_type: _this.addPlan.net_type,
      //     net_type: _this.addPlan.net_type,
      //     price: _this.addPlan.price,
      //     remark: _this.addPlan.remark
      //   })
      //   .then(res => {
      //     if (res.data.code === 200) {
      //       this.$message("保存成功");
      //       this.flag = !this.flag;
      //       this.reload();
      //     }
      //   })
      //   .catch(function(err) {
      //     if (err.response) {
      //       console.log(err.response);
      //     }
      //   });
      if(this.addPlan.net_type){
        let _this = this;
      this.$axios
        .post("/needplans", {
          // marterialNum: _this.addPlan.marterialNum,
          net_type: _this.addPlan.net_type,
          storage_db_engine: _this.addPlan.storage_db_engine,
          node_http_fullNodePort: _this.addPlan.node_http_fullNodePort,
          remark: _this.addPlan.remark
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
      }else{
        this.$message('请添全数据')
      }
    },
    showC() {
      if (this.changePlan.id) {
        this.flag2 = !this.flag2;
      } else {
        this.$message("请选择一条数据");
      }
    },
    closeC() {
      this.flag2 = !this.flag2;
      this.$message("已取消操作");
    },
    passC() {
      let _this = this;
      this.$axios
        .put("/needplans", {
          // marterialNum: _this.addPlan.marterialNum,
          id:_this.changePlan.id,
          net_type: _this.changePlan.net_type,
          storage_db_engine: _this.changePlan.storage_db_engine,
          node_http_fullNodePort: _this.changePlan.node_http_fullNodePort,
          remark: _this.changePlan.remark
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message("保存成功");
            this.flag2 = !this.flag2;
            this.reload();
          }
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
    },
    putP() {
      console.log(this.username);
      let _this = this;
      this.$axios
        .put("/needplanState", {
          poster: _this.username,
          needPlanState:_this.changePlan.needPlanState,
          id:_this.changePlan.id
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message("保存成功");
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
.addPlans {
  position: absolute;
  z-index: 1001;
  width: 600px;
  height: 550px;
  left: 0;
  top: -50px;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
}
.addPlans .title {
  height: 50px;
  width: 100%;
  text-align: center;
  line-height: 30px;
  /* border-bottom: 1px solid #dcdfe6; */
  color: #409eff;
  text-shadow: 2px 2px 2px #ccc;
}
.addPlans .title i {
  position: relative;
  top: -55px;
  right: -170px;
  color: black;
  font-size: 20px;
}
.addPlans .change {
  margin-right: 40px;
  margin-top: 30px;
  margin-left: 10px;
}
.addPlans .change .s1 {
  width: 270px;
}
.addPlans .addButton .el-button {
  width: 115px;
}
.addPlans .el-select {
  width: 280px;
}
.changePlan {
  position: absolute;
  z-index: 1001;
  width: 400px;
  height: 450px;
  left: 0;
  top: -50px;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
}
.changePlan .title {
  height: 50px;
  width: 100%;
  text-align: center;
  line-height: 30px;
  /* border-bottom: 1px solid #dcdfe6; */
  color: #409eff;
  text-shadow: 2px 2px 2px #ccc;
}
.changePlan .title i {
  position: relative;
  top: -55px;
  right: -170px;
  color: black;
  font-size: 20px;
}
.changePlan .change {
  margin-right: 40px;
  margin-top: 30px;
  margin-left: 10px;
}
.changePlan .addButton .el-button {
  width: 115px;
}
.changePlan .el-select {
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
