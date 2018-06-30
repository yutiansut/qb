import JsonBig from 'json-bigint'

JSON.stringify = (...parmas)=>{
  console.log("修改JSON.stringify", ...parmas);
  let res =  JsonBig.stringify(...parmas)
  console.log("修改JSON.stringify结果", res);
  return res;
}

JSON.parse = (...parmas)=>{
  console.log("修改JSON.parse", ...parmas);
  return JsonBig.parse(...parmas)
}