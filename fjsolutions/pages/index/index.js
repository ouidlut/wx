const productUtil = require('../../utils/product.js')
var app = getApp()

Page({
  data: {
    items: [],
    slides: [
    ],
    navs: [{ icon: "../../images/icon-new-list1.png", name: "高档百货", typeId: 0 },
    { icon: "../../images/icon-new-list2.png", name: "电器卖场", typeId: 1 },
    { icon: "../../images/icon-new-list3.png", name: "服饰珠宝", typeId: 2 },
    { icon: "../../images/icon-new-list4.png", name: "日常用品", typeId: 3 },
    { icon: "../../images/icon-new-list4.png", name: "美容健康", typeId: 4 },
    { icon: "../../images/icon-new-list4.png", name: "推荐糖果", typeId: 5 },
    { icon: "../../images/icon-new-list4.png", name: "娱乐观光", typeId: 6 },
    { icon: "../../images/icon-new-list4.png", name: "餐厅美食", typeId: 7 },
    { icon: "../../images/icon-new-list4.png", name: "酒店旅馆", typeId: 8 },
    { icon: "../../images/icon-new-list4.png", name: "各地特产", typeId: 9 },
    { icon: "../../images/icon-new-list4.png", name: "动漫人物", typeId: 10 },
    { icon: "../../images/icon-new-list4.png", name: "微信支付", typeId: 11 }   
    
    
    ],

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

  onReady: function () {
    this.getSlidesFromServer()
  },
  getSlidesFromServer: function () {
    var that = this

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
