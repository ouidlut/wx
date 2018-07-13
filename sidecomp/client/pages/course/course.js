// pages/course/course.js
var app = getApp()
//時間のフォーマット
function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
  data: {
    src: '',
    danmuList:
    [{
      text: '第 1s 出现的弹幕',
      color: '#ff0000',
      time: 1
    },
    {
      text: '第 3s 出现的弹幕',
      color: '#ff00ff',
      time: 3
    }],
    courseList:[
      {
        id:0,
        course_src: "../images/couseH.png",
        course_text: "",
        contentList: [
          {
            id: 1,
            content_src: "../images/wz.png",
            content_text: "思得学园日语一年级班",

          },
          {
            id: 2,
            content_src: "../images/wz.png",
            content_text: "思得学园日语二年级班",

          },
        ]
      },
      {
        id: 1,
        course_src: "../images/wz.png",
        course_text: "思得学园文综课",
        contentList:[
          {
            id:1,
            content_src: "../images/wz.png",
            content_text: "思得学园文综一年级班",

          },
          {
            id: 2,
            content_src: "../images/wz.png",
            content_text: "思得学园文综二年级班",

          },
        ]
      },
      {
        id: 2,
        course_src: "../images/sx.png",
        course_text: "思得学园数学课"
      },
      {
        id: 3,
        course_src: "../images/wl.png",
        course_text: "思得学园物理课"
      },    
    ]
  },
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },
  bindPlay: function () {
    this.videoContext.play()
  },
  bindPause: function () {
    this.videoContext.pause()
  },
  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },

  bindTabCourse: function (e) {
    var data = e.currentTarget.dataset
    app.globalData.currentCateType = { typeName: data.type, typeId: data.typeid }
    wx.navigateTo({
      url: `../courseCatalog/catalog`
    })
  },

})