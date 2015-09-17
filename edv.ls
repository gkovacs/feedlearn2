add_interactive_iframe = (options) ->
  {resize_scale, orig_width, orig_height} = options
  new_iframe = $('<iframe>').prop({
    src: '/'
    frameborder: 0
  }).css({
    width: "100%"
    height: "100%"
  })
  container_div = $('<div>').css {
    width: "calc(100% / #{resize_scale})"
    height: "calc(100% / #{resize_scale})"
    transform: "scale(#{resize_scale},#{resize_scale})"
    'transform-origin': 'top left'
  }
  new_iframe.appendTo container_div
  container_div.appendTo $('#contents')


show_single_word = (word) ->
  {english, kanji, romaji} = word
  #$('<div>')

default_dimensions = {
  rectangular: {
    width: 500
    height: 300
  }
  small: {
    width: 200
    height: 90
  }
  banner: {
    width: 728
    height: 90
  }
}

get_scale_info = (size_type, width, height) ->
  orig_width = default_dimensions[size_type].width
  orig_height = default_dimensions[size_type].height
  resize_scale = Math.min(width / orig_width, height / orig_height)
  return resize_scale

get_size_type = (width, height) ->
  if width >= 300 and height >= 250
    return 'rectangular'
  if width >= 728 and height >= 90
    return 'banner'
  return 'small'
  #if width == 200 and height == 90
  #  return 'small'
  #return 'rectangular'

export scale_content = (scaleval) ->
  $('#contents').css {
    'transform': "scale(#{scaleval}, #{scaleval})"
    'transform-origin': 'top left'
  }

startPage = ->
  console.log 'startPage called!'
  params = getUrlParameters()
  setFlashcardSet(params.lang ? getvar('lang') ? 'japanese1')
  width = params.width
  height = params.height
  if width?
    width = parseFloat width
  if height?
    height = parseFloat height
  tagname = params.tag
  size_type = params.size_type
  if tagname? and not size_type?
    if tagname.indexOf('-edv') != -1
      size_type = tagname.split('-edv').join('')
  if size_type?
    width ?= default_dimensions[size_type].width
    height ?= default_dimensions[size_type].height
  else
    width ?= 500
    height ?= 300
    size_type = get_size_type(width, height)
  if params.size_type
    size_type = params.size_type
  scale_content(get_scale_info(size_type, width, height))
  tagname = size_type + '-edv'
  tag = $("<#{tagname}>")
  for k,v of params
    if k == 'tag'
      continue
    v = jsyaml.safeLoad(v)
    tag.prop k, v
  tag.appendTo '#contents'
  /*
  tagname = params.tag
  if params.activity?
    tagname = params.activity + '-activity'
  if params.thumbnail?
    tagname = params.thumbnail + '-thumbnail'
  if not tagname?
    tagname = 'side-scroll-feed'
  tag = $("<#{tagname}>")
  for k,v of params
    if k == 'tag'
      continue
    v = jsyaml.safeLoad(v)
    tag.prop k, v
  tag.appendTo '#contents'
  */

$(document).ready ->
  startPage()
  /*
  setFlashcardSet(getvar('lang'))
  {width,height} = getUrlParameters()
  console.log "provided width and height are: #{width} #{height}"
  if not width?
    width = 300
  if not height?
    height = 300
  orig_width = 500
  orig_height = 300
  resize_scale = Math.min(width / orig_width, height / orig_height)
  console.log resize_scale
  options = {
    width
    height
    orig_width
    orig_height
    resize_scale
  }
  if orig_width * resize_scale >= 200
    add_interactive_iframe options
    return
  #$('#contents').text "Sorry, your resolution is only #{width} by #{height}"
  word = vocabulary[0]
  show_single_word word
  */
