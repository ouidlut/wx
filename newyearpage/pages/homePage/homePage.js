                                // pages/homePage/homePage.js
const app = getApp()
import api from '../../api/API.js'

Page({
  data:{
    headTitle:["推荐","歌手","排行","歌单","电台","MV"],//头部标题
    head_choseIndex:0,//头部标题选项
    scrol_picData:[],  //轮播图数据
    songHot:[],//热门歌单
    songRec:[],//歌曲推荐
    radioRc:[],//电台节目
    singerList:[],//歌手列表
    singerType:["华语男歌手","华语女歌手","华语组合","欧美男歌手","欧美女歌手","欧美组合","韩国男歌手","韩国女歌手","韩国组合","日本男歌手","日本女歌手","日本组合"],
    sortList:[],//排行榜
    gedanList:[],//歌单
    chanelList:[],//电台
    mvList:[]//mv

  },
  onLoad:function(){
       this.requestZero()
  },
  head_action:function (e) {
    var dataset = e.currentTarget.dataset
    var self = this
    self.setData({
        head_choseIndex:dataset.id
    })
    if(dataset.id == 0) {
        this.requestZero()
    } else if(dataset.id == 1) {
        this.requestOne()
    } else if(dataset.id == 2) {
        this.requestTwo()
    } else if(dataset.id == 3) {
        this.requestThree()
    } else if(dataset.id == 4) {
        this.requestFour()
    } else {
        this.requestFive()
    }
  },
  requestZero:function () {
    var self = this
    //轮播图
    app.requestData(api.home + 'baidu.ting.plaza.getFocusPic' + '&num=6',{},(err,data) => {
        self.setData({
          scrol_picData:data.pic
        })
    })
    //热门歌单
    app.requestData(api.home + 'baidu.ting.diy.getHotGeDanAndOfficial',{},(err,data) => {
        self.setData({
          songHot:data.content.list
        })
    })   
    //歌曲推荐
    app.requestData(api.home + 'baidu.ting.song.getEditorRecommend',{},(err,data) => {
        self.setData({
          songRec:data.content[0].song_list
        })
    })  
    //电台节目 
    app.requestData(api.home + 'baidu.ting.radio.getRecommendRadioList',{},(err,data) => {
      console.log(data)
        self.setData({
          radioRc:data.list
        })
    }) 
  },
  requestOne:function () {
    //请求歌手列表
    app.requestData(api.home + 'baidu.ting.artist.getList',{},(err,data) => {
        this.setData({
          singerList:data.artist
        })
    })
  },
  requestTwo:function () {
     //请求排行列表
    app.requestData(api.home + 'baidu.ting.billboard.billCategory',{},(err,data) => {
        this.setData({
          sortList:data.content
        })
    })
  },
  requestThree:function () {
     //请求歌单列表
    app.requestData(api.home + 'baidu.ting.diy.gedan' + '&page_size=30&page_no=0',{},(err,data) => {
        this.setData({
          gedanList:data.content
        })
    })
  },
  requestFour:function () {
     //请求电台列表
    app.requestData(api.home + 'baidu.ting.lebo.getChannelTag',{},(err,data) => {
        this.setData({
          chanelList:data.result.taglist
        })
    })
  },
  requestFive:function () {
     //请求mv列表
    app.requestData(api.home + 'baidu.ting.mv.searchMV' + '&order=1&page_num=1&page_size=20&query=%E5%85%A8%E9%83%A8',{},(err,data) => {
        this.setData({
          mvList:data.result.mv_list
        })
    })
  },
  //热门点击
  hotTap:function (e) {
    var dataset = e.currentTarget.dataset
    if(dataset.singer == 0) {
      wx.navigateTo({
        url: '../songDetail/songDetail?listId=' + dataset.id + '&singer=0'
      })
    } else {
      wx.navigateTo({
        url: '../songDetail/songDetail?artist_id=' + dataset.artist_id + '&ting_uid=' + dataset.ting_uid + '&singer=1' + '&headImg=' + dataset.pic
      })
    }
  },
  //排行点击
  sortTap:function (e) {
    var dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '../songSort/songSort?type=' + this.data.sortList[dataset.index].type
    })
  },
  songPlay:function (e) {
    var dataset = e.currentTarget.dataset
    wx.setStorageSync('song', this.data.songRec)
    wx.navigateTo({
      url: '../songPlay/songPlay?songId=' + dataset.id + '&songIndex=' + dataset.songindex
    })
  },
  //歌手点击
  singerTap:function (e) {
    var dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '../singerList/singerList?index=' + dataset.index + '&title=' + dataset.title,
    })
  },
  //mv点击
  mvTap:function (e) {
    var dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '../mvDetail/mvDetail?id=' + dataset.id
    })
  }
})