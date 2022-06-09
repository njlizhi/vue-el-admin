<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <common-header></common-header>
      </el-header>

      <common-tag />
      <el-main>
        <!-- <router-view></router-view> -->
        <transition name="fade-transform" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import CommonTag from "@/components/CommonTag"
import CommonAside from "@/components/CommonAside"
import CommonHeader from "@/components/CommonHeader"
export default {
  name: "HomeView",
  data() {
    return {}
  },
  components: {
    CommonAside,
    CommonHeader,
    CommonTag
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #333;
  color: white;
}
.el-main {
  padding-top: 0;
}
</style>
