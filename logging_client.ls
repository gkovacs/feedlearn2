root = exports ? this

{getvar, get-user-name} = root # commonlib.ls

export post-json = (url, jsondata, callback) ->
  $.ajax {
    type: 'POST'
    url: url
    data: JSON.stringify(jsondata)
    success: (data) ->
      if callback?
        callback data
      #else
      #  console.log data
    contentType: 'application/json'
    #dataType: 'json'
  }

export post-start-event = (eventname) ->
  post-json '/settimestampforuserevent', {username: get-user-name(), eventname: eventname}

mklogdata = (logdata) ->
  data = $.extend {}, logdata
  data.username = get-user-name()
  data.lang = getvar('lang')
  data.format = getvar('format')
  data.scriptformat = getvar('scriptformat')
  data.condition = getvar('condition')
  data.fbname = getvar('fbname')
  data.fburl = getvar('fburl')
  if root.qcontext?
    data.qcontext = root.qcontext
  if root.quizid?
    data.quizid = root.quizid
  if root.visitsource?
    data.visitsource = root.visitsource
  if root.openedtime?
    data.openedtime = root.openedtime
  data.time = Date.now()
  data.timeloc = new Date().toString()
  return data

export addlog = (logdata) ->
  data = mklogdata logdata
  post-json '/addlog', data

export addlogfblogin = (logdata) ->
  data = mklogdata logdata
  post-json '/addlogfblogin', data

export addlogquiz = (logdata) ->
  data = mklogdata logdata
  post-json '/addlogquiz', data
