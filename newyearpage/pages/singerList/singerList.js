const app = getApp()
import api from '../../api/API.js'
Page({
  data:{
    singerParams:["61", "62", "63", "31", "32", "33", "71", "72", "73", "601", "602", "603", "50"],
    singerList:[]
  },
  onLoad:function(options){
    var area = this.data.singerParams[options.index];
    var myArea = area.substring(0,area.length - 1);
    var mySex = area.substring(area.length - 1,area.length)
    console.log(myArea)
    console.log(mySex)
    app.requestData(api.home + 'baidu.ting.artist.getList' + '&area=' + myArea + '&sex=' + mySex,{},(err,data) => {
        this.setData({
          singerList:data.artist
        })
    })
    wx.setNavigationBarTitle({
      title: options.title,
    })
  },
    hotTap:function (e) {
    var dataset = e.currentTarget.dataset
    wx.navigateTo({
            url: '../songDetail/songDetail?artist_id=' + dataset.artist_id + '&ting_uid=' + dataset.ting_uid + '&singer=1' + '&headImg=' + dataset.pic
    })
  }
})