//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
        // qcloud.setLoginUrl(config.service.loginUrl)
        // // 登录
        // wx.login({
        //   success: res => {
        //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //   }
        // })
        // // 获取用户信息
        // wx.getSetting({
        //   success: res => {
        //     if (res.authSetting['scope.userInfo']) {
        //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        //       wx.getUserInfo({
        //         success: res => {
        //           // 可以将 res 发送给后台解码出 unionId
        //           this.globalData.userInfo = res.userInfo

        //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //           // 所以此处加入 callback 以防止这种情况
        //           if (this.userInfoReadyCallback) {
        //             this.userInfoReadyCallback(res)
        //           }
        //         }
        //       })
        //     }
        //   }
        // })
      this.getSlidesFromServer()
      this.getTtlBtnFromServer()
      this.getProductsFromServer()
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

    }
})