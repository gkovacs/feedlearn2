root = exports ? this

{first-non-null, getUrlParameters, getvar, setvar, get-user-events, get-condition, forcehttps} = root # commonlib.ls
{post-json, post-start-event} = root # logging_client.ls

root.skip-prereqs = false

alert-prereqs = (plist) ->
  #if window.location.href == "http://localhost:5000/study1"
  #  return
  if root.skip-prereqs
    return true
  for x in plist
    if not root.completed-parts[x]?
      alert 'You need to complete the following section first: ' + x
      return false
  return true

export consent-agreed = ->
  $('#collapseOne').collapse('hide')
  #$('#collapseTwo').collapse('show')
  show-consent-agreed()
  post-start-event 'consentagreed'

export open-pretest1 = ->
  #if not alert-prereqs ['consentagreed']
  #  return
  window.open('matching?vocab=japanese1&type=pretest')

export open-posttest1 = ->
  if not alert-prereqs ['week1startstudy']
    return
  testtime = root.completed-parts['week1startstudy'] + 1000*3600*24*7
  if Date.now() < testtime
    alert 'Please wait until ' + new Date(testtime).toString() + ' to take this test'
    return
  window.open('matching?vocab=japanese1&type=posttest')

export open-pretest2 = ->
  if not alert-prereqs ['posttest1']
    return
  window.open('matching?vocab=japanese2&type=pretest')

export open-posttest2 = ->
  if not alert-prereqs ['week2startstudy']
    return
  testtime = root.completed-parts['week2startstudy'] + 1000*3600*24*7
  if Date.now() < testtime
    alert 'Please wait until ' + new Date(testtime).toString() + ' to take this test'
    return
  window.open('matching?vocab=japanese2&type=posttest')

export open-pretest3 = ->
  if not alert-prereqs ['posttest2']
    return
  window.open('matching?vocab=japanese3&type=pretest')

export open-posttest3 = ->
  if not alert-prereqs ['week3startstudy']
    return
  testtime = root.completed-parts['week3startstudy'] + 1000*3600*24*7
  if Date.now() < testtime
    alert 'Please wait until ' + new Date(testtime).toString() + ' to take this test'
    return
  window.open('matching?vocab=japanese3&type=posttest')

export install-chrome-extension = ->
  window.open('https://chrome.google.com/webstore/detail/feed-learn/ebmjdfhplinmlajmdcmhkikideknlgkf')

export start-week1 = ->
  if not alert-prereqs ['pretest1']
    return
  config-week1()
  $('#startweek1button').attr 'disabled', true
  post-start-event 'week1startstudy'

export config-week1 = ->
  setvar 'fullname', root.fullname
  setvar 'scriptformat', 'show romanized only'
  setvar 'lang', 'japanese1'
  #setvar 'format', 'link'
  setvar 'format', root.studyorder[0]

export start-week2 = ->
  if not alert-prereqs ['pretest2']
    return
  config-week2()
  $('#startweek2button').attr 'disabled', true
  post-start-event 'week2startstudy'

export config-week2 = ->
  setvar 'fullname', root.fullname
  setvar 'scriptformat', 'show romanized only'
  setvar 'lang', 'japanese2'
  #setvar 'format', 'interactive'
  setvar 'format', root.studyorder[1]

export start-week3 = ->
  if not alert-prereqs ['pretest3']
    return
  config-week3()
  $('#startweek3button').attr 'disabled', true
  post-start-event 'week3startstudy'

export config-week3 = ->
  setvar 'fullname', root.fullname
  setvar 'scriptformat', 'show romanized only'
  setvar 'lang', 'japanese3'
  #setvar 'format', 'none'
  setvar 'format', root.studyorder[2]

export config-week = (num) ->
  switch num
  | 1 => config-week1()
  | 2 => config-week2()
  | 3 => config-week3()

export full-name-submitted = ->
  newfullname = $('#fullnameinput').val().trim()
  if newfullname.length > 0
    root.fullname = newfullname
    have-full-name()

condition_to_order = [
  <[ interactive link none ]>
  <[ interactive none link ]>
  <[ link interactive none ]>
  <[ link none interactive ]>
  <[ none interactive link ]>
  <[ none link interactive ]>
]

set-week1-description = (format) ->
  desctext = switch format
  | 'interactive' => 'During the first week, you will be shown quizzes that you can interact with directly inside your Facebook feed, without leaving it.'
  | 'link' => 'During the first week, you will be shown notifications inside your feed asking you to visit the FeedLearn website.'
  | 'none' => 'During the first week, you will not be shown quizzes in your Facebook feeed, but will rather be sent a daily email reminder asking you to visit the website.'
  $('#week1desc').text desctext

