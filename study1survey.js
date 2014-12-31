(function(){
  var root, updatecookies, getvar, getFullName;
  root = typeof exports != 'undefined' && exports !== null ? exports : this;
  updatecookies = root.updatecookies, getvar = root.getvar, getFullName = root.getFullName;
  $(document).ready(function(){
    var target;
    forcehttps();
    target = 'https://stanforduniversity.qualtrics.com/SE/?SID=SV_6nCpYFc4aBE0Z81&' + $.param({
      fbname: getvar('fbname'),
      fburl: getvar('fburl'),
      fullname: getUserName(),
      condition: getvar('condition'),
      lang: getvar('lang')
    });
    $('#surveyloc').attr('href', target);
    return window.location.href = target;
  });
}).call(this);
