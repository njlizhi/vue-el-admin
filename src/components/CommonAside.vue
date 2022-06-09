<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="white"
    @click="selectMenuItem(path)"
    active-text-color="#ffd04b"
  >
    <h3 v-cloak>{{ isCollapse ? "后台" : "通用后台管理系统" }}</h3>
    <el-menu-item
      @click="clcikMenu(item)"
      v-for="item in noChildren"
      :key="item.path"
      :index="'' + item.path"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu
      v-for="item in hasChildren"
      :key="item.label"
      :index="'' + item.name"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group
        v-for="(subItem, subIndex) in item.children"
        :key="subIndex"
      >
        <el-menu-item @click="clcikMenu(subItem)" :index="subIndex">{{
          subItem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border: node;
  h3 {
    color: white;
    text-align: center;
    line-height: 48px;
  }
}
</style>

<script>
export default {
  name: "Aside",
  data() {
    return {
      menu: [],
      currentPath: "",
      activeIndex: ""
    }
  },
  watch: {},
  mounted() {
    //获取地址栏中的路由，设置elementui中的导航栏选中状态
    // this.activeIndex = window.sessionStorage.getItem("activeIndex")
    // console.log("activerouter", this.activerouter)
    // this.currentPath = window.location.pathname
    // console.log(this.currentPath, "currentPath")
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    clcikMenu(item) {
      this.$router.push({
        name: item.name
      })

      this.$store.commit("selectMenu", item)
    }
  },
  computed: {
    noChildren() {
      return this.asyncMenu.filter(item => !item.children)
    },
    hasChildren() {
      return this.asyncMenu.filter(item => item.children)
    },

    isCollapse() {
      return this.$store.state.tab.isCollapse
    },

    asyncMenu() {
      return this.$store.state.tab.menu
    }
  }
}
</script>
