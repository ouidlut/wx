// pages/person/person.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园'
    }],
    covers: [{
      latitude: 23.099994,
      longitude: 113.344520,
      iconPath: '/image/location.png'
    }, {
      latitude: 23.099994,
      longitude: 113.304520,
      iconPath: '/image/location.png'
      }],




    login_OK:false,
    userInfo:"",
    user:[
    {id:null},
    {post: null },
    {openid:null},
    {unionid:null},],
    nomoneymin:5,
    invalidDate: "2019/6/12",
    shoppingList:[
      {
        title:"留考日语：日语读解 听解 听读解 记述",
        link:""
      },
      {
        title: "留考理科类-物理：力学 热学 波动 电磁气等",
        link: ""
      },
      {
        title: "留考理科类-化学：无机化学 有机化学 物质的构成等",
        link: ""
      },
      {
        title: "留考理科类-生物：生命现象 生命延续性 环境和生物反应等",
        link: ""
      },
      {
        title: "留考基础课程：针对刚刚来日本的同学，讲解最基础的留考知识点，为之后的学习打下坚实的基础。",
        link: ""
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //ユーザー登録情報
    wx.getStorage({
      key: 'login_OK',
      success: function (res) {
        that.setData({ 'login_OK': res.data })
      },
      fail: function () { },
      complete: function () { }
    })
    console.log("1111")
    if (that.data.login_OK = true){
      //ユーザー登録情報
      wx.getStorage({
        key: 'userInfo',
        success: function (res) {
          console.log("2222")
          that.setData({ 'userInfo': res.data })
          that.setData({ 'user.id': '1001' })
          that.setData({ 'user.post': '管理员' })
        },
        fail: function () { 
          console.log("3333")
          that.setData({ 'login_OK': false })},
        complete: function () { }
      })
    }
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    var that = this
    //ユーザー登録情報
    wx.getStorage({
      key: 'login_OK',
      success: function (res) {
        that.setData({ 'login_OK': res.data })
      },
      fail: function () { },
      complete: function () { }
    })
    if (that.data.login_OK == true){
      //ユーザー登録情報
      wx.getStorage({
        key: 'userInfo',
        success: function (res) {
          that.setData({ 'userInfo': res.data })
          that.setData({ 'user.id': '1001' })
          that.setData({ 'user.post': '管理员' })
          },
        fail: function () { that.setData({ 'login_OK': false })},
        complete: function () { }
      })
    }

  },
  userInfoHandler(data) {
    if (data.detail.userInfo == null){
return;

    }
    this.setData({userInfo:data.detail.userInfo})
    this.setData({ login_OK: true })
    wx.setStorage({
      key: 'userInfo',
      data: data.detail.userInfo
    })
    wx.setStorage({
      key: 'login_OK',
      data: true
    })
  },
  // 用户登录示例
  login: function () {
    
    if (this.data.logged) return

    util.showBusy('正在登录')
    var that = this

    // 调用登录接口
    qcloud.login({
      success(result) {
        login_OK=true
        if (result) {
          util.showSuccess('登录成功')
          that.setData({
            userInfo: result,
            logged: true
          })
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              util.showSuccess('登录成功')
              that.setData({
                userInfo: result.data.data,
                logged: true
              })
            },

            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindMange: function () {
    wx.navigateTo({
      url: `../manage/manage`
    })
  },
})