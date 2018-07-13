//requestをrequire
var request = require('request');
// const https = require('https');

//ヘッダーを定義
var headers = {
  'Content-Type': 'application/json'
}


/**
* 响应 GET 请求（响应微信配置时的签名检查请求）
*/
// async function post(ctx, next) {

//   //var res = await mysql("m111_wy_img_info")

//   //var sql = `SELECT id,url, img_dir FROM m111_wy_img_info `
//   var res = await mysql("view_getTtlBtn")
//   //ctx.state.code = -1
//   ctx.body = res

// }

async function get(ctx, next) {
  //オプションを定義
  var options = {
    url: '',
    method: 'POST',
    headers: headers,
    data: {}
  }

  var access_token =''
  var open_id =''
  
  //アクセストークン
  var url1= 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential'
  // &appid=wx13ec741be3001633&secret=c1a5c421202cd37e362bcaeed870e1d2'
  //OPEN ID
  var url2 = 'https://api.weixin.qq.com/sns/jscode2session?appid=' 
  // + appId + '&secret=' + appSecret + '&js_code=' + js_code + '&grant_type=authorization_code'
  //通知する
  var url3 = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' 

  ctx.body = ctx.request.body
  // + access_token
  options.url = url1 + '&appid=' + ctx.body.appId
   ctx.body = "da:" + ctx.body.appId
  // //リクエスト送信
  // await　request(options, function (error, response, body) {
  //   if (!error) {
  //     access_token = response.data.access_token
  //     // return response.statusCode;
  //   }
  //   else {
  //     console.log("Error!!");
  //   }
  // })
  // ctx.body = "access_token:" + ctx.req.appId 
  // // "appId": appId,
  // //   "template_id": template_id,
  // //     "form_id": form_id,
  // //       "js_code": js_code,
  // //         "appSecret": appSecret

  // // + access_token
  // options.url = url2 + ctx.body.appId + '&secret=' + ctx.body.appSecret + '&js_code=' + ctx.body.js_code + '&grant_type=authorization_code'

  // await 　request(options, function (error, response, body) {
  //   if (!error) {
  //     open_id = response.data.openid
  //     // return response.statusCode;
  //   }
  //   else {
  //     console.log("Error!!");
  //   }
  // })
  // ctx.body = "access_token:" + access_token + " open_id:" + open_id
  // //通知する
  // options.url = url3 + access_token
  // options.data= {
  //               "touser": open_id,
  //               "template_id": ctx.body.template_id,
  //               "page": "index",
  //               "form_id": ctx.body.form_id,
  //               "data": {
  //                 "keyword1": {
  //                   "value": "339208499"
  //                 },
  //                 "keyword2": {
  //                   "value": "2015年01月05日 12:30"
  //                 },
  //                 "keyword3": {
  //                   "value": "粤海喜来登酒店"
  //                 },
  //                 "keyword4": {
  //                   "value": "10000"
  //                 },
  //                 "keyword5": {
  //                   "value": "10000"
  //                 },
  //                 "keyword6": {
  //                   "value": "a"
  //                 },
  //                 "keyword7": {
  //                   "value": "2015年01月05日 12:30"
  //                 },
  //                 "keyword8": {
  //                   "value": "12345678"
  //                 },
  //                 "keyword9": {
  //                   "value": "粤海喜来登酒店"
  //                 },
  //                 "keyword10": {
  //                   "value": "10000"
  //                 }
  //               },
  //               "emphasis_keyword": "keyword1.DATA"

  //             }
  // await request(options, function (error, response, body) {
  //   if (!error) {      
  //     ctx.body = "access_token:" + access_token + " open_id:" + open_id +" MMMM"
  //     }
  //   else {
  //     console.log("Error!!");
  //   }
  // })
  
 // ctx.body = res
  //ctx.state.code = -1
  //ctx.body = res
}

