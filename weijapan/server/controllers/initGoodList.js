const { mysql } = require('../qcloud')
//const uuid = require('node-uuid')

/**
* 响应 GET 请求（响应微信配置时的签名检查请求）
*/
async function get(ctx, next) {

  //var res = await mysql("m111_wy_img_info")

  //var sql = `SELECT id,url, img_dir FROM m111_wy_img_info `
  var res = await mysql("view_good_list")
  //ctx.state.code = -1
  ctx.body = res

}

async function post(ctx, next) {
  var blandid = ''
  ctx.body = ctx.request.body

  blandid = ctx.body.blandid
  blandnm = ctx.body.blandnm
  var res =""
  if (blandid != null &&blandid.length >0){
    res = await mysql("m120_remmond_detail").where({ id: blandid })
    ctx.body = res[0].pic_url_list
    piclist = res[0].pic_url_list
    res[0].pic_url_list = piclist.split(',')
  }
  else
    res = await mysql("view_good_list").orderby
  //ctx.state.code = -1
  ctx.body = res
}

module.exports = {
  post,
  get
}


