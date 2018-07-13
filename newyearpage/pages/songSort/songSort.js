const app = getApp()
import api from '../../api/API.js'
Page({
  data:{
    dataList:[],
  },
  onLoad:function(options){
    app.requestData(api.home + 'baidu.ting.billboard.billList&format=json&offset=0&size=50&fields=song_id%2Ctitle%2Cauthor%2Calbum_title%2Cpic_big%2Cpic_small%2Chavehigh%2Call_rate%2Ccharge%2Chas_mv_mobile%2Clearn%2Csong_source' + '&&type=' + options.type,{},(err,data) => {
      console.log(data)
        this.setData({
           dataList:data.song_list,
           headImg:data.billboard.pic_s210
          })
       }) 
  },
    songPlay:function (e) {
    var dataset = e.currentTarget.dataset
     wx.setStorageSync('song', this.data.dataList)
    wx.navigateTo({
      url: '../songPlay/songPlay?songId=' + dataset.id + '&songIndex=' + dataset.songindex
    })
  }
})