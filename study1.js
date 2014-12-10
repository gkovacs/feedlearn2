(function(){
  var root, firstNonNull, getUrlParameters, consentAgreed, openPretest1, openPosttest1, openPretest2, openPosttest2, openPretest3, openPosttest3, installChromeExtension, startWeek1, startWeek2, startWeek3, out$ = typeof exports != 'undefined' && exports || this;
  root = typeof exports != 'undefined' && exports !== null ? exports : this;
  firstNonNull = root.firstNonNull, getUrlParameters = root.getUrlParameters;
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
    $.cookie('fullname', root.fullname);
    $.cookie('scriptformat', 'show romanized only');
    $.cookie('lang', 'japanese1');
    $.cookie('format', 'link');
    return $('#startweek1button').attr('disabled', true);
  };
  out$.startWeek2 = startWeek2 = function(){
    $.cookie('fullname', root.fullname);
    $.cookie('scriptformat', 'show romanized only');
    $.cookie('lang', 'japanese2');
    $.cookie('format', 'interactive');
    return $('#startweek2button').attr('disabled', true);
  };
  out$.startWeek3 = startWeek3 = function(){
    $.cookie('fullname', root.fullname);
    $.cookie('scriptformat', 'show romanized only');
    $.cookie('lang', 'japanese3');
    $.cookie('format', 'none');
    return $('#startweek3button').attr('disabled', true);
  };
  $(document).ready(function(){
    var param;
    param = getUrlParameters();
    root.fullname = firstNonNull(param.fullname, param.username, param.user, param.name, $.cookie('fullname'), 'Anonymous User');
    $('#fullnamedisplay').text(' ' + root.fullname);
    return addlog({
      type: 'study1visit'
    });
  });
}).call(this);