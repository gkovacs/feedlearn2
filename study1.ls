root = exports ? this

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
  console.log 'configure the extension appropriately'

$(document).ready ->
  console.log 'study1'
