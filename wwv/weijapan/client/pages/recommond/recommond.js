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
      goodList: []
  },
  onShareAppMessage: function () {
    return {
      title: "微遊",
      desc: "特別推薦",
      path: `pages/recommon/recommon`
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.getStorage({
      key: 'goodList',
      success: function (res) {
        var data = res.data
        that.setData({
          goodList: data,
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
    if (this.data.categoryType != null) {
      var title = '微遊-'+ this.data.categoryType
      wx.setNavigationBarTitle({ title: title })
    }

    this.getSpecialPage();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // var that = this
    // var cateType = app.globalData.currentCateType
    // this.setData({ categoryType: cateType.typeName, categoryTypeId: cateType.typeId })
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
  
  getSpecialPage: function () {
    var that = this

    wx.request({
      url: config.service.initGoodListUrl, //这里填写你的接口路径
      header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
        'Content-Type': 'application/json'
      },
      data: {//这里写你要请求的参数
        x: '',
        y: ''
      },

      success: function (res) {
        wx.setStorage({
          key: 'goodList',
          data: res.data
        })
        // console.log(res.data)
      }
    })
  },
  bindTapProduct: function (e) {
    var data = e.currentTarget.dataset
    app.globalData.currentCateType = { typeName: data.type, typeId: data.typeid }
    // wx.switchTab({
    //   url: `../recommond/recommond`
    // })
    wx.navigateTo({
      url: `../recomdetail/recomdetail`
    })
  },

})