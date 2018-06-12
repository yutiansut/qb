/**
 *  休眠一段时间
 * @param time
 * @returns {Promise<any>}
 */
export default function (time) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(), time)
  });
};
