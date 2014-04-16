/* 
 * dom style api
 * @Usage: addStyle(styleStr)
 */
 
(function(){
  var addStyle = function (styleStr) {
    var isIE = navigator.userAgent.indexOf('MSIE') != -1 && !window.opera;
    if (isIE) {
      var styleSheet = document.createStyleSheet();
      styleSheet.cssText = styleStr;
    } else {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.appendChild(document.createTextNode(styleStr));
      document.getElementsByTagName('HEAD')[0].appendChild(style);
    }
  };
  
  window.Salo = window.Salo || {};
  Salo.dom = Salo.dom || {};
  Salo.dom.addStyle = addStyle;
})();