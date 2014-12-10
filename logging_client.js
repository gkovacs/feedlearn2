(function(){
  var root, getvar, getUserName, postJson, postStartEvent, addlog, out$ = typeof exports != 'undefined' && exports || this;
  root = typeof exports != 'undefined' && exports !== null ? exports : this;
  getvar = root.getvar, getUserName = root.getUserName;
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
  out$.postStartEvent = postStartEvent = function(eventname){
    return postJson('/settimestampforuserevent', {
      username: getUserName(),
      eventname: eventname
    });
  };
  out$.addlog = addlog = function(logdata){
    var data;
    data = $.extend({}, logdata);
    data.username = getUserName();
    data.lang = getvar('lang');
    data.format = getvar('format');
    data.scriptformat = getvar('scriptformat');
    data.qcontext = root.qcontext;
    data.condition = getvar('condition');
    data.time = Date.now();
    data.timeloc = new Date().toString();
    return postJson('/addlog', data);
  };
}).call(this);
