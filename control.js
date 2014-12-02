(function(){
  var root, openfeedlearnlink, language_names, out$ = typeof exports != 'undefined' && exports || this;
  root = typeof exports != 'undefined' && exports !== null ? exports : this;
  out$.openfeedlearnlink = openfeedlearnlink = function(){
    return window.open('https://feedlearn.herokuapp.com');
  };
  language_names = {
    'japanese1': 'Japanese',
    'chinese1': 'Chinese',
    'korean1': 'Korean',
    'vietnamese1': 'Vietnamese'
  };
  $(document).ready(function(){
    var lang, langname;
    lang = $.cookie('lang');
    if (lang != null && language_names[lang] != null) {
      langname = language_names[lang];
      $('#previewdisplay').attr('src', 'preview-' + langname.toLowerCase() + '.png');
      return $('#langdisplay').text(langname);
    }
  });
}).call(this);
