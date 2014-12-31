root = exports ? this

{updatecookies, getvar, get-full-name} = root # commonlib.ls

$(document).ready ->
  forcehttps()
  target = 'https://stanforduniversity.qualtrics.com/SE/?SID=SV_6nCpYFc4aBE0Z81&' + $.param({
    fbname: getvar('fbname')
    fburl: getvar('fburl')
    fullname: get-user-name()
    condition: getvar('condition')
    lang: getvar('lang')
  })
  $('#surveyloc').attr('href', target)
  window.location.href = target
