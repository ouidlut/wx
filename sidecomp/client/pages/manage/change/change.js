// pages/manage/change/change.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"听课管理",
    typeId:"1",
    radioItem: [
      { name: '0', value: '收费' },
      { name: '1', value: '免费', checked: 'true' },
    ],

    multiArray: [
      ['日语课', '文综课', '数学课', '物理课'], ['日语课初级', '日语课中级', '日语课上级']
    ],
    // ]
    //   { title: '日语课', kmArr: ['日语课初级', '日语课中级', '日语课上级']}, 
    //   { title: '文综课', kmArr: ['文综课初级', '文综课中级', '文综课上级']}, 
    //   { title: '数学课', kmArr: ['数学课初级', '数学课中级', '数学课上级']}, 
    //   { title: '物理课', kmArr: ['物理课初级', '物理课中级', '物理课上级']},
    //   ],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '日语课'
        },
        {
          id: 1,
          name: '文综课'
        },
        {
          id: 1,
          name: '数学课'
        },
        {
          id: 1,
          name: '物理课'
        }
      ], [
        {
          id: 0,
          name: '日语课初级'
        },
        {
          id: 1,
          name: '日语课中级'
        },
        {
          id: 2,
          name: '日语课上级'
        }
      ]
    ],
    multiIndex: [0, 0],
    index: 0,
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
    var that = this
    var cateType = app.globalData.currentListType
    that.setData({ title: cateType.typeName })
    that.setData({ typeId: cateType.typeId })
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
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },


  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['日语课初级', '日语课中级', '日语课上级'];
            break;
          case 1:
            data.multiArray[1] = ['文综课初级', '文综课中级', '文综课上级'];
            break;
          case 2:
            data.multiArray[1] = ['数学课初级', '数学课中级', '数学课上级'];
            break;
          case 3:
            data.multiArray[1] = ['物理课初级', '物理课中级', '物理课上级'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
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
  bindButtonTap: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
})