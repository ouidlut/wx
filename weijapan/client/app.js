//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {

      this.getSlidesFromServer()
      this.getTtlBtnFromServer()
      this.getProductsFromServer()
      this.getSpecialPage()
      this.getRecommondPage()
    },
    globalData: {
      userInfo: null
    },

      getSlidesFromServer: function () {
      var that = this

      wx.request({
        url: config.service.initSwiperTitleUrl, //这里填写你的接口路径
        header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
          'Content-Type': 'application/json'
        },
        data: {},

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
        data: {},

        success: function (res) {
          wx.setStorage({
            key: 'indexNavs',
            data: res.data
          })
        }
      })
    },
    getProductsFromServer: function () {
      wx.request({
        url: config.service.initProductListUrl, //这里填写你的接口路径
        header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
          'Content-Type': 'application/json'
        },
        data: { },
        success: function (res) {
          wx.setStorage({
            key: 'products',
            data: res.data
          })
          // console.log(res.data)
        }
      })

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
    getRecommondPage: function () {
      var that = this

      wx.request({
        url: config.service.initGoodListUrl, //这里填写你的接口路径
        header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
          'Content-Type': 'application/json'
        },
        data: {},

        success: function (res) {
          wx.setStorage({
            key: 'goodList',
            data: res.data
          })
        }
      })
    }
})