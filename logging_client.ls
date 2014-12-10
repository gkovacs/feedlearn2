root = exports ? this

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

getvar = (varname) ->
  if localStorage?
    output = localStorage.getItem varname
    if output?
      return output
  return $.cookie varname

get-user-name = ->
  if root.fullname?
    return root.fullname
  root.fullname = getvar 'fullname'
  if root.fullname?
    return root.fullname
  return 'Anonymous User'

#get-format = ->
#

export addlog = (logdata) ->
  data = $.extend {}, logdata
  data.username = get-user-name()
  data.lang = getvar('lang')
  data.format = getvar('format')
  data.scriptformat = getvar('scriptformat')
  data.qcontext = root.qcontext
  data.time = Date.now()
  data.timeloc = new Date().toString()
  post-json '/addlog', data
