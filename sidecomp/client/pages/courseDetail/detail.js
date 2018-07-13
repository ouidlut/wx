// pages/courseDetail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_src: "../images/catalogH.png",
    courseDetail: 
      {
        id: 0,
        video_title: "第二十九回 天上地下到处是故事",
        video_src: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        video_play: "1.1万",
        video_comment: "10",
        video_free: "试听",
        lastUpdate:"2018/06/26 09:15",
      },
      commentList:[
        {
          icon:"../images/plays.png",
          name:"巴九灵",
          comment:"我要棒棒糖",
          lastTime:"2018/6/26 09:00"
        },
        {
          icon: "../images/plays.png",
          name: "巴九灵",
          comment: "我要棒棒糖",
          lastTime: "1小时之前"
        },
        {
          icon: "../images/plays.png",
          name: "巴九灵",
          comment: "我要棒棒糖",
          lastTime: "5小时之前"
        },
        {
          icon: "../images/plays.png",
          name: "巴九灵",
          comment: "我要棒棒糖",
          lastTime: "11小时之前"
        },
        {
          icon: "../images/plays.png",
          name: "巴九灵",
          comment: "我要棒棒糖",
          lastTime: "20小时之前"
        },

      ]
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
  
  }
})