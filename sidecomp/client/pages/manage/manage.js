// pages/manage/manage.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
  bindListL: function () {
    app.globalData.currentListType = { typeName: "听课管理", typeId: "1" }
    wx.navigateTo({
      url: `../manage/list/list`
    })

  },

  bindListV: function () {
    app.globalData.currentListType = { typeName: "课程管理", typeId: "2" }
    wx.navigateTo({
      url: `../manage/list/list`
    })
  },
  bindChangeL: function () {
    app.globalData.currentListType = { typeName: "听课管理", typeId: "3" }
    wx.navigateTo({
      url: `../manage/change/change`
    })
  },
  bindChangeV: function () {
    app.globalData.currentListType = { typeName: "课程管理", typeId: "4" }
    wx.navigateTo({
      url: `../manage/change/change`
    })
  },
  bindTapClass: function () {

    wx.navigateTo({
      url: `../manage/course/course`
    })
  },
  
})