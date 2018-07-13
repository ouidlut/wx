// pages/speciallist/list.js
var app = getApp()
var config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    specialList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.getSpecialPage();
    wx.getStorage({
      key: 'specialList',
      success: function (res) {
        var data = res.data
        that.setData({
          specialList: data,
        })
      },
      fail: function () { },
      complete: function () { }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.getSpecialPage();
    // wx.getStorage({
    //   key: 'specialList',
    //   success: function (res) {
    //     var data = res.data
    //     that.setData({
    //       specialList: data,
    //     })
    //   },
    //   fail: function () { },
    //   complete: function () { }
    // })
},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
    return {
      title: "微遊",
      desc: "专辑",
      path: `pages/speciallist/list`
    }
  },
  getSpecialPage: function () {
    var that = this
    wx.request({
      url: config.service.initSpecialListUrl, //这里填写你的接口路径
      header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
        'Content-Type': 'application/json'
      },
      data: {},
      success: function (res) {
        wx.setStorage({
          key: 'specialList',
          data: res.data
        })
      }
    })
  },

  bindTapProduct: function (e) {
    var data = e.currentTarget.dataset
    app.globalData.currentHtmlType = { typeName: data.type, typeId: data.typeid }
    wx.navigateTo({
      url: `../htmldetail/htmldetail`
    })
  }
})