//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var myaudio = wx.createInnerAudioContext()
var play_flg = true
function timeloop() {
  if (play_flg && myaudio.currentTime <= myaudio.duration) {
    setTimeout(function () {
      timeloop();
    }, 1000)
  }
  if (myaudio.currentTime >= 4) {
    clearTimeout(timeloop);
    myaudio.stop();
    myaudio.play();
  }
};
function toHms(t) {
  var hms = "";
  var h = t / 3600 | 0;
  var m = t % 3600 / 60 | 0;
  var s = Math.round(t % 60 )

  if (h != 0) {
    hms = h + ":" + padZero(m) + ":" + padZero(s) + "秒";
  } else if (m != 0) {
    hms = m + ":" + padZero(s) ;
  } else {

    hms = "00:" + padZero(s);
  }

  return hms;

  function padZero(v) {
    if (v < 10) {
      return "0" + v;
    } else {
      return v;
    }
  }
};
Page({
    data: {
      isplay: false,//是否播放  
      slider_step:null,
      slider_max: null,
      slider_now:null,
      currentProcess:"00:00",
      totalProcess:"",
      isMovingSlider:false,
      title:"思得学院听课堂",
      view: {
        Height: 80,
        Display: 'none',
        ButtonValue:'评论',
        ButtonColor:'mediumseagreen'
      },
      userInfo: null,
      scene: '',
      commentList:[
        {
          user_src:"../images/my_on.png",
          user_name:"巴九灵",
          user_comment:"棒棒糖，我要棒棒糖",
          user_upd_date:"1小时前"
        },
        {
          user_src: "../images/my_on.png",
          user_name: "巴九灵",
          user_comment: "棒棒糖，我要棒棒糖",
          user_upd_date: "1小时前"
        },
        {
          user_src: "../images/my_on.png",
          user_name: "巴九灵",
          user_comment: "棒棒糖，我要棒棒糖",
          user_upd_date: "1小时前"
        },
        {
          user_src: "../images/my_on.png",
          user_name: "巴九灵",
          user_comment: "棒棒糖，我要棒棒糖",
          user_upd_date: "2小时前"
        },
        {
          user_src: "../images/my_on.png",
          user_name: "巴九灵",
          user_comment: "棒棒糖，我要棒棒糖",
          user_upd_date: "3小时前"
        },
        {
          user_src: "../images/my_on.png",
          user_name: "巴九灵",
          user_comment: "棒棒糖，我要棒棒糖",
          user_upd_date: "4小时前"
        },
        {
          user_src: "../images/my_on.png",
          user_name: "巴九灵",
          user_comment: "棒棒糖，我要棒棒糖",
          user_upd_date: "5小时前"
        },
        {
          user_src: "../images/my_on.png",
          user_name: "巴九灵",
          user_comment: "给你棒棒糖",
          user_upd_date: "6小时前"
        },
      ]
    },
 
    onLoad(){
      myaudio.src = "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46"

      myaudio.loop = true
      myaudio.autoplay = true
      this.setData({ slider_max: myaudio.duration })
      this.setData({ slider_step: myaudio.duration / 100 })
      this.setData({ isplay: true });
      myaudio.onPlay(() => {
        ;
      }),
      myaudio.onTimeUpdate(() => {
        if (!this.data.isMovingSlider) {
          this.setData({ slider_max: myaudio.duration })

          var time = myaudio.currentTime
          this.setData({ slider_now: myaudio.currentTime })

          this.setData({ currentProcess: toHms(myaudio.currentTime) })
          this.setData({ totalProcess: toHms(myaudio.duration) })
        }
        // console.log(myaudio.currentTime)
      })

      var that = this
      var scene_img = '' //这里添加图片的地址  
      that.setData({
        scene: scene_img
      })  
    },
    
   

    onShow: function () {
      this.setData({
        view: {
          Height: 80,
          Display: 'none',
          ButtonValue: '评论',
          ButtonColor: 'mediumseagreen'
        }
      })
    },
    //播放  
    play: function () {

      myaudio.play();
      this.setData({ isplay: true });
      this.setData({ slider_max: myaudio.duration })
      
      play_flg = true;
      // setInterval(function () {
      //   timeloop();
      // }, 1000)

      myaudio.onPlay(() => {
        ;
      }),
        myaudio.onTimeUpdate(() => {
        if (!this.data.isMovingSlider) {
          this.setData({ slider_max: myaudio.duration })

          var time = myaudio.currentTime
          this.setData({ slider_now: myaudio.currentTime })

          this.setData({ currentProcess: toHms(myaudio.currentTime) })
          this.setData({ totalProcess: toHms(myaudio.duration) })
        }
          // console.log(myaudio.currentTime)
        })
    },
    // 停止  
    stop: function () {
      myaudio.pause();
      play_flg = false;
      clearTimeout(timeloop);
      this.setData({ isplay: false });
      this.setData({ slider_max: myaudio.duration })
      this.setData({ slider_now: myaudio.currentTime })
    },
    onPlay:function(){
      myaudio.play();
      this.setData({ slider_max: myaudio.duration })
      this.setData({ slider_now: myaudio.currentTime })

    },
    onPause:function(){
      myaudio.pause();
    },
   
    hanleSliderChange(e) {
      const position = e.detail.value;
      console.log(`The process of the audio is now in ${position}s`);
      this.seekCurrentAudio(position);
    },
    // 拖动进度条控件
    seekCurrentAudio(pos) {

      // 更新进度条
      const page = this;
      // 音频控制跳转
      // 这里有一个诡异bug：seek在暂停状态下无法改变currentTime，需要先play后pause
      const pauseStatusWhenSlide = myaudio.paused;
      if (pauseStatusWhenSlide) {
        myaudio.play();
      }
      myaudio.seek(Math.floor(pos));
      if (pauseStatusWhenSlide) {
        myaudio.pause();
      }

    },
    handleSliderMoveStart () {
      this.setData({
        isMovingSlider: true
      });
    },
    handleSliderMoveEnd() {
      this.setData({
        isMovingSlider: false
      });
    },
    bindToList: function (e) {
      wx.navigateTo({
        url: `../listenlist/listen`
      })
    },
    // onHide: function () {    //页面隐藏
    //   console.log('index Hide')
    //   myaudio.pause();
    //   this.setData({ isplay: false });
    // },
    // userInfoHandler(data) {
    //   this.setData({ userInfo: data.detail.userInfo })
    //   // this.setData({ login_OK: true })
    //   wx.setStorage({
    //     key: 'userInfo',
    //     data: data.detail.userInfo
    //   })
    //   wx.setStorage({
    //     key: 'login_OK',
    //     data: true
    //   })
    // },
    bindViewPingLun:function(){
      var that = this
      // console.log("1111111111111----11111111111")
      // var userI = null
      wx.getStorage({
        key: 'userInfo',
        success: function (res) {
          that.setData({ 'userInfo': res.data })
          console.log("----11111111-----")
          console.log(res.data)
        },
        fail: function () {
          console.log("----222222-----")
            wx.getUserInfo({
              success: function (res) {
                that.setData({ userInfo: res.userInfo })
                wx.setStorage({
                  key: 'userInfo',
                  data: res.userInfo
                })
                wx.setStorage({
                  key: 'login_OK',
                  data: true
                })
                // console.log({ encryptedData: res.encryptedData, iv: res.iv, code: code })
                that.setData({
                  view: {
                    Height: 220,
                    Display: 'block',
                    ButtonValue: '退出评论',
                    ButtonColor: 'tomato'
                  }
                })
                //3.解密用户信息 获取unionId
                // console.log("-----------")
                //...
              },
              fail: function () {
                console.log('获取用户信息失败')
                that.setData({
                  view: {
                    Height: 80,
                    Display: 'none',
                    ButtonValue: '评论',
                    ButtonColor: 'mediumseagreen'
                  }
                })
              }
            })

         },
        complete: function () { }
      })
      // console.log(userI == null)

      console.log(this.data.view.Display)
      if (this.data.view.Display == 'none'){
        this.setData({
          view: {
            Height: 220,
            Display: 'block',
            ButtonValue:'退出评论',
            ButtonColor: 'tomato'
          }
        })
      }else{
        this.setData({
          view: {
            Height: 80,
            Display: 'none',
            ButtonValue: '评论',
            ButtonColor: 'mediumseagreen'
          }
        })
      }

    },
      
    previewImage: function (e) {
      wx.previewImage({
        current: 'http://pmoe92330.pic31.websiteonline.cn/upload/jrhx.png',
        urls: ['http://pmoe92330.pic31.websiteonline.cn/upload/jrhx.png']
        // 需要预览的图片http链接  使用split把字符串转数组。不然会报错  
      })
    }

})
