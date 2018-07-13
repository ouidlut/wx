const productUtil = require('../../utils/product.js')
var app = getApp()

Page({
  data: {
    items: [],
    slides: [
    ],
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

  bindShowProduct: function (e) {
    wx.navigateTo({
      url: `../show_product/show_product?id=${e.currentTarget.dataset.id}`
    })
  },

  catchTapCategory: function (e) {
    var data = e.currentTarget.dataset
    app.globalData.currentCateType = { typeName: data.type, typeId: data.typeid }
    wx.switchTab({
      url: `../category/category`
    })
  },

  onPullDownRefresh: function () {
    this.getSlidesFromServer()
    this.getProductsFromServer()
    wx.stopPullDownRefresh()
  },

  onLoad: function () {
    var that = this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.getStorage({
      key: 'products',
      success: function (res) {
        var data = res.data
        that.setData({
          items: data,
          popularity_products: data.filter(product => (product.flag === '最热' && product['promotion-url'])),
          new_products: data.filter(product => (product.flag === '新品' && product['promotion-url'])),
          hot_products: data.filter(product => (product.flag === '火爆' && product['promotion-url'])),
        })
      },
      fail: function () { },
      complete: function () { }
    })

    wx.getStorage({
      key: 'indexSlides',
      success: function (res) {
        that.setData({ 'slides': res.data })
      },
      fail: function () { },
      complete: function () { }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onReady: function () {
    this.getSlidesFromServer()
  },
  getSlidesFromServer: function () {
    var that = this

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

    wx.request({
      url: 'http://localhost/FJSBASIC/web/index_dev.php/PicUrlList/PicUrlList', //这里填写你的接口路径
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
        console.log(res.data)
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
  }
})
