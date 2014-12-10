root = exports ? this

export openfeedlearnlink = ->
  addlog {type: 'linkopen', linkopen: 'link'}
  window.open('https://feedlearn.herokuapp.com')

language_names = {
  'japanese1': 'Japanese'
  'chinese1': 'Chinese'
  'korean1': 'Korean'
  'vietnamese1': 'Vietnamese'
}

$(document).ready ->
  lang = $.cookie('lang')
  if lang? and language_names[lang]?
    langname = language_names[lang]
    $('#previewdisplay').attr 'src', 'preview-' + langname.toLowerCase() + '.png'
    #$('#previewdisplay').css({
    #  width: \290px
    #  display: \table-cell
    #})
    $('#langdisplay').text langname
