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
    // wx.switchTab({
    //   url: `../recommond/recommond`
    // })
    wx.navigateTo({
      url: `../tablist/tablist`
    })
  },
  
  bindTapProduct: function(e) {
    var data = e.currentTarget.dataset
    app.globalData.currentCateType = { typeName: data.type, typeId: data.typeid }
    // wx.switchTab({
    //   url: `../recommond/recommond`
    // })
    wx.navigateTo({
      url: `../detail/detail`
    })
  },



  onPullDownRefresh: function (e) {
    this.getSlidesFromServer()
    this.getProductsFromServer()
    wx.stopPullDownRefresh()
  },


  // orderSign: function (e) {
  //   var that = this;
  //   wx.login({
  //     success: function (res) {
  //       var appId = 'wx13ec741be3001633';//微信公众号平台申请的appid
  //       var appSecret = 'c1a5c421202cd37e362bcaeed870e1d2';//微信公众号平台申请的app secret
  //       var js_code = res.code;//调用登录接口获得的用户的登录凭证code
  //       var template_id = "QWluyx9me0cRQ-fksOeWHTiAgXDWyAIvrjC04T7uUvA"
  //       var form_id = e.detail.formId
  //       var url = 'https://9sixxlcu.qcloud.la/weapp/moban'
  //       console.log('開始：')
  //       //acces_token
  //       wx.request({
  //         url: url,
  //         method: 'post',
  //         header: { "content-type": "application/x-www-form-urlencoded" },
  //         data: {
  //           "appId": appId,
  //           "template_id": template_id,
  //           "form_id": form_id,
  //           "js_code": js_code,
  //           "appSecret": appSecret
  //                 },
  //         success: function (res) {
  //           var openid = res
  //           console.log(res)
  //           console.log("成功しました。")

  //           }
  //         })
  //     }
  //   })
  //  },
  // orderSign: function (e) {
  //   var that = this;
  //   wx.login({
  //     success: function (res) {
  //       var appId = 'wx13ec741be3001633';//微信公众号平台申请的appid
  //       var appSecret = 'c1a5c421202cd37e362bcaeed870e1d2';//微信公众号平台申请的app secret
  //       var js_code = res.code;//调用登录接口获得的用户的登录凭证code
  //       var access_token = ''
  //       var form_id = e.detail.formId
  //       var open_id = ''
  //       console.log(js_code)
  //       console.log('form_id')
  //       console.log(form_id)
  //       //acces_token
  //       wx.request({
  //         url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx13ec741be3001633&secret=c1a5c421202cd37e362bcaeed870e1d2',
  //         method: 'GET',
  //         success: function (res) {
  //           var openid = res.data
  //           console.log(openid)
  //           console.log("access_token")
  //           access_token = res.data.access_token
  //           console.log(access_token)
  //       //open_id
  //       wx.request({
  //         url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + appSecret + '&js_code=' + js_code + '&grant_type=authorization_code',
  //         method: 'GET',
  //         success: function (res) {
  //           var openid = res.data
  //           console.log(openid)
  //           console.log("open_id")
  //           open_id = res.data.openid
  //           console.log(open_id)


  //           //send
  //           wx.request({
  //             // url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + appSecret + '&js_code=' + js_code + '&grant_type=authorization_code',
  //             url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + access_token,
  //             data: {
  //               "touser": open_id,
  //               "template_id": "QWluyx9me0cRQ-fksOeWHTiAgXDWyAIvrjC04T7uUvA",
  //               "page": "index",
  //               "form_id": e.detail.formId,
  //               "data": {
  //                 "keyword1": {
  //                   "value": "339208499"
  //                 },
  //                 "keyword2": {
  //                   "value": "2015年01月05日 12:30"
  //                 },
  //                 "keyword3": {
  //                   "value": "粤海喜来登酒店"
  //                 },
  //                 "keyword4": {
  //                   "value": "10000"
  //                 },
  //                 "keyword5": {
  //                   "value": "10000"
  //                 },
  //                 "keyword6": {
  //                   "value": "a"
  //                 },
  //                 "keyword7": {
  //                   "value": "2015年01月05日 12:30"
  //                 },
  //                 "keyword8": {
  //                   "value": "12345678"
  //                 },
  //                 "keyword9": {
  //                   "value": "粤海喜来登酒店"
  //                 },
  //                 "keyword10": {
  //                   "value": "10000"
  //                 }
  //               },
  //               "emphasis_keyword": "keyword1.DATA"

  //             },
  //             method: 'POST',
  //             success: function (res) {
  //               var r = res.data
  //               console.log(open_id)
  //               console.log(r)
  //               console.log("上面就是获得的openid")
  //             }
  //           })
            
  //         }

  //       })
  //         }

  //       })


  //     }
  //   })
  // },
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
    this.getSlidesFromServer()
    this.getTtlBtnFromServer()
    this.getProductsFromServer()
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
  }
})