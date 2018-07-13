// pages/listenlist/listen.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    view: {
      Width: 100,
      Height: 100
    },
    listenList: [
      {
        id: 1,
        link: "",
        title: "抢人大战，哪些城市拼实力，哪些城市忽悠你",
      },
      {
        id: 2,
        link: "",
        title: "这一轮抢人大战，将决定未来五年人才流向",
      },
      {
        id: 3,
        link: "",
        title: "时隔半年，新零售会走向统一还是更大分歧",
      },
      {
        id: 4,
        link: "",
        title: "农耕型，狩猎型，圈地型，那种企业更胜一筹？",
      },
      {
        id: 5,
        link: "",
        title: "为什么雷军不用自己的钱来投资小米？",
      },

    ],
  },
  viewWidth: function (e) {
    console.log(e);
    this.setData({
      view: {
        Width: e.detail.value,
        Height: this.data.view.Height
      }
    })
  },
viewHeight: function (e) {
    this.setData({
      view: {
        Width: this.data.view.Width,
        Height: e.detail.value
      }
    })
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
