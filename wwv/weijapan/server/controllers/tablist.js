const { mysql } = require('../qcloud')
//const uuid = require('node-uuid')

/**
* 响应 GET 请求（响应微信配置时的签名检查请求）
*/
async function get(ctx, next) {

  //var res = await mysql("m111_wy_img_info")
  // console.log('initSwiperT => get', )
  //var sql = `SELECT id,url, img_dir FROM m111_wy_img_info `
  var typeNm ='';
  ctx.body = ctx.request.body
  // + access_token
  
  var typeNm = ctx.body.type_nm
  // typeNm = ctx.request.body.type_nm
  var res = await mysql('cAuth').select('*').from('view_bland_list').where({ type_nm: typeNm })
  //ctx.state.code = -1
  // ctx.body = ctx.request.body

}

async function post(ctx, next) {
  ctx.body = ctx.request.body
  // + access_token

  var typeNm =  ctx.body.type_nm
  // typeNm = ctx.request.body.type_nm
  var res = await mysql('cAuth').select('*').from('view_bland_list').where({ type_nm: typeNm })
  //=> { id: 1, name: 'leo', age: 20 }


  // console.log('initSwiperT => post', )
  //ctx.state.code = -1
   ctx.body = res
}

module.exports = {
  post,
  get
}