set-week2-description = (format) ->
  desctext = switch format
  | 'interactive' => 'During the second week, you will be shown quizzes that you can interact with directly inside your Facebook feed, without leaving it.'
  | 'link' => 'During the second week, you will be shown notifications inside your feed asking you to visit the FeedLearn website.'
  | 'none' => 'During the second week, you will not be shown quizzes in your Facebook feed, but will rather be sent a daily email reminder asking you to visit the website.'
  $('#week2desc').text desctext

set-week3-description = (format) ->
  desctext = switch format
  | 'interactive' => 'During the third week, you will be shown quizzes that you can interact with directly inside your Facebook feed, without leaving it.'
  | 'link' => 'During the third week, you will be shown notifications inside your feed asking you to visit the FeedLearn website.'
  | 'none' => 'During the third week, you will not be shown quizzes in your Facebook feed, but will rather be sent a daily email reminder asking you to visit the website.'
  $('#week3desc').text desctext


set-studyorder = (studyorder) ->
  set-week1-description studyorder[0]
  set-week2-description studyorder[1]
  set-week3-description studyorder[2]
  return

show-pretest-done = (num, timestamp) ->
  if not timestamp?
    timestamp = Date.now()
  readable = new Date(timestamp).toString()
  $('#pretest' + num + 'check').css 'visibility', 'visible'
  #$('#pretest' + num + 'button').attr 'disabled', true
  $('#pretest' + num + 'donedisplay').css('color', 'green').text 'You submitted pre-test ' + num + ' on ' + readable

show-posttest-done = (num, timestamp) ->
  if not timestamp?
    timestamp = Date.now()
  readable = new Date(timestamp).toString()
  $('#posttest' + num + 'check').css 'visibility', 'visible'
  #$('#posttest' + num + 'button').attr 'disabled', true
  $('#posttest' + num + 'donedisplay').css('color', 'green').text 'You submitted post-test ' + num + ' on ' + readable

show-consent-agreed = (timestamp) ->
  if not timestamp?
    timestamp = Date.now()
  readable = new Date(timestamp).toString()
  $('#consentcheck').css 'visibility', 'visible'
  $('#consentbutton').attr 'disabled', true
  $('#consentdisplay').css('color', 'green').text 'You agreed to this on ' + readable

show-studyperiod-started = (num, timesamp) ->
  if not timestamp?
    timestamp = Date.now()
  readable = new Date(timestamp).toString()
  oneweeklater = new Date(timestamp + 1000*3600*24*7).toString()
  $('#startweek' + num + 'check').css 'visibility', 'visible'
  $('#startweek' + num + 'button').attr 'disabled', true
  message1 = $('<div>').text 'You started the week ' +  num + ' study period at ' + readable
  message2 = $('<div>').text 'Please return one week later to take post-test ' + num + ' at ' + oneweeklater
  $('#startweek' + num + 'donedisplay').attr('color', 'green').html $('<div>').append([message1, message2])

root.completed-parts = {}

refresh-completed-parts = ->
  num_events_prev = 0
  get-user-events (events) ->
    if Object.keys(events).length == num_events_prev
      return
    num_events_prev := Object.keys(events).length
    root.completed-parts = events
    if events.consentagreed?
      show-consent-agreed(events.consentagreed)
    for num in [1,2,3]
      if events['pretest' + num]?
        show-pretest-done(num, events['pretest' + num])
      if events['posttest' + num]?
        show-posttest-done(num, events['posttest' + num])
      if events['week' + num + 'startstudy']?
        show-studyperiod-started(num, events['week' + num + 'startstudy'])
    for num in [3,2,1]
      if events['week' + num + 'startstudy']?
        config-week(num)
        break

export have-full-name = ->
  setvar 'fullname', root.fullname
  $('#getfullname').hide()
  $('#accordion').show()
  $('#fullnamedisplay').text  ' ' + root.fullname
  addlog {type: 'study1visit'}
  get-condition (condition) ->
    root.condition = condition
    setvar 'condition', root.condition
    root.studyorder = condition_to_order[condition]
    set-studyorder root.studyorder
    refresh-completed-parts()
    setInterval ->
      refresh-completed-parts()
    , 2000

$(document).ready ->
  forcehttps()
  setvar 'hideoption', true
  param = getUrlParameters()
  root.fullname = first-non-null param.fullname, param.username, param.user, param.name
  if root.fullname?
    setvar 'fullname', root.fullname
    window.location.href = '/study1'
    return
  root.fullname = first-non-null root.fullname, getvar('fullname') #, 'Anonymous User'
  if root.fullname? and root.fullname != 'Anonymous User'
    have-full-name()
  else
    $('#fullnameinput').focus()

