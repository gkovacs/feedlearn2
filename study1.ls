root = exports ? this

{first-non-null, getUrlParameters, getvar, setvar} = root # commonlib.ls

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
  setvar 'fullname', root.fullname
  setvar 'scriptformat', 'show romanized only'
  setvar 'lang', 'japanese1'
  setvar 'format', 'link'
  $('#startweek1button').attr 'disabled', true

export start-week2 = ->
  setvar 'fullname', root.fullname
  setvar 'scriptformat', 'show romanized only'
  setvar 'lang', 'japanese2'
  setvar 'format', 'interactive'
  $('#startweek2button').attr 'disabled', true

export start-week3 = ->
  setvar 'fullname', root.fullname
  setvar 'scriptformat', 'show romanized only'
  setvar 'lang', 'japanese3'
  setvar 'format', 'none'
  $('#startweek3button').attr 'disabled', true

$(document).ready ->
  param = getUrlParameters()
  root.fullname = first-non-null param.fullname, param.username, param.user, param.name, getvar('fullname'), 'Anonymous User'
  $('#fullnamedisplay').text  ' ' + root.fullname
  addlog {type: 'study1visit'}
  #console.log 'study1'
