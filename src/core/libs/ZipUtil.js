const zlib = require("zlib");

/**
 * 压缩
 * @param data 需要压缩的数据
 * @returns {Promise<any>}
 */
const zip = data => {
  return new Promise((resolve, reject)=>zlib.deflate(data, (err, buffer) => !err && resolve(buffer) || reject({ret: -4, data: err})))
}


/**
 * 解压缩
 * @param data 参见Node.js API 中 Buffer.from 的参数
 * @returns {Promise<any>}
 */
const unZip = (...data) => {
  return new Promise((resolve, reject)=>zlib.unzip(Buffer.from(...data), (err, buffer) => !err && resolve(buffer) || reject({ret: -5, data: err})))
}

const BlobParse = data =>{
  return new Promise((resolve, reject)=>{
    try{
      var reader = new FileReader();
      reader.addEventListener("loadend", function() {
        // reader.result 包含转化为类型数组的blob
        resolve(reader.result)
      });
      reader.readAsArrayBuffer(data);
    } catch (e) {
      reject({ret: -6, data: e})
    }
  })
}



module.exports = {
  zip,
  unZip,
  BlobParse
}

