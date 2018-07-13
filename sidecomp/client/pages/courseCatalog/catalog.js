// pages/courseCatalog/catalog.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_src:"../images/catalogH.png",
    title:"思得学园日语课中级班",
    id:"001",
    descrition:"日语读解 听解 听读解 记述日语读解 听解 听读解 记述日语读解 听解 听读解 记述日语读解 听解 听读解 记述日语读解 听解 听读解 记述日语读解 听解 听读解 记述日语读解 听解 听读解 记述日语读解 听解 听读解 记述日语读解 听解 听读解 记述日语读解 听解 听读解 记述日语读解 听解 听读解 记述日语读解 听解 听读解 记述日语读解 听解 听读解 记述日语读解 听解 听读解 记述日语读解 听解 听读解 记述日语读解 听解 听读解 记述日语读解 听解 听读解 记述日语读解 听解 听读解 记述日语读解 听解 听读解 记述日语读解 听解 听读解 记述日语读解 听解 听读解 记述日语读解 听解 听读解 记述",
    playCount:"1.4万",
    commentCount:"35",
    lastUpdate:"已更新到29回",
    view: {
      Height: 160,
      Display: 'none',
      ButtonValue: '订阅课程：5000日元\n(约人民币299元)',
      ButtonColor: 'mediumseagreen'
    },
    courseList:[
      {
        id:0,
        video_title:"第二十九回 天上地下到处是故事",
        video_src :"http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        video_play:"1.1万",
        video_comment:"10",
        video_free: "试听",
      },
      {
        id: 1,
        video_title: "第二十八回 夏天来了",
        video_src: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        video_play: "1.1万",
        video_comment: "10",
        video_free: "",
      },
          
      {
        id: 3,
        video_title: "第一回 哲学开始于仰望星空",
        video_src: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        video_play: "3.5万",
        video_comment: "151",
        video_free: "试听",
      },         ]
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

  bindTabCourse: function (e) {
    var data = e.currentTarget.dataset
    app.globalData.currentCateType = { typeName: data.type, typeId: data.typeid }
    wx.navigateTo({
      url: `../courseCatalog/catalog`
    })
  },

  bindTabContent: function (e) {
    var data = e.currentTarget.dataset
    app.globalData.currentCateType = { typeName: data.type, typeId: data.typeid }
    wx.navigateTo({
      url: `../courseDetail/detail`
    })
  },
  bindViewPingLun: function () {
    var that = this
    // // console.log("1111111111111----11111111111")
    // // var userI = null
    // wx.getStorage({
    //   key: 'userInfo',
    //   success: function (res) {
    //     that.setData({ 'userInfo': res.data })
    //     console.log("----11111111-----")
    //     console.log(res.data)
    //   },
    //   fail: function () {
    //     console.log("----222222-----")
    //     wx.getUserInfo({
    //       success: function (res) {
    //         that.setData({ userInfo: res.userInfo })
    //         wx.setStorage({
    //           key: 'userInfo',
    //           data: res.userInfo
    //         })
    //         wx.setStorage({
    //           key: 'login_OK',
    //           data: true
    //         })
    //         // console.log({ encryptedData: res.encryptedData, iv: res.iv, code: code })
    //         that.setData({
    //           view: {
    //             Height: 220,
    //             Display: 'block',
    //             ButtonValue: '退出评论',
    //             ButtonColor: 'tomato'
    //           }
    //         })
    //         //3.解密用户信息 获取unionId
    //         // console.log("-----------")
    //         //...
    //       },
    //       fail: function () {
    //         console.log('获取用户信息失败')
    //         that.setData({
    //           view: {
    //             Height: 80,
    //             Display: 'none',
    //             ButtonValue: '评论',
    //             ButtonColor: 'mediumseagreen'
    //           }
    //         })
    //       }
    //     })

    //   },
    //   complete: function () { }
    // })
    // // console.log(userI == null)

    // console.log(this.data.view.Display)
    // if (this.data.view.Display == 'none') {
    //   this.setData({
    //     view: {
    //       Height: 220,
    //       Display: 'block',
    //       ButtonValue: '退出评论',
    //       ButtonColor: 'tomato'
    //     }
    //   })
    // } else {
    //   this.setData({
    //     view: {
    //       Height: 80,
    //       Display: 'none',
    //       ButtonValue: '评论',
    //       ButtonColor: 'mediumseagreen'
    //     }
    //   })
    // }

  },
  bindWechatPay: function() {
    var that = this
    wx.requestPayment(
      {
        'timeStamp': '',
        'nonceStr': '',
        'package': '',
        'signType': 'MD5',
        'paySign': '',
        'success': function (res) { },
        'fail': function (res) { },
        'complete': function (res) { }
      })
  },
})