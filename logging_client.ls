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

get-user-name = ->
  if root.fullname?
    return root.fullname
  else
    root.fullname = $.cookie('fullname')
    if root.fullname?
      return root.fullname
    else
      return 'Anonymous User'

#get-format = ->
#

export addlog = (logdata) ->
  data = $.extend {}, logdata
  data.fullname = get-user-name()
  data.lang = $.cookie('lang')
  data.format = $.cookie('format')
  data.scriptformat = $.cookie('scriptformat')
  data.time = Date.now()
  data.timeloc = new Date().toString()
  post-json '/addlog', data
