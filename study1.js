(function(){
  var root, consentAgreed, openPretest1, out$ = typeof exports != 'undefined' && exports || this;
  root = typeof exports != 'undefined' && exports !== null ? exports : this;
  out$.consentAgreed = consentAgreed = function(){
    return $('#collapseOne').collapse('hide');
  };
  out$.openPretest1 = openPretest1 = function(){
    return window.open('matching?vocab=japanese1');
  };
  $(document).ready(function(){
    return console.log('study1');
  });
}).call(this);
