const { mysql } = require('../qcloud')
//const uuid = require('node-uuid')

/**
* 响应 GET 请求（响应微信配置时的签名检查请求）
*/
async function get(ctx, next) {

  //var res = await mysql("m111_wy_img_info")
  console.log('initSwiperT => get', )  
  //var sql = `SELECT id,url, img_dir FROM m111_wy_img_info `
  var res = await mysql('cAuth').select('*').from('view_getSwipder')
  //ctx.state.code = -1
  ctx.body = res
  
}

async function post(ctx, next) {
  var res = await mysql('cAuth').select('*').from('view_getSwipder').where({ id: 1 })
  //=> { id: 1, name: 'leo', age: 20 }

  
  console.log('initSwiperT => post', )  
  //ctx.state.code = -1
  ctx.body = res
}

module.exports = {
  post,
  get
}


