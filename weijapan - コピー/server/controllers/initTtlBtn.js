const { mysql } = require('../qcloud')
//const uuid = require('node-uuid')

/**
* 响应 GET 请求（响应微信配置时的签名检查请求）
*/
async function get(ctx, next) {

  //var res = await mysql("m111_wy_img_info")

  //var sql = `SELECT id,url, img_dir FROM m111_wy_img_info `
  var res = await mysql("view_getTtlBtn")
  //ctx.state.code = -1
  ctx.body = res

}

async function post(ctx, next) {
  var res = await mysql("view_getTtlBtn")
  //ctx.state.code = -1
  ctx.body = res
}

module.exports = {
  post,
  get
}


