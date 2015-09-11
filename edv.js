(function(){
  var add_interactive_iframe;
  add_interactive_iframe = function(options){
    var resize_scale, orig_width, orig_height, new_iframe, container_div;
    resize_scale = options.resize_scale, orig_width = options.orig_width, orig_height = options.orig_height;
    new_iframe = $('<iframe>').prop({
      src: '/',
      frameborder: 0
    }).css({
      width: "100%",
      height: "100%"
    });
    container_div = $('<div>').css({
      width: "calc(100% / " + resize_scale + ")",
      height: "calc(100% / " + resize_scale + ")",
      transform: "scale(" + resize_scale + "," + resize_scale + ")",
      'transform-origin': 'top left'
    });
    new_iframe.appendTo(container_div);
    return container_div.appendTo($('#contents'));
  };
  $(document).ready(function(){
    var ref$, width, height, orig_width, orig_height, resize_scale, options;
    ref$ = getUrlParameters(), width = ref$.width, height = ref$.height;
    console.log("provided width and height are: " + width + " " + height);
    if (width == null) {
      width = 300;
    }
    if (height == null) {
      height = 300;
    }
    orig_width = 500;
    orig_height = 300;
    resize_scale = Math.min(width / orig_width, height / orig_height);
    console.log(resize_scale);
    options = {
      width: width,
      height: height,
      orig_width: orig_width,
      orig_height: orig_height,
      resize_scale: resize_scale
    };
    if (orig_width * resize_scale >= 200) {
      add_interactive_iframe(options);
      return;
    }
    return $('#contents').text("Sorry, your resolution is only " + width + " by " + height);
  });
}).call(this);
