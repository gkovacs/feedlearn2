(function(){
  var root, updatecookies, getvar, forcehttps, addlog, language_names, openfeedlearnlink, out$ = typeof exports != 'undefined' && exports || this;
  root = typeof exports != 'undefined' && exports !== null ? exports : this;
  updatecookies = root.updatecookies, getvar = root.getvar, forcehttps = root.forcehttps;
  addlog = root.addlog;
  language_names = root.language_names;
  out$.openfeedlearnlink = openfeedlearnlink = function(){
    addlog({
      type: 'linkopen',
      linkopen: 'link'
    });
    return window.open('/?webvisit=true&fromfeedlink=true');
  };
  $(document).ready(function(){
    var lang, langname;
    forcehttps();
    lang = getvar('lang');
    if (lang != null && language_names[lang] != null) {
      langname = language_names[lang];
      $('#previewdisplay').attr('src', 'preview-' + langname.toLowerCase() + '.png');
      return $('#langdisplay').text(langname);
    }
  });
}).call(this);
