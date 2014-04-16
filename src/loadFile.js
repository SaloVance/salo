/* 
 * load file by xhr
 * @Usage: 
 * Salo.loadFile(url, callback)
 */
(function(){
  var loadFile = function(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){
        if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
          callback && callback(xhr.responseText);
        }
      }
    };
    xhr.send(null);
  };

  window.Salo = window.Salo || {};
  Salo.loadFile = loadFile;
})();