async function post(ctx, next) {
  //オプションを定義
  var options = {
    url: '',
    method: 'get',
    headers: headers,
    json: true,
    data: {}
  }
  var options1 = {
    url: '',
    method: 'post',
    header: '',
    json: {}
  }

  var access_token = ''
  var open_id = ''
  var appid = ''
  var secret = ''
  var js_code=''
  var ret_str=''
  var template_id =''
  var form_id =''
  //アクセストークン
  var url1 = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential'
  // &appid=wx13ec741be3001633&secret=c1a5c421202cd37e362bcaeed870e1d2'

  //OPEN ID
  var url2 = 'https://api.weixin.qq.com/sns/jscode2session?appid='
  // + appId + '&secret=' + appSecret + '&js_code=' + js_code + '&grant_type=authorization_code'
  //通知する
  var url3 = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token='

  ctx.body = ctx.request.body

  appid = ctx.body.appId
  secret = ctx.body.appSecret
  js_code = ctx.body.js_code
  template_id = ctx.body.template_id
  form_id = ctx.body.form_id

  ret_str = '------'
  // + access_token
  options.url = url1 + '&appid=' + appid + '&secret=' + secret
  options.method = 'get'
  // // ctx.body = "da:" + ctx.body.appId

  // var options1 = {
  //   url: url1 + '&appid=' + appid + '&secret=' + secret,
  //   json: true
  // };
  let result = await doRequest(options)
  ctx.body = result
  access_token = ctx.response.body.access_token
  ctx.body = ctx.response.body.access_token
  // return
  ret_str = ret_str + '----at--' + access_token
  //access_token
  // ctx.body = result
  //open_id
  options.url = url2 + appid + '&secret=' + secret + '&js_code=' + js_code + '&grant_type=authorization_code'
  options.method = 'get'
  result = await doRequest(options)
  ctx.body = result
  open_id = ctx.response.body.openid
  // ctx.body = ctx.response.body
  // return
  ret_str = ret_str + '----oi--' + open_id
  // ctx.body = result
  //送信1
  options1.url = url3 + access_token
  options1.method = 'POST'
  options1.header = { 'Content-Type': 'application/json' }
  options1.json = {
              "touser": open_id,
              "template_id": template_id,
              "page": "index",
              "form_id": form_id,
              "data": {
                "keyword1": {
                  "value": "339208499"
                },
                "keyword2": {
                  "value": "2015年01月05日 12:30"
                },
                "keyword3": {
                  "value": "粤海喜来登酒店"
                },
                "keyword4": {
                  "value": "10000"
                },
                "keyword5": {
                  "value": "10000"
                },
                "keyword6": {
                  "value": "a"
                },
                "keyword7": {
                  "value": "2015年01月05日 12:30"
                },
                "keyword8": {
                  "value": "12345678"
                },
                "keyword9": {
                  "value": "粤海喜来登酒店"
                },
                "keyword10": {
                  "value": "10000"
                }
              },
              "emphasis_keyword": "keyword1.DATA"
            }
  // result = await doPostRequest(options1)

  //送信2
  options1.url = url3 + access_token
  options1.method = 'POST'
  options1.header = { 'Content-Type': 'application/json' }
  options1.json = {
    "touser": open_id,
    "template_id": template_id,
    "page": "index",
    "form_id": form_id,
    "data": {
      "keyword1": {
        "value": "1"
      },
      "keyword2": {
        "value": "2018年05月25日 12:30"
      },
      "keyword3": {
        "value": "忽悠你"
      },
      "keyword4": {
        "value": "10000"
      },
      "keyword5": {
        "value": "10000"
      },
      "keyword6": {
        "value": "天知道"
      },
      "keyword7": {
        "value": "2018年05月25日 12:30"
      },
      "keyword8": {
        "value": "12345678"
      },
      "keyword9": {
        "value": "新宿"
      },
      "keyword10": {
        "value": "便宜你我就赔了"
      }
    },
    "emphasis_keyword": "keyword1.DATA"
  }
  result = await doPostRequest(options1)
  ctx.body = result
  
}

function doRequest(url) {
  return new Promise(function (resolve, reject) {
    request(url, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}
function doPostRequest(url) {
  return new Promise(function (resolve, reject) {
    request.post(url, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

module.exports = {
  post,
  get
}

/*
 wx.request({
  //         url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + appSecret + '&js_code=' + js_code + '&grant_type=authorization_code',
  //         method: 'GET',
  //         success: function (res) {
  //           var openid = res.data
  //           console.log(openid)
  //           console.log("open_id")
  //           open_id = res.data.openid
  //           console.log(open_id)


  //           //send
  //           wx.request({
  //             // url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + appSecret + '&js_code=' + js_code + '&grant_type=authorization_code',
  //             url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + access_token,
  //             data: {
  //               "touser": open_id,
  //               "template_id": "QWluyx9me0cRQ-fksOeWHTiAgXDWyAIvrjC04T7uUvA",
  //               "page": "index",
  //               "form_id": e.detail.formId,
  //               "data": {
  //                 "keyword1": {
  //                   "value": "339208499"
  //                 },
  //                 "keyword2": {
  //                   "value": "2015年01月05日 12:30"
  //                 },
  //                 "keyword3": {
  //                   "value": "粤海喜来登酒店"
  //                 },
  //                 "keyword4": {
  //                   "value": "10000"
  //                 },
  //                 "keyword5": {
  //                   "value": "10000"
  //                 },
  //                 "keyword6": {
  //                   "value": "a"
  //                 },
  //                 "keyword7": {
  //                   "value": "2015年01月05日 12:30"
  //                 },
  //                 "keyword8": {
  //                   "value": "12345678"
  //                 },
  //                 "keyword9": {
  //                   "value": "粤海喜来登酒店"
  //                 },
  //                 "keyword10": {
  //                   "value": "10000"
  //                 }
  //               },
  //               "emphasis_keyword": "keyword1.DATA"

  //             },
  //             method: 'POST',
  //             success: function (res) {
  //               var r = res.data
  //               console.log(open_id)
  //               console.log(r)
  //               console.log("上面就是获得的openid")
  //             }
  */