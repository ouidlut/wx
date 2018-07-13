const app = getApp()
import api from '../../api/API.js'
Page({
  data:{
   dataList:[],
  },
  onLoad:function(options){
    var self = this
    if(options.singer == 1) {
      app.requestData(api.home + 'baidu.ting.artist.getSongList' + '&tinguid=' + options.ting_uid + '&artistid=' + options.artist_id,{},(err,data) => {
       console.log(data)
        self.setData({
          dataList:data.songlist,
          headImg:options.headImg
        })
    }) 
    } else {
      //歌单
       app.requestData(api.home + 'baidu.ting.diy.gedanInfo' + '&listid=' + options.listId,{},(err,data) => {
        self.setData({
           dataList:data.content,
           headImg:data.pic_w700
          })
       }) 
    }
  },
  songPlay:function (e) {
    var dataset = e.currentTarget.dataset
    wx.setStorageSync('song', this.data.dataList)
    wx.navigateTo({
      url: '../songPlay/songPlay?songId=' + dataset.id + '&songIndex=' + dataset.songindex
    })
  }
})