// pages/manage/course/course.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mHidden:true,
    kcHidden:true,
    array: ['日语课', '文综课', '数学课', '物理课日本'],
    index: 0,
    list:[
      {
        km: '日语课',
        icon:"../../images/wz.png" ,
        kc: [
          {title:'日语课初级',
            Icon:"../../images/wz.png"
          }, 
          {
            title:'日语课中级',
            Icon: "../../images/wz.png"
          },  
          {
            title:'日语课上级',
            Icon: "../../images/wz.png"
          }, ]
      },
      {
        km: '文综课',
        icon: "",
        kc: [
          {
            title: '文综课初级',
            Icon: ""
          },
          {
            title:'文综课中级',
            Icon: ""
          },
          {
            title:'文综课上级',
            Icon: ""
          }
          ]
      },
      {
        km: '数学课',
        icon: "",
        kc: [
          {
            title: '数学课初级',
            Icon: ""
          },
          {
            title: '数学课中级',
            Icon: ""
          },
          {
            title: '数学课上级',
            Icon: ""
          }
          ]
      },
      {
        km: '物理课',
         Icon: "",
        kc: [
          {
            title:'物理课初级',
            Icon: ""
          },
          {
            title: '物理课中级',
            Icon: ""
          },
          {
            title: '物理课上级',
            Icon: ""
          }
        ]
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
    });
  }, 
  btnTap: function () {
    this.setData({
      mHidden: false
    });
  },
  // btnKCTap: function () {
  //   this.setData({
  //     kcHidden: false
  //   });
  // },
  btnKCTap: function () {
    wx.navigateTo({
      url: `../../manage/addcourse/addcourse`
    });
  },
changeModel:function(){
  // console.log(mHidden)
  this.setData({
      mHidden:true,
      kcHidden: true,
  });
},
   
modelCancel:function(){
  this.setData({
    mHidden:true,
    kcHidden: true,
  });
},
bindPickerChange: function (e) {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    index: e.detail.value
  })
},
})