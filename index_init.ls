root = exports ? this

# console.log 'index_init.js loaded'

$(document).ready ->
  # console.log 'index_init.js'
  forcehttps()
  param = getUrlParameters()
  root.fullname = first-non-null param.fullname, param.username, param.user, param.name
  root.quizid = param.quizid ? randstr(25)
  if root.fullname?
    setvar 'fullname', root.fullname
    window.location = '/?' + $.param(exclude-param('fullname', 'username', 'user', 'name'))
    return
  fbname = getvar 'fbname'
  if fbname?
    setvar 'fbname', fbname
  fburl = getvar 'fburl'
  if fburl?
    setvar 'fburl', fburl
  root.fullname = first-non-null root.fullname, getvar('fullname'), getvar('username'), fbname
  #if not getvar('fullname')? and not getvar('username')
  #  window.location = '/study1'
  #  return
  if root.fullname? and root.fullname != 'Anonymous User' and root.fullname.length > 0
    setvar 'fullname', root.fullname
    have-full-name()
  else
    #dont-have-full-name()
    root.fullname = 'Anonymous User'
    have-full-name()

