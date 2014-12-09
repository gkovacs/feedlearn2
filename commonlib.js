(function(){
  var root, firstNonNull, getUrlParameters, out$ = typeof exports != 'undefined' && exports || this, slice$ = [].slice;
  root = typeof exports != 'undefined' && exports !== null ? exports : this;
  out$.firstNonNull = firstNonNull = function(){
    var args, i$, len$, x;
    args = slice$.call(arguments);
    for (i$ = 0, len$ = args.length; i$ < len$; ++i$) {
      x = args[i$];
      if (x != null) {
        return x;
      }
    }
  };
  out$.getUrlParameters = getUrlParameters = function(){
    var url, hash, map, parts;
    url = window.location.href;
    hash = url.lastIndexOf('#');
    if (hash !== -1) {
      url = url.slice(0, hash);
    }
    map = {};
    parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value){
      return map[key] = decodeURI(value);
    });
    return map;
  };
}).call(this);
