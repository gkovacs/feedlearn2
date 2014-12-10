root = exports ? this

{first-non-null, getUrlParameters} = root # commonlib.ls

export consent-agreed = ->
  $('#collapseOne').collapse('hide')
  $('#collapseTwo').collapse('show')

export open-pretest1 = ->
  window.open('matching?vocab=japanese1&type=pretest')

export open-posttest1 = ->
  window.open('matching?vocab=japanese1&type=posttest')

export open-pretest2 = ->
  window.open('matching?vocab=japanese2&type=pretest')

export open-posttest2 = ->
  window.open('matching?vocab=japanese2&type=posttest')

export open-pretest3 = ->
  window.open('matching?vocab=japanese3&type=pretest')

export open-posttest3 = ->
  window.open('matching?vocab=japanese3&type=posttest')

export install-chrome-extension = ->
  window.open('https://chrome.google.com/webstore/detail/feed-learn/ebmjdfhplinmlajmdcmhkikideknlgkf')

export start-week1 = ->
  $.cookie 'fullname', root.fullname
  $.cookie 'scriptformat', 'show romanized only'
  $.cookie 'lang', 'japanese1'
  $.cookie 'format', 'link'
  $('#startweek1button').attr 'disabled', true

export start-week2 = ->
  $.cookie 'fullname', root.fullname
  $.cookie 'scriptformat', 'show romanized only'
  $.cookie 'lang', 'japanese2'
  $.cookie 'format', 'interactive'
  $('#startweek2button').attr 'disabled', true

export start-week3 = ->
  $.cookie 'fullname', root.fullname
  $.cookie 'scriptformat', 'show romanized only'
  $.cookie 'lang', 'japanese3'
  $.cookie 'format', 'none'
  $('#startweek3button').attr 'disabled', true

$(document).ready ->
  param = getUrlParameters()
  root.fullname = first-non-null param.fullname, param.username, param.user, param.name, $.cookie('fullname'), 'Anonymous User'
  $('#fullnamedisplay').text  ' ' + root.fullname
  #console.log 'study1'
