(function(){
  var root;
  root = typeof exports != 'undefined' && exports !== null ? exports : this;
  $(document).ready(function(){
    var param, ref$, fbname, fburl;
    forcehttps();
    param = getUrlParameters();
    root.fullname = firstNonNull(param.fullname, param.username, param.user, param.name);
    root.quizid = (ref$ = param.quizid) != null
      ? ref$
      : randstr(25);
    if (root.fullname != null) {
      setvar('fullname', root.fullname);
      window.location = '/?' + $.param(excludeParam('fullname', 'username', 'user', 'name'));
      return;
    }
    fbname = getvar('fbname');
    if (fbname != null) {
      setvar('fbname', fbname);
    }
    fburl = getvar('fburl');
    if (fburl != null) {
      setvar('fburl', fburl);
    }
    root.fullname = firstNonNull(root.fullname, getvar('fullname'), getvar('username'), fbname);
    if (root.fullname != null && root.fullname !== 'Anonymous User' && root.fullname.length > 0) {
      setvar('fullname', root.fullname);
      return haveFullName();
    } else {
      root.fullname = 'Anonymous User';
      return haveFullName();
    }
  });
}).call(this);
