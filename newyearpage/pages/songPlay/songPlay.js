const app = getApp()
import api from '../../api/API.js'
Page({
  data: {
    isPlaying: true,
    currentIndex: 0,
    marginTop: 0,
    lrcHeight:200,
    songState: {
      progress: 0,
      currentPosition: '00:00',
      duration: '00:00',
      datalist: [],
      lry: [],
    }
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      datalist: wx.getStorageSync('song'),
      songIndex: options.songIndex,
    })
    that.requestDataSong(options.songId)
    that.songLrc(options.songId)
    //自动播放下一首
    wx.onBackgroundAudioStop(function () {
      that.next()
    })
  },
  requestDataSong: function (songId) {
    var that = this
    app.requestData('http://ting.baidu.com/data/music/links?songIds=' + songId, {}, (err, data) => {
      that.setData({
        pic: data.data.songList["0"].songPicRadio,
        bigData: data.data.songList["0"],
      })
      wx.playBackgroundAudio({
        dataUrl: data.data.songList["0"].songLink,
      })
    })
    that.playSong()
  },
  playSong: function () {
    var that = this
    let inv = setInterval(function () {
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          if (res.status == 1) {
            that.setData({
              isPlaying: true,
              songState: {
                progress: res.currentPosition / res.duration * 100,
                currentPosition: that.timeToString(res.currentPosition),
                duration: that.timeToString(res.duration),
              }
            })
            var i = that.data.currentIndex
            if (i < that.data.lry.length) {
              if (res.currentPosition - 4 >= parseInt(that.data.lry[i][0])) {
                that.setData({
                  currentIndex: i + 1
                })
              }
            }
            if (that.data.currentIndex >= 6) {
              that.setData({
                marginTop: -(that.data.currentIndex - 6) * 20,
                lrcHeight:200 + (that.data.currentIndex - 6) * 20
              })
            }
          } else {
            that.setData({
              isPlaying: false
            })
            clearInterval(inv)
          }
        }
      })
    }, 1000)
  },
  playAndPause: function () {
    var that = this
    if (that.data.isPlaying) {
      wx.pauseBackgroundAudio()
    } else {
      wx.playBackgroundAudio()
    }
    that.playSong()
    that.setData({
      isPlaying: !that.data.isPlaying
    })
  },
  //上一首
  before: function () {
    var that = this
    that.setData({
      currentIndex: 0,
      marginTop: 0,
      lrcHeight:200,
    })
    if (that.data.songIndex == 0) {
      that.requestDataSong(that.data.datalist[that.data.datalist.length - 1].song_id)
      that.songLrc(that.data.datalist[that.data.datalist.length - 1].song_id)
      that.setData({
        songIndex: that.data.datalist.length - 1
      })
    } else {
      that.requestDataSong(that.data.datalist[that.data.songIndex - 1].song_id)
      that.songLrc(that.data.datalist[that.data.songIndex - 1].song_id)
      that.setData({
        songIndex: that.data.songIndex - 1
      })
    }
  },
  //下一首
  next: function () {
    var that = this
    that.setData({
      currentIndex: 0,
      marginTop: 0,
      lrcHeight:200,
    })
    if (that.data.songIndex == that.data.datalist.length - 1) {
      that.requestDataSong(that.data.datalist[0].song_id)
      that.songLrc(that.data.datalist[0].song_id)
      that.setData({
        songIndex: 0
      })
    } else {
      that.setData({
        songIndex: parseInt(that.data.songIndex) + 1
      })
      that.requestDataSong(that.data.datalist[that.data.songIndex].song_id)
      that.songLrc(that.data.datalist[that.data.songIndex].song_id)
    }
  },
  //请求歌词
  songLrc: function (songid) {
    var that = this
    app.requestData('http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.lry&songid=' + songid, {}, (err, data) => {
      if (data.lrcContent == undefined) {
        var lrc = "无歌词";
      } else {
        var lrc = data.lrcContent;
      }
      that.setData({
        lry: that.sliceNull(that.parseLyric(lrc))
      })
    })
  },
  //去除空白
  sliceNull: function (lrc) {
    var result = []
    for (var i = 0; i < lrc.length; i++) {
      if (lrc[i][1] == "") {
      } else {
        result.push(lrc[i]);
      }
    }
    return result
  },
  parseLyric: function (text) {
    //将文本分隔成一行一行，存入数组
    var lines = text.split('\n'),
      //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
      pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
      //保存最终结果的数组
      result = [];
    //去掉不含时间的行
    while (!pattern.test(lines[0])) {
      lines = lines.slice(1);
    };
    //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
    lines[lines.length - 1].length === 0 && lines.pop();
    lines.forEach(function (v /*数组元素值*/, i /*元素索引*/, a /*数组本身*/) {
      //提取出时间[xx:xx.xx]
      var time = v.match(pattern),
        //提取歌词
        value = v.replace(pattern, '');
      //因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
      time.forEach(function (v1, i1, a1) {
        //去掉时间里的中括号得到xx:xx.xx
        var t = v1.slice(1, -1).split(':');
        //将结果压入最终数组
        result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
      });
    });
    //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
    result.sort(function (a, b) {
      return a[0] - b[0];
    });
    return result;
  },
  timeToString: function (duration) {
    let str = '';
    let minute = parseInt(duration / 60) < 10 ? ('0' + parseInt(duration / 60)) : (parseInt(duration / 60));
    let second = duration % 60 < 10 ? ('0' + duration % 60) : (duration % 60);
    str = minute + ':' + second;
    return str;
  },
})