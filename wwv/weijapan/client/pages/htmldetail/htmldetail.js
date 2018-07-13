// pages/htmldetail/htmldetail.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
var config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    htmlsr:null,
    title:null,
    blandnm:null,
    blandid:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    /**
   * html解析示例
   */
    var article = `< !DOCTYPE HTML >`;
    // article = `that.htmlsr`

    WxParse.wxParse('article', 'html', that.htmlsr, that, 5);


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.setNavigationBarTitle({ title: title })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var cateType = app.globalData.currentHtmlType
    that.setData({ blandnm: cateType.typeName, blandid: cateType.typeId })
    // that.setData({ title: cateType.typeName })
    wx.setNavigationBarTitle({ title: cateType.typeName })

    
    wx.request({
      url: config.service.initHtmlDetailUrl, //这里填写你的接口路径
      method: 'post',
      header: { "content-type": "application/x-www-form-urlencoded" },
      data: {//这里写你要请求的参数
        blandid: cateType.typeId,
        blandnm: cateType.typeName
      },

      success: function (res) {
        that.setData({ htmlsr: res.data[0].html_content })
        WxParse.wxParse('article', 'html', res.data[0].html_content, that, 5);
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