const { mysql } = require('../qcloud')

/**
* 响应 GET 请求（响应微信配置时的签名检查请求）
*/
async function get(ctx, next) {

  //var res = await mysql("m111_wy_img_info")
  // console.log('initSwiperT => get', )
  //var sql = `SELECT id,url, img_dir FROM m111_wy_img_info `
  var typeid = '';
  ctx.body = ctx.request.body
  // + access_token

  var typeid = ctx.body.blandid
  // typeNm = ctx.request.body.type_nm
  var res = await mysql('cAuth').select('*').from('m118_special_detail').where({ id: typeid })
  //ctx.state.code = -1
  // ctx.body = ctx.request.body

}

async function post(ctx, next) {

  var blandid = ''
  ctx.body = ctx.request.body

  blandid = ctx.body.blandid
  blandnm = ctx.body.blandnm
  // console.log('initSwiperT => post=' )
  // typeNm = ctx.request.body.type_nm
  var res = await mysql('cAuth').select('*').from('m118_special_detail').where({ id: blandid })
  //=> { id: 1, name: 'leo', age: 20 }
  // ctx.body = res[0].pic_list_url
  // var piclist = res[0].pic_list_url
  // res[0].pic_list_url = piclist.split(',')
  // // console.log('initSwiperT => post', )
  // //ctx.state.code = -1
  // var res1 = await mysql('cAuth').select('*').from('view_sales_list').where({ bland_nm: blandnm })
  // res[0].sort_v = res1
  ctx.body = res
}

module.exports = {
  post,
  get
}


