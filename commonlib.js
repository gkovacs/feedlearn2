(function(){
  var root, firstNonNull, getUrlParameters, setvar, getvar, getevent, getUserEvents, getCondition, getUserName, printcb, forcehttps, updatecookies, updatecookiesandevents, getFBAppId, getbaselang, out$ = typeof exports != 'undefined' && exports || this, slice$ = [].slice;
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
  out$.setvar = setvar = function(varname, varval){
    if (typeof localStorage != 'undefined' && localStorage !== null) {
      localStorage.setItem(varname, varval);
    }
    $.cookie(varname, varval, {
      expires: 365,
      path: '/'
    });
  };
  out$.getvar = getvar = function(varname){
    var output;
    if (typeof localStorage != 'undefined' && localStorage !== null) {
      output = localStorage.getItem(varname);
      if (output != null) {
        return output;
      }
    }
    return $.cookie(varname);
  };
  out$.getevent = getevent = function(varname){
    var strval, parsedval, error;
    strval = getvar(varname);
    if (strval == null) {
      return null;
    }
    try {
      parsedval = parseInt(strval);
      if (isFinite(parsedval)) {
        return parsedval;
      }
      return null;
    } catch (e$) {
      error = e$;
      return null;
    }
  };
  out$.getUserEvents = getUserEvents = function(callback){
    return $.get('/getuserevents?' + $.param({
      username: getUserName()
    }), function(events){
      return callback(JSON.parse(events));
    });
  };
  out$.getCondition = getCondition = function(callback){
    return $.get('/conditionforuser?' + $.param({
      username: getUserName()
    }), function(condition){
      return callback(parseInt(condition));
    });
  };
  out$.getUserName = getUserName = function(){
    root.fullname = getvar('fullname');
    if (root.fullname != null) {
      return root.fullname;
    }
    root.fullname = getvar('username');
    if (root.fullname != null) {
      return root.fullname;
    }
    root.fullname = getvar('fbname');
    if (root.fullname != null) {
      return root.fullname;
    }
    root.fullname = 'Anonymous User';
    return root.fullname;
  };
  out$.printcb = printcb = function(){
    var args, i$, len$, x, results$ = [];
    args = slice$.call(arguments);
    for (i$ = 0, len$ = args.length; i$ < len$; ++i$) {
      x = args[i$];
      results$.push(console.log(x));
    }
    return results$;
  };
  out$.forcehttps = forcehttps = function(){
    if (window.location.href.indexOf('http://') === 0) {
      if (window.location.href.indexOf('http://localhost:5000') === 0) {
        return window.location.href = window.location.href.split('http://localhost:5000').join('https://localhost:5001');
      } else {
        return window.location.href = window.location.href.split('http://').join('https://');
      }
    }
  };
  out$.updatecookies = updatecookies = function(callback){
    var username;
    username = getUserName();
    if (username == null || username === 'Anonymous User' || username.length === 0) {
      if (callback != null) {
        callback();
      }
      return;
    }
    return $.getJSON('/cookiesforuser?' + $.param({
      username: username
    }), function(cookies){
      var needrefresh, k, v, curv;
      if (cookies.username == null) {
        if (callback != null) {
          callback();
        }
        return;
      }
      if (cookies.username !== username) {
        if (callback != null) {
          callback();
        }
        return;
      }
      needrefresh = false;
      for (k in cookies) {
        v = cookies[k];
        if (k === 'username') {
          continue;
        }
        if (v == null) {
          continue;
        }
        curv = getvar(k);
        if (curv == null || v.toString() !== curv.toString()) {
          needrefresh = true;
          setvar(k, v);
        }
      }
      if (callback != null) {
        return callback();
      }
    });
  };
  out$.updatecookiesandevents = updatecookiesandevents = function(callback){
    var username;
    username = getUserName();
    if (username == null || username === 'Anonymous User' || username.length === 0) {
      if (callback != null) {
        callback();
      }
      return;
    }
    return $.getJSON('/getusereventsandcookies?' + $.param({
      username: username
    }), function(cookies){
      var needrefresh, k, v, curv;
      if (cookies.username == null) {
        if (callback != null) {
          callback();
        }
        return;
      }
      if (cookies.username !== username) {
        if (callback != null) {
          callback();
        }
        return;
      }
      needrefresh = false;
      for (k in cookies) {
        v = cookies[k];
        if (k === 'username') {
          continue;
        }
        if (v == null) {
          continue;
        }
        curv = getvar(k);
        if (curv == null || v.toString() !== curv.toString()) {
          needrefresh = true;
          setvar(k, v);
        }
      }
      if (callback != null) {
        return callback();
      }
    });
  };
  out$.getFBAppId = getFBAppId = function(){
    var appid_map, k, v;
    appid_map = {
      'http://localhost': '1582095062012614',
      'https://localhost': '1582095062012614',
      'https://feedlearn2.herokuapp.com': '718471924927544',
      'https://feedlearnfrench.herokuapp.com': '1393407637624307'
    };
    for (k in appid_map) {
      v = appid_map[k];
      if (window.location.href.indexOf(k) === 0) {
        return v;
      }
    }
    return '1582092298679557';
  };
  out$.getbaselang = getbaselang = function(){
    var ref$;
    return (ref$ = getvar('baselang')) != null ? ref$ : 'japanese';
  };
}).call(this);
