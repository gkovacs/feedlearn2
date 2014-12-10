root = exports ? this

export first-non-null = (...args) ->
  for x in args
    if x?
      return x

export getUrlParameters = ->
  url = window.location.href
  hash = url.lastIndexOf('#')
  if hash != -1
    url = url.slice(0, hash)
  map = {}
  parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m,key,value) ->
    map[key] = decodeURI(value)
  )
  return map

export setvar = (varname, varval) ->
  if localStorage?
    localStorage.setItem varname, varval
  $.cookie varname, varval
  return

export getvar = (varname) ->
  if localStorage?
    output = localStorage.getItem varname
    if output?
      return output
  return $.cookie varname

