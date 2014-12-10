(function(){
  var root, firstNonNull, getUrlParameters, getvar, setvar, getUserEvents, getCondition, postJson, postStartEvent, alertPrereqs, consentAgreed, openPretest1, openPosttest1, openPretest2, openPosttest2, openPretest3, openPosttest3, installChromeExtension, startWeek1, startWeek2, startWeek3, fullNameSubmitted, condition_to_order, setWeek1Description, setWeek2Description, setWeek3Description, setStudyorder, showPretestDone, showPosttestDone, showConsentAgreed, showStudyperiodStarted, refreshCompletedParts, haveFullName, out$ = typeof exports != 'undefined' && exports || this;
  root = typeof exports != 'undefined' && exports !== null ? exports : this;
  firstNonNull = root.firstNonNull, getUrlParameters = root.getUrlParameters, getvar = root.getvar, setvar = root.setvar, getUserEvents = root.getUserEvents, getCondition = root.getCondition;
  postJson = root.postJson, postStartEvent = root.postStartEvent;
  alertPrereqs = function(plist){
    var i$, len$, x;
    for (i$ = 0, len$ = plist.length; i$ < len$; ++i$) {
      x = plist[i$];
      if (root.completedParts[x] == null) {
        alert('You need to complete the following section first: ' + x);
        return false;
      }
    }
    return true;
  };
  out$.consentAgreed = consentAgreed = function(){
    $('#collapseOne').collapse('hide');
    showConsentAgreed();
    return postStartEvent('consentagreed');
  };
  out$.openPretest1 = openPretest1 = function(){
    return window.open('matching?vocab=japanese1&type=pretest');
  };
  out$.openPosttest1 = openPosttest1 = function(){
    if (!alertPrereqs(['week1startstudy'])) {
      return;
    }
    return window.open('matching?vocab=japanese1&type=posttest');
  };
  out$.openPretest2 = openPretest2 = function(){
    if (!alertPrereqs(['posttest1'])) {
      return;
    }
    return window.open('matching?vocab=japanese2&type=pretest');
  };
  out$.openPosttest2 = openPosttest2 = function(){
    if (!alertPrereqs(['week2startstudy'])) {
      return;
    }
    return window.open('matching?vocab=japanese2&type=posttest');
  };
  out$.openPretest3 = openPretest3 = function(){
    if (!alertPrereqs(['posttest2'])) {
      return;
    }
    return window.open('matching?vocab=japanese3&type=pretest');
  };
  out$.openPosttest3 = openPosttest3 = function(){
    if (!alertPrereqs(['week3startstudy'])) {
      return;
    }
    return window.open('matching?vocab=japanese3&type=posttest');
  };
  out$.installChromeExtension = installChromeExtension = function(){
    return window.open('https://chrome.google.com/webstore/detail/feed-learn/ebmjdfhplinmlajmdcmhkikideknlgkf');
  };
  out$.startWeek1 = startWeek1 = function(){
    if (!alertPrereqs(['pretest1'])) {
      return;
    }
    setvar('fullname', root.fullname);
    setvar('scriptformat', 'show romanized only');
    setvar('lang', 'japanese1');
    setvar('format', root.studyorder[0]);
    $('#startweek1button').attr('disabled', true);
    return postStartEvent('week1startstudy');
  };
  out$.startWeek2 = startWeek2 = function(){
    if (!alertPrereqs(['pretest2'])) {
      return;
    }
    setvar('fullname', root.fullname);
    setvar('scriptformat', 'show romanized only');
    setvar('lang', 'japanese2');
    setvar('format', root.studyorder[1]);
    $('#startweek2button').attr('disabled', true);
    return postStartEvent('week2startstudy');
  };
  out$.startWeek3 = startWeek3 = function(){
    if (!alertPrereqs(['pretest3'])) {
      return;
    }
    setvar('fullname', root.fullname);
    setvar('scriptformat', 'show romanized only');
    setvar('lang', 'japanese3');
    setvar('format', root.studyorder[2]);
    $('#startweek3button').attr('disabled', true);
    return postStartEvent('week3startstudy');
  };
  out$.fullNameSubmitted = fullNameSubmitted = function(){
    var newfullname;
    newfullname = $('#fullnameinput').val().trim();
    if (newfullname.length > 0) {
      root.fullname = newfullname;
      return haveFullName();
    }
  };
  condition_to_order = [['interactive', 'link', 'none'], ['interactive', 'none', 'link'], ['link', 'interactive', 'none'], ['link', 'none', 'interactive'], ['none', 'interactive', 'link'], ['none', 'link', 'interactive']];
  setWeek1Description = function(format){
    var desctext;
    desctext = (function(){
      switch (format) {
      case 'interactive':
        return 'During the first week, you will be shown quizzes that you can interact with directly inside your Facebook feed, without leaving it.';
      case 'link':
        return 'During the first week, you will be shown notifications inside your feed asking you to visit the FeedLearn website.';
      case 'none':
        return 'During the first week, you will not be shown quizzes in your Facebook feeed, but will rather be sent a daily email reminder asking you to visit the website.';
      }
    }());
    return $('#week1desc').text(desctext);
  };
  setWeek2Description = function(format){
    var desctext;
    desctext = (function(){
      switch (format) {
      case 'interactive':
        return 'During the second week, you will be shown quizzes that you can interact with directly inside your Facebook feed, without leaving it.';
      case 'link':
        return 'During the second week, you will be shown notifications inside your feed asking you to visit the FeedLearn website.';
      case 'none':
        return 'During the second week, you will not be shown quizzes in your Facebook feed, but will rather be sent a daily email reminder asking you to visit the website.';
      }
    }());
    return $('#week2desc').text(desctext);
  };
  setWeek3Description = function(format){
    var desctext;
    desctext = (function(){
      switch (format) {
      case 'interactive':
        return 'During the third week, you will be shown quizzes that you can interact with directly inside your Facebook feed, without leaving it.';
      case 'link':
        return 'During the third week, you will be shown notifications inside your feed asking you to visit the FeedLearn website.';
      case 'none':
        return 'During the third week, you will not be shown quizzes in your Facebook feed, but will rather be sent a daily email reminder asking you to visit the website.';
      }
    }());
    return $('#week3desc').text(desctext);
  };
  setStudyorder = function(studyorder){
    setWeek1Description(studyorder[0]);
    setWeek2Description(studyorder[1]);
    setWeek3Description(studyorder[2]);
  };
  showPretestDone = function(num, timestamp){
    var readable;
    if (timestamp == null) {
      timestamp = Date.now();
    }
    readable = new Date(timestamp).toString();
    $('#pretest' + num + 'check').css('visibility', 'visible');
    $('#pretest' + num + 'button').attr('disabled', true);
    return $('#pretest' + num + 'donedisplay').css('color', 'green').text('You submitted pre-test ' + num + ' on ' + readable);
  };
  showPosttestDone = function(num, timestamp){
    var readable;
    if (timestamp == null) {
      timestamp = Date.now();
    }
    readable = new Date(timestamp).toString();
    $('#posttest' + num + 'check').css('visibility', 'visible');
    $('#posttest' + num + 'button').attr('disabled', true);
    return $('#posttest' + num + 'donedisplay').css('color', 'green').text('You submitted post-test ' + num + ' on ' + readable);
  };
  showConsentAgreed = function(timestamp){
    var readable;
    if (timestamp == null) {
      timestamp = Date.now();
    }
    readable = new Date(timestamp).toString();
    $('#consentcheck').css('visibility', 'visible');
    $('#consentbutton').attr('disabled', true);
    return $('#consentdisplay').css('color', 'green').text('You agreed to this on ' + readable);
  };
  showStudyperiodStarted = function(num, timesamp){
    var timestamp, readable, oneweeklater, message1, message2;
    if (typeof timestamp == 'undefined' || timestamp === null) {
      timestamp = Date.now();
    }
    readable = new Date(timestamp).toString();
    oneweeklater = new Date(timestamp + 1000 * 3600 * 24 * 7).toString();
    $('#startweek' + num + 'check').css('visibility', 'visible');
    $('#startweek' + num + 'button').attr('disabled', true);
    message1 = $('<div>').text('You started the week ' + num + ' study period at ' + readable);
    message2 = $('<div>').text('Please return one week later at ' + oneweeklater + ' to take post-test ' + num);
    return $('#startweek' + num + 'donedisplay').attr('color', 'green').html($('<div>').append([message1, message2]));
  };
  root.completedParts = {};
  refreshCompletedParts = function(){
    var num_events_prev;
    num_events_prev = 0;
    return getUserEvents(function(events){
      var i$, ref$, len$, num, results$ = [];
      if (Object.keys(events).length === num_events_prev) {
        return;
      }
      num_events_prev = Object.keys(events).length;
      root.completedParts = events;
      if (events.consentagreed != null) {
        showConsentAgreed(events.consentagreed);
      }
      for (i$ = 0, len$ = (ref$ = [1, 2, 3]).length; i$ < len$; ++i$) {
        num = ref$[i$];
        if (events['pretest' + num] != null) {
          showPretestDone(num, events['pretest' + num]);
        }
        if (events['posttest' + num] != null) {
          showPosttestDone(num, events['posttest' + num]);
        }
        if (events['week' + num + 'startstudy'] != null) {
          results$.push(showStudyperiodStarted(num, events['week' + num + 'startstudy']));
        }
      }
      return results$;
    });
  };
  out$.haveFullName = haveFullName = function(){
    setvar('fullname', root.fullname);
    $('#getfullname').hide();
    $('#accordion').show();
    $('#fullnamedisplay').text(' ' + root.fullname);
    addlog({
      type: 'study1visit'
    });
    getCondition(function(condition){
      root.condition = condition;
      setvar('condition', root.condition);
      root.studyorder = condition_to_order[condition];
      return setStudyorder(root.studyorder);
    });
    refreshCompletedParts();
    return setInterval(function(){
      return refreshCompletedParts();
    }, 2000);
  };
  $(document).ready(function(){
    var param;
    setvar('hideoption', true);
    param = getUrlParameters();
    root.fullname = firstNonNull(param.fullname, param.username, param.user, param.name, getvar('fullname'));
    if (root.fullname != null && root.fullname !== 'Anonymous User') {
      return haveFullName();
    } else {
      return $('#fullnameinput').focus();
    }
  });
}).call(this);
