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


$(document).ready ->
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
  $('#contents').text "Sorry, your resolution is only #{width} by #{height}"
