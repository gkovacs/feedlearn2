root = exports ? this

{updatecookies, getvar} = root # commonlib.ls
{addlog} = root # logging_client.ls
{language_names} = root # flashcards.ls

export openfeedlearnlink = ->
  addlog {type: 'linkopen', linkopen: 'link'}
  window.open('/?webvisit=true&fromfeedlink=true')

$(document).ready ->
  #updatecookies()
  lang = getvar('lang')
  if lang? and language_names[lang]?
    langname = language_names[lang]
    $('#previewdisplay').attr 'src', 'preview-' + langname.toLowerCase() + '.png'
    #$('#previewdisplay').css({
    #  width: \290px
    #  display: \table-cell
    #})
    $('#langdisplay').text langname
