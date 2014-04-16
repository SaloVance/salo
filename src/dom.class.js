/* 
 * dom class api
 * @Usage: addClass removeClass
 */
(function(){
  var addClass = function (element, name){
    var cl = " " +element.className +" ";
    cl = cl.replace(new RegExp(" "+name+" ", "g"), ' ')+" "+name;
    element.className = cl.replace(/(^\s*)|(\s*$)/g,"");
  };
  var removeClass = function (element, name){
    var cl = " " +element.className +" ";
    cl = cl.replace(new RegExp(" "+name+" ", "g"), ' ');
    element.className = cl.replace(/(^\s*)|(\s*$)/g,"");
  };
  
  window.Salo = window.Salo || {};
  Salo.dom = Salo.dom || {};
  Salo.dom.addClass = addClass;
  Salo.dom.removeClass = removeClass;
})();