/* 
 * 定义AJAX跨域请求(XHR|JSONP)
 * @Usage:
 * Salo.ajax({ 
 *   url : 'http://developer.baiu.com/xxx', 
 *   type : 'jsonp',  // jsonp | xhr 
 *   method : 'get',  // get | post
 *   callback : { 
 *     success : function(info){ 
 *       alert(info); 
 *     }, 
 *     error : function(error){ 
 *       alert(error); 
 *     } 
 *   } 
 * });
*/

(function(){ 
  var Ajax = function(config){ 
    config = config[0] || {}; 
    this.url = config.url || ''; 
    this.type = config.type || 'xhr'; 
    this.method = (this.type == 'jsonp') ? 'GET' : config.method.toUpperCase() || 'GET'; 
    this.param = config.data || null; 
    this.callback = config.callback || {success: new Function, error: new Function}; 
    this.XHR = null; 

    if(typeof window._JSONP_callback == 'undefined'){ 
        window._JSONP_callback = {}; 
    } 

    this._createRequest(); 
  }; 

  Ajax.prototype = { 
    /* 缓存XHR请求，再次再调用时不再进行判断 */
    _createXHR : function(){
      var methods = [ 
        function(){ return new XMLHttpRequest(); }, 
        function(){ return new ActiveXObject('Msxml2.XMLHTTP'); }, 
        function(){ return new ActiveXObject('Microsoft.XMLHTTP'); } 
      ]; 
      for(var i = 0, l = methods.length; i < l; i++){ 
        try{ 
          methods[i](); 
        }catch(e){ 
          continue; 
        } 
        this._createXHR = methods[i]; 
        return methods[i](); 
      } 
    }, 

    _createRequest : function(){ 
      return (this.type == 'jsonp') ? this._setJSONPRequest() : this._setXHRRequest(); 
    }, 
    /* 建立XHR请求 */
    _setXHRRequest : function(){ 
      var _this = this; 
      var param = ''; 

      for(var i in this.param){ 
        if(param == ''){ 
          param = i+'='+this.param[i]; 
        }else{ 
          param+= '&'+i+'='+this.param[i]; 
        } 
      } 

      this.XHR = this._createXHR(); 
      this.XHR.onreadystatechange = function(){ 
        if(_this.XHR.readyState == 4 && _this.XHR.status == 200){ 
            _this.callback.success(_this.XHR.responseText); 
        }else{ 
            _this.callback.error('retry'); 
        } 
      }; 

      this.XHR.open(this.method, this.url, true); 
      this.XHR.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=utf-8'); 
      this.XHR.send(param); 
    }, 
    /* 建立JSONP请求 */
    _setJSONPRequest : function(){ 
      var head = document.getElementsByTagName('head')[0]; 
      var script = document.createElement('script'); 
      var fun = this._setRandomFun(); 
      var _this = this; 
      var param = ''; 

      for(var i in this.param){ 
        if(param == ''){ 
            param = i+'='+this.param[i]; 
        }else{ 
            param+= '&'+i+'='+this.param[i]; 
        } 
      } 

      script.type = 'text/javascript'; 
      script.charset = 'utf-8'; 
      if(head){ 
        head.appendChild(script); 
      }else{ 
        document.body.appendChild(script); 
      } 

      /* data：为回调函数所需要传入的参数 
         定义页面中的回调函数，如例子中的“jsonpCallback（）”方法  */
      window._JSONP_callback[fun.id] = function(data){ 
        _this.callback.success(data); 
        setTimeout(function(){ 
            delete window._JSONP_callback[fun.id]; 
            script.parentNode.removeChild(script); 
        }, 100); 
      }; 

      script.src = this.url+'?callback='+fun.name+'&'+param; 
    }, 

    /* 生成随机JSON回调函数 */ 
    _setRandomFun : function(){ 
      var id = ''; 
      do{ 
        id = 'JSONP'+Math.floor(Math.random()*10000); 
      }while(window._JSONP_callback[id]);
      return{ 
        id : id, 
        name : 'window._JSONP_callback.'+id 
      } 
    } 
  }; 
    
  window.Salo = window.Salo || {};
  Salo.ajax = function(){ return new Ajax(arguments);} 
})();