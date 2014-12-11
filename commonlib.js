(function(){
  var root, firstNonNull, getUrlParameters, setvar, getvar, getUserEvents, getCondition, getUserName, printcb, forcehttps, updatecookies, out$ = typeof exports != 'undefined' && exports || this, slice$ = [].slice;
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
    $.cookie(varname, varval);
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
    return 'Anonymous User';
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
    if (window.location.href.indexOf('http://feedlearn.herokuapp.com') === 0) {
      return window.location.href = window.location.href.split('http://feedlearn.herokuapp.com').join('https://feedlearn.herokuapp.com');
    }
  };
  out$.updatecookies = updatecookies = function(){
    var username;
    username = getUserName();
    return $.getJSON('/cookiesforuser?' + $.param({
      username: username
    }), function(cookies){
      var needrefresh, k, v, curv;
      if (cookies.username == null) {
        return;
      }
      if (cookies.username !== username) {
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
      if (needrefresh) {
        return window.location = window.location;
      }
    });
  };
}).call(this);
