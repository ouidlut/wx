const app = getApp()
import api from '../../api/API.js'
Page({
  data:{},
  onLoad:function(options){
    var url = api.home + 'baidu.ting.mv.playMV&mv_id=' + options.id
     app.requestData(url,{},(err,data) => {
        this.setData({
          mvurl:data.result.files["31"].file_link
        })
    })
  }
})