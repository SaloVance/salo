/* 
 * load script by dynamic tag
 * @Usage: 
 * Salo.loadScript(url, callback)
 */
(function(){
  var createScriptTag = function(scr, url, charset){
    scr.setAttribute('type', 'text/javascript');
    charset && scr.setAttribute('charset', charset);
    scr.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(scr);
  };
  
  var removeScriptTag = function(scr){
    if (scr.clearAttributes) {
      scr.clearAttributes();
    } else {
      for (var attr in scr) {
        if (scr.hasOwnProperty(attr)) {
          delete scr[attr];
        }
      }
    }
    if(scr && scr.parentNode){
      scr.parentNode.removeChild(scr);
    }
    scr = null;
  };
  
  var loadScript = function(url, callback){
    var scr = document.createElement('SCRIPT'),
        scriptLoaded = 0,
        charset = 'utf-8';
    /* IE和opera支持onreadystatechange
       safari、chrome、opera支持onload */
    scr.onload = scr.onreadystatechange = function () {
      /* 避免opera下的多次调用*/
      if (scriptLoaded) {
          return;
      };
      
      var readyState = scr.readyState;
      if ('undefined' == typeof readyState
          || readyState == "loaded"
          || readyState == "complete") {
        scriptLoaded = 1;
        try {
          callback && callback(scr);
        } finally {
          scr.onload = scr.onreadystatechange = null;
          removeScriptTag(scr);
        }
      }
    };
    createScriptTag(scr, url, charset);
  };

  window.Salo = window.Salo || {};
  Salo.loadScript = loadScript;
})();