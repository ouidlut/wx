// pages/recomdetail/recomdetail.js
var app = getApp()
var config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: null,
    blandid: null,
    blandnm: null,
    detailinfo: null
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var cateType = app.globalData.currentCateType
    that.setData({ blandnm: cateType.typeName, blandid: cateType.typeId })
    // that.setData({ title: cateType.typeName })
    wx.setNavigationBarTitle({ title: cateType.typeName })

    wx.request({
      url: config.service.initGoodListUrl, //这里填写你的接口路径
      method: 'post',
      header: { "content-type": "application/x-www-form-urlencoded" },
      data: {//这里写你要请求的参数
        blandid: cateType.typeId,
        blandnm: cateType.typeName
      },

      success: function (res) {
        that.setData({ detailinfo: res.data })
      },
      fail: function () { },
      complete: function () { }
    })
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
  
  }
})