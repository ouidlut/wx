// pages/speciallist/list.js
var app = getApp()
var config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
      title: '',
      items: null,
      categoryType: null,
      categoryTypeId: null,
      tablist: null,
      distance: 0,
      scale: 1,
      baseWidth: null,
      baseHeight: null,
      scaleWidth: null,
      scaleHeight: null
  },
  onShareAppMessage: function () {
    return {
      title: "微遊",
      desc: "特別推薦",
      path: `pages/tablist/tablist`
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getStorage({
    //   key: 'tablist',
    //   success: function (res) {
    //     that.setData({ 'tablist': res.data })
    //   },
    //   fail: function () { },
    //   complete: function () { }
    // })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (this.data.categoryType != null) {
      var title = '微遊-'+ this.data.categoryType
      wx.setNavigationBarTitle({ title: title })
    }
 },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var cateType = app.globalData.currentTabType
    that.setData({ categoryType: cateType.typeName, categoryTypeId: cateType.typeId })
    
    wx.request({
      url: config.service.tablistListUrl, //这里填写你的接口路径
      method: 'post',
      header: { "content-type": "application/x-www-form-urlencoded" },
      data: {//这里写你要请求的参数
        type_nm: cateType.typeName
      },

      success: function (res) {
        that.setData({tablist : res.data})
        // this.data.goodList= res.data
        // wx.setStorage({
        //   key: 'tablist',
        //   data: res.data
        // })

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

  },
  bindTapProduct: function (e) {
    var data = e.currentTarget.dataset
    app.globalData.currentCateType = { typeName: data.type, typeId: data.typeid }
    // wx.switchTab({
    //   url: `../recommond/recommond`
    // })
    wx.navigateTo({
      url: `../detail/detail`
    })
  }

})