//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    items: [],
    slides: [],
    navs: [],

    popularity_products: [],
    new_products: [],
    hot_products: [],
    promotions: []
  },

  onShareAppMessage: function () {
    return {
      title: "微遊",
      desc: "首页",
      path: `pages/index/index`
    }
  },


  catchTabProduct: function (e) {
    var data = e.currentTarget.dataset
    app.globalData.currentTabType = { typeName: data.type, typeId: data.typeid }
     wx.navigateTo({
      url: `../tablist/tablist`
    })
  },
  
  bindTapProduct: function(e) {
    var data = e.currentTarget.dataset
    app.globalData.currentCateType = { typeName: data.type, typeId: data.typeid }
    wx.navigateTo({
      url: `../detail/detail`
    })
  },

  bindToWeiBo: function (e) {
    var data = e.currentTarget.dataset
    app.globalData.currentWeiBoType = { typeName: data.type, typeId: data.typeid }
    wx.navigateTo({
      url: `../weibo/weiboV`
    })
  },


  onPullDownRefresh: function (e) {
    this.getSlidesFromServer()
    this.getProductsFromServer()
    wx.stopPullDownRefresh()
  },

  onLoad: function () {
    var that = this
    this.getSlidesFromServer()
    this.getTtlBtnFromServer()
    this.getProductsFromServer()
    wx.getStorage({
      key: 'products',
      success: function (res) {
        var data = res.data
        that.setData({
          items: data,
        })
      },
      fail: function () { },
      complete: function () { }
    })
//title spwider
    wx.getStorage({
      key: 'indexSlides',
      success: function (res) {
        that.setData({ 'slides': res.data })
      },
      fail: function () { },
      complete: function () { }
    })

    //title Button
    wx.getStorage({
      key: 'indexNavs',
      success: function (res) {
        that.setData({ 'navs': res.data })
      },
      fail: function () { },
      complete: function () { }
    })



  },
 
  onReady: function () {
    // this.getSlidesFromServer()
    // this.getTtlBtnFromServer()
    // this.getProductsFromServer()
  },
  onShow: function () {
    this.getSlidesFromServer()
    this.getTtlBtnFromServer()
    this.getProductsFromServer()
  },
  getSlidesFromServer: function () {
    var that = this

    wx.request({
      url: config.service.initSwiperTitleUrl, //这里填写你的接口路径
      header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
        'Content-Type': 'application/json'
      },
      data: {//这里写你要请求的参数
        x: '',
        y: ''
      },

      success: function (res) {
        wx.setStorage({
          key: 'indexSlides',
          data: res.data
        })
       // console.log(res.data)
      }
    })
  },

  getTtlBtnFromServer: function () {
    var that = this

    wx.request({
      url: config.service.initTitleButtonUrl, //这里填写你的接口路径
      header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
        'Content-Type': 'application/json'
      },
      data: {//这里写你要请求的参数
        x: '',
        y: ''
      },

      success: function (res) {
        wx.setStorage({
          key: 'indexNavs',
          data: res.data
        })
        // console.log(res.data)
      }
    })
  },
  getProductsFromServer: function () {
    wx.request({
      url: config.service.initProductListUrl, //这里填写你的接口路径
      header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
        'Content-Type': 'application/json'
      },
      data: {//这里写你要请求的参数
        x: '',
        y: ''
      },
      success: function (res) {
        wx.setStorage({
          key: 'products',
          data: res.data
        })
        // console.log(res.data)
      }
    })

  },

  click: function () {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;
        that.setData({
          show: this.show
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: (res) => {
      }
    })
  },

  // 上传图片接口
  doUpload: function () {
    var that = this

    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        util.showBusy('正在上传')
        var filePath = res.tempFilePaths[0]

        // 上传图片
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: filePath,
          name: 'file',

          success: function (res) {
            util.showSuccess('上传图片成功')
            console.log(res)
            res = JSON.parse(res.data)
            console.log(res)
            that.setData({
              imgUrl: res.data.imgUrl
            })
          },

          fail: function (e) {
            util.showModel('上传图片失败')
          }
        })

      },
      fail: function (e) {
        console.error(e)
      }
    })
  },

  // 预览图片
  previewImg: function () {
    wx.previewImage({
      current: this.data.imgUrl,
      urls: [this.data.imgUrl]
    })
  },

})