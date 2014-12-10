(function(){
  var root, postJson, getUserName, addlog, out$ = typeof exports != 'undefined' && exports || this;
  root = typeof exports != 'undefined' && exports !== null ? exports : this;
  out$.postJson = postJson = function(url, jsondata, callback){
    return $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify(jsondata),
      success: function(data){
        if (callback != null) {
          return callback(data);
        }
      },
      contentType: 'application/json'
    });
  };
  getUserName = function(){
    if (root.fullname != null) {
      return root.fullname;
    } else {
      root.fullname = $.cookie('fullname');
      if (root.fullname != null) {
        return root.fullname;
      } else {
        return 'Anonymous User';
      }
    }
  };
  out$.addlog = addlog = function(logdata){
    var data;
    data = $.extend({}, logdata);
    data.username = getUserName();
    data.lang = $.cookie('lang');
    data.format = $.cookie('format');
    data.scriptformat = $.cookie('scriptformat');
    data.qcontext = root.qcontext;
    data.time = Date.now();
    data.timeloc = new Date().toString();
    return postJson('/addlog', data);
  };
}).call(this);
