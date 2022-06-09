<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <common-from
        :formLabel="opertateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></common-from>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+新增</el-button>
      <common-from
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)"
          >搜索</el-button
        >
      </common-from>
    </div>

    <common-table
      :table-data="tableData"
      :table-label="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>

<script>
import CommonFrom from "@/components/CommonFrom"
import CommonTable from "@/components/CommonTable"
import { getUser } from "@/api/data"
export default {
  name: "User",
  data() {
    return {
      operateType: "add",
      isShow: false,
      opertateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input"
        },
        {
          model: "age",
          label: "年龄",
          type: "input"
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1
            },
            {
              label: "女",
              value: 0
            }
          ]
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date"
        },
        {
          model: "addr",
          label: "地址",
          type: "input"
        }
      ],
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: ""
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input"
        }
      ],
      searchForm: {
        keyword: ""
      },
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "age",
          label: "年龄"
        },
        {
          prop: "sexLabel",
          label: "性别"
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200
        },
        {
          prop: "addr",
          label: "地址",
          width: 320
        }
      ],
      config: {
        page: 1,
        total: 30
      }
    }
  },
  components: {
    CommonFrom,
    CommonTable
  },
  created() {
    this.getList()
  },
  methods: {
    confirm() {
      if (this.operateType === "edit") {
        this.$axios.post("/user/edit", this.operateForm).then(res => {
          this.isShow = false
          this.getList()
          // console.log(res)
        })
      } else {
        this.$axios.post("/user/add", this.operateForm).then(res => {
          this.isShow = false
          this.getList()

          // console.log(res)
        })
      }
    },
    addUser() {
      this.isShow = true
      this.operateType = "add"
      this.operateForm = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: ""
      }
    },
    editUser(row) {
      this.operateType = "edit"
      this.isShow = true
      this.operateForm = JSON.parse(JSON.stringify(row))
    },
    delUser(row) {
      this.$confirm("此操作将永远删除该文件，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const id = row.id
        this.$axios
          .post("/user/del", {
            params: { id }
          })
          .then(res => {
            console.log(res, "删除成功")
            this.$message({
              message: "删除成功",
              type: "success"
            })
            this.getList()
          })
      })
    },
    getList(name = "") {
      this.config.loading = true
      name ? (this.config.page = 1) : ""
      getUser({
        page: this.config.page,
        name
      }).then(({ data: res }) => {
        console.log(res, "res---step1")
        this.tableData = res.list.map(item => {
          item.sexLabel = item.sex === 0 ? "女" : "男"
          return item
        })
        this.config.total = res.count
        this.config.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
