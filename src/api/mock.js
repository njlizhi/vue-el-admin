import Mock from "mockjs"
// 定义拦截器文件
import homeApi from "./mockServerData/home"
import userApi from "./mockServerData/user"
import permissionApi from "./mockServerData/permission"
// Mock.mock("/api/home/getData", homeApi.getStatisticalData)
Mock.mock("/home/getData", homeApi.getStatisticalData)
// Mock.mock("/permission/getMenu", permissionApi.getStatisticalData)
//接收一个回调函数
// Mock.mock('/api/user/getUser', userApi.getUserList)
// Mock.mock(/api\/user\/getUser/, "get", userApi.getUserList)

Mock.mock(/user\/add/, "post", userApi.createUser)
Mock.mock(/user\/edit/, "post", userApi.updateUser)
Mock.mock(/user\/getUser/, "get", userApi.getUserList)
Mock.mock(/user\/del/, "post", userApi.deleteUser)

// // 权限相关
Mock.mock(/permission\/getMenu/, "post", permissionApi.getMenu)
