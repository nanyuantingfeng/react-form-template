/*************************************************************
 * AUTHOR : nanyuantingfeng DATE : 3/28/16 TIME : 18:08
 ************************************************************/
module.exports = async function (context) {

  context.entry = {
    'demo0': './test/app0.js',
    'demo1': './test/app1.js'
  };

  context.babelOptions.plugins.push([
    'import', {style: true, libraryName: 'antd',}
  ]);

};
