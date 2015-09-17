(function(){
  var add_interactive_iframe, show_single_word, default_dimensions, get_scale_info, get_size_type, scale_content, startPage, out$ = typeof exports != 'undefined' && exports || this;
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
  show_single_word = function(word){
    var english, kanji, romaji;
    return english = word.english, kanji = word.kanji, romaji = word.romaji, word;
  };
  default_dimensions = {
    rectangular: {
      width: 500,
      height: 300
    },
    small: {
      width: 200,
      height: 90
    },
    banner: {
      width: 728,
      height: 90
    }
  };
  get_scale_info = function(size_type, width, height){
    var orig_width, orig_height, resize_scale;
    orig_width = default_dimensions[size_type].width;
    orig_height = default_dimensions[size_type].height;
    resize_scale = Math.min(width / orig_width, height / orig_height);
    return resize_scale;
  };
  get_size_type = function(width, height){
    if (width >= 300 && height >= 250) {
      return 'rectangular';
    }
    if (width >= 728 && height >= 90) {
      return 'banner';
    }
    return 'small';
  };
  out$.scale_content = scale_content = function(scaleval){
    return $('#contents').css({
      'transform': "scale(" + scaleval + ", " + scaleval + ")",
      'transform-origin': 'top left'
    });
  };
  startPage = function(){
    var params, ref$, width, height, tagname, size_type, tag, k, v;
    console.log('startPage called!');
    params = getUrlParameters();
    setFlashcardSet((ref$ = params.lang) != null
      ? ref$
      : (ref$ = getvar('lang')) != null ? ref$ : 'japanese1');
    width = params.width;
    height = params.height;
    if (width != null) {
      width = parseFloat(width);
    }
    if (height != null) {
      height = parseFloat(height);
    }
    tagname = params.tag;
    size_type = params.size_type;
    if (tagname != null && size_type == null) {
      if (tagname.indexOf('-edv') !== -1) {
        size_type = tagname.split('-edv').join('');
      }
    }
    if (size_type != null) {
      width == null && (width = default_dimensions[size_type].width);
      height == null && (height = default_dimensions[size_type].height);
    } else {
      width == null && (width = 500);
      height == null && (height = 300);
      size_type = get_size_type(width, height);
    }
    if (params.size_type) {
      size_type = params.size_type;
    }
    scale_content(get_scale_info(size_type, width, height));
    tagname = size_type + '-edv';
    tag = $("<" + tagname + ">");
    for (k in params) {
      v = params[k];
      if (k === 'tag') {
        continue;
      }
      v = jsyaml.safeLoad(v);
      tag.prop(k, v);
    }
    return tag.appendTo('#contents');
  };
  $(document).ready(function(){
    return startPage();
  });
}).call(this);
