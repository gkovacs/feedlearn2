(function(){
  var root, postJson, getvar, getUserName, addlog, out$ = typeof exports != 'undefined' && exports || this;
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
  getvar = function(varname){
    var output;
    if (typeof localStorage != 'undefined' && localStorage !== null) {
      output = localStorage.getItem(varname);
      if (output != null) {
        return output;
      }
    }
    return $.cookie(varname);
  };
  getUserName = function(){
    if (root.fullname != null) {
      return root.fullname;
    }
    root.fullname = getvar('fullname');
    if (root.fullname != null) {
      return root.fullname;
    }
    return 'Anonymous User';
  };
  out$.addlog = addlog = function(logdata){
    var data;
    data = $.extend({}, logdata);
    data.username = getUserName();
    data.lang = getvar('lang');
    data.format = getvar('format');
    data.scriptformat = getvar('scriptformat');
    data.qcontext = root.qcontext;
    data.time = Date.now();
    data.timeloc = new Date().toString();
    return postJson('/addlog', data);
  };
}).call(this);
