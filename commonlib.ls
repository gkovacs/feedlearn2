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
  $.cookie varname, varval, {expires: 365, path: '/'}
  return

export getvar = (varname) ->
  if localStorage?
    output = localStorage.getItem varname
    if output?
      return output
  return $.cookie varname

export getevent = (varname) ->
  strval = getvar varname
  if not strval?
    return null
  try
    parsedval = parseInt strval
    return parsedval if isFinite(parsedval)
    return null
  catch error
    return null

export get-user-events = (callback) ->
  $.get '/getuserevents?' + $.param({username: get-user-name()}), (events) ->
    callback <| JSON.parse events

export get-condition = (callback) ->
  $.get '/conditionforuser?' + $.param({username: get-user-name()}), (condition) ->
    callback <| parseInt condition

export get-user-name = ->
  #if root.fullname?
  #  return root.fullname
  root.fullname = getvar 'fullname'
  if root.fullname?
    return root.fullname
  root.fullname = getvar 'username'
  if root.fullname?
    return root.fullname
  root.fullname = getvar 'fbname'
  if root.fullname?
    return root.fullname
  return 'Anonymous User'

export printcb = (...args) ->
  for x in args
    console.log x

export forcehttps = ->
  #if window.location.href.startsWith('http://feedlearn.herokuapp.com')
  if window.location.href.indexOf('http://') == 0
    if window.location.href.indexOf('http://localhost:5000') == 0
      window.location.href = window.location.href.split('http://localhost:5000').join('https://localhost:5001')
    else
      window.location.href = window.location.href.split('http://').join('https://')

export updatecookies = (callback) ->
  username = get-user-name()
  if not username? or username == 'Anonymous User' or username.length == 0
    callback() if callback?
    return
  $.getJSON ('/cookiesforuser?' + $.param({username: username})), (cookies) ->
    #console.log cookies
    if not cookies.username?
      callback() if callback?
      return
    if cookies.username != username
      callback() if callback?
      return
    needrefresh = false
    for k,v of cookies
      #console.log k
      #console.log v
      if k == 'username'
        continue
      if not v?
        continue
      curv = getvar(k)
      if (not curv?) or v.toString() != curv.toString()
        needrefresh = true
        setvar k, v
    #if needrefresh
    #  window.location = window.location
    callback() if callback?

export updatecookiesandevents = (callback) ->
  username = get-user-name()
  if not username? or username == 'Anonymous User' or username.length == 0
    callback() if callback?
    return
  $.getJSON ('/getusereventsandcookies?' + $.param({username: username})), (cookies) ->
    #console.log cookies
    if not cookies.username?
      callback() if callback?
      return
    if cookies.username != username
      callback() if callback?
      return
    needrefresh = false
    for k,v of cookies
      #console.log k
      #console.log v
      if k == 'username'
        continue
      if not v?
        continue
      curv = getvar(k)
      if (not curv?) or v.toString() != curv.toString()
        needrefresh = true
        setvar k, v
    #if needrefresh
    #  window.location = window.location
    callback() if callback?

export getFBAppId = ->
  appid = '1582092298679557'
  if window.location.href.indexOf('https://feedlearn2.herokuapp.com') == 0
    appid = '718471924927544'
  if window.location.href.indexOf('http://localhost') == 0
    appid = '1582095062012614'
  return appid

export getbaselang = ->
  return getvar('baselang') ? 'japanese'
