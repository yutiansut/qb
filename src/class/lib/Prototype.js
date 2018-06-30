import JsonBig from 'json-bigint'

JSON.stringify = (...parmas)=>{
  // console.log("修改JSON.stringify", ...parmas);
  // let res =
  // console.log("修改JSON.stringify结果", res);
  return JsonBig.stringify(...parmas)
}

JSON.parse = (...parmas)=>{
  // console.log("修改JSON.parse", ...parmas);
  return JsonBig.parse(...parmas)
}