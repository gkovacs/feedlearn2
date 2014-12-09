root = exports ? this

export consent-agreed = ->
  $('#collapseOne').collapse('hide')

export open-pretest1 = ->
  window.open('matching?vocab=japanese1')

$(document).ready ->
  console.log 'study1'
