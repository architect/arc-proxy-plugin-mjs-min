let terser = require('terser')
/**
 * @architect/proxy-plugin-css-min
 *
 * @param Key - the requested S3 Key
 * @param File - the file contents {headers, body}
 * @returns File - the processed file contents {header, body}
 */
module.exports = function css(Key, {headers, body}) {
  let result = terser.minify(body)
  if (result.code) return {headers, body:result.code}
  if (result.error) {
    let e = result.error
    let msg = `${e.message} [line: ${e.line}, col: ${e.col}]`
    throw Error(msg)
  }
}
