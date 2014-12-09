(function(){
  var root, consentAgreed, openPretest1, openPosttest1, openPretest2, openPosttest2, openPretest3, openPosttest3, installChromeExtension, startWeek1, out$ = typeof exports != 'undefined' && exports || this;
  root = typeof exports != 'undefined' && exports !== null ? exports : this;
  out$.consentAgreed = consentAgreed = function(){
    $('#collapseOne').collapse('hide');
    return $('#collapseTwo').collapse('show');
  };
  out$.openPretest1 = openPretest1 = function(){
    return window.open('matching?vocab=japanese1&type=pretest');
  };
  out$.openPosttest1 = openPosttest1 = function(){
    return window.open('matching?vocab=japanese1&type=posttest');
  };
  out$.openPretest2 = openPretest2 = function(){
    return window.open('matching?vocab=japanese2&type=pretest');
  };
  out$.openPosttest2 = openPosttest2 = function(){
    return window.open('matching?vocab=japanese2&type=posttest');
  };
  out$.openPretest3 = openPretest3 = function(){
    return window.open('matching?vocab=japanese3&type=pretest');
  };
  out$.openPosttest3 = openPosttest3 = function(){
    return window.open('matching?vocab=japanese3&type=posttest');
  };
  out$.installChromeExtension = installChromeExtension = function(){
    return window.open('https://chrome.google.com/webstore/detail/feed-learn/ebmjdfhplinmlajmdcmhkikideknlgkf');
  };
  out$.startWeek1 = startWeek1 = function(){
    return console.log('configure the extension appropriately');
  };
  $(document).ready(function(){
    return console.log('study1');
  });
}).call(this);
