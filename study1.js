(function(){
  var root, firstNonNull, getUrlParameters, getvar, setvar, getUserEvents, getCondition, forcehttps, updatecookies, updatecookiesandevents, getFBAppId, postJson, postStartEvent, addlog, addlogfblogin, readableTestNames, alertPrereqs, consentAgreed, openPretest1, openPosttest1, openPretest2, openPosttest2, openPretest3, openPosttest3, chromeExtensionInstallFinished, installChromeExtension, startWeek1, configWeek1, startWeek2, configWeek2, startWeek3, configWeek3, configWeek, fullNameSubmitted, condition_to_order, interactiveDescription, linkDescription, noneDescription, getDescriptionForFormatAndWeek, setWeek1Description, setWeek2Description, setWeek3Description, setStudyorder, showPretestDone, showPosttestDone, showConsentAgreed, showStudyperiodStarted, openPartThatNeedsDoing, setupAccordionElem, preventAccordionCollapsing, refreshCompletedParts, showStudyFormatDescriptions, haveFullName, fbTryLoginAutomatic, fbTryLoginManual, injectFacebookTag, dontHaveFullName, fbButtonOnlogin, out$ = typeof exports != 'undefined' && exports || this;
  root = typeof exports != 'undefined' && exports !== null ? exports : this;
  firstNonNull = root.firstNonNull, getUrlParameters = root.getUrlParameters, getvar = root.getvar, setvar = root.setvar, getUserEvents = root.getUserEvents, getCondition = root.getCondition, forcehttps = root.forcehttps, updatecookies = root.updatecookies, updatecookiesandevents = root.updatecookiesandevents, getFBAppId = root.getFBAppId;
  postJson = root.postJson, postStartEvent = root.postStartEvent, addlog = root.addlog, addlogfblogin = root.addlogfblogin;
  root.skipPrereqs = false;
  readableTestNames = {
    pretest1: 'Pre-Test for Week 1',
    pretest2: 'Pre-Test for Week 2',
    pretest3: 'Pre-Test for Week 3',
    posttest1: 'Post-Test for Week 1',
    posttest2: 'Post-Test for Week 2',
    posttest3: 'Post-Test for Week 3'
  };
  alertPrereqs = function(plist){
    var i$, len$, x, testname;
    if (root.skipPrereqs) {
      return true;
    }
    for (i$ = 0, len$ = plist.length; i$ < len$; ++i$) {
      x = plist[i$];
      if (root.completedParts[x] == null) {
        testname = x;
        if (readableTestNames[x] != null) {
          testname = readableTestNames[x];
        }
        toastr.error('You need to take the following test first: ' + testname);
        return false;
      }
    }
    return true;
  };
  out$.consentAgreed = consentAgreed = function(){
    $('#collapseOne').data('allowcollapse', true);
    $('#collapseOne').collapse('hide');
    root.completedParts.consentagreed = Date.now();
    openPartThatNeedsDoing();
    showConsentAgreed();
    return postStartEvent('consentagreed');
  };
  out$.openPretest1 = openPretest1 = function(){
    return window.open('matching?vocab=japanese1&type=pretest');
  };
  out$.openPosttest1 = openPosttest1 = function(){
    var testtime;
    if (!alertPrereqs(['pretest1'])) {
      return;
    }
    testtime = root.completedParts['pretest1'] + 1000 * 3600 * 24 * 7;
    if (Date.now() < testtime) {
      toastr.error('Please wait until ' + moment(testtime).format('llll') + ' to take the post-test for week 1 vocabulary');
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
    var testtime;
    if (!alertPrereqs(['pretest2'])) {
      return;
    }
    testtime = root.completedParts['pretest2'] + 1000 * 3600 * 24 * 7;
    if (Date.now() < testtime) {
      toastr.error('Please wait until ' + moment(testtime).format('llll') + ' to take the post-test for week 2 vocabulary');
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
    var testtime;
    if (!alertPrereqs(['pretest3'])) {
      return;
    }
    testtime = root.completedParts['pretest3'] + 1000 * 3600 * 24 * 7;
    if (Date.now() < testtime) {
      toastr.error('Please wait until ' + moment(testtime).format('llll') + ' to take the post-test for week 3 vocabulary');
      return;
    }
    return window.open('matching?vocab=japanese3&type=posttest');
  };
  out$.chromeExtensionInstallFinished = chromeExtensionInstallFinished = function(){
    $('#extensioninstalledcheck').css('visibility', 'visible');
    $('#extensioninstalleddisplay').css('color', 'green').text('FeedLearn Chrome Extension has been installed!');
    $('#extensioninstallbutton').attr('disabled', true);
    $('#collapseThree').data('allowcollapse', true);
    $('#collapseThree').collapse('hide');
    return openPartThatNeedsDoing();
  };
  out$.installChromeExtension = installChromeExtension = function(){
    var url, successCallback;
    if ((typeof chrome != 'undefined' && chrome !== null) && chrome.webstore != null && chrome.webstore.install != null) {
      return chrome.webstore.install(url = 'https://chrome.google.com/webstore/detail/ebmjdfhplinmlajmdcmhkikideknlgkf', successCallback = chromeExtensionInstallFinished);
    } else {
      return window.open('https://chrome.google.com/webstore/detail/feed-learn/ebmjdfhplinmlajmdcmhkikideknlgkf');
    }
  };
  out$.startWeek1 = startWeek1 = function(){
    if (!alertPrereqs(['pretest1'])) {
      return;
    }
    configWeek1();
    $('#startweek1button').attr('disabled', true);
    return postStartEvent('week1startstudy');
  };
  out$.configWeek1 = configWeek1 = function(){
    setvar('fullname', root.fullname);
    setvar('scriptformat', 'show romanized only');
    setvar('lang', 'japanese1');
    return setvar('format', root.studyorder[0]);
  };
  out$.startWeek2 = startWeek2 = function(){
    if (!alertPrereqs(['pretest2'])) {
      return;
    }
    configWeek2();
    $('#startweek2button').attr('disabled', true);
    return postStartEvent('week2startstudy');
  };
  out$.configWeek2 = configWeek2 = function(){
    setvar('fullname', root.fullname);
    setvar('scriptformat', 'show romanized only');
    setvar('lang', 'japanese2');
    return setvar('format', root.studyorder[1]);
  };
  out$.startWeek3 = startWeek3 = function(){
    if (!alertPrereqs(['pretest3'])) {
      return;
    }
    configWeek3();
    $('#startweek3button').attr('disabled', true);
    return postStartEvent('week3startstudy');
  };
  out$.configWeek3 = configWeek3 = function(){
    setvar('fullname', root.fullname);
    setvar('scriptformat', 'show romanized only');
    setvar('lang', 'japanese3');
    return setvar('format', root.studyorder[2]);
  };
  out$.configWeek = configWeek = function(num){
    switch (num) {
    case 1:
      return configWeek1();
    case 2:
      return configWeek2();
    case 3:
      return configWeek3();
    }
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
  interactiveDescription = 'This week, you will be shown quizzes that you can interact with directly inside your Facebook feed, without leaving it.<br>\nIt should look like this:<br><br>\n\n<img src="feedlearn-screenshot.png" style="border-radius: 15px"></img>\n\n<div>\n<br><br>\n<a href="geza@cs.stanford.edu">Email me</a> if you have already finished the pre-test for this week\'s vocabulary, but you do not see the quizzes in your Facebook feed.<br>\n</div>';
  linkDescription = 'This week, you will be shown notifications inside your feed asking you to visit the FeedLearn website.<br>\nIt should look like this:<br><br>\n\n<img src="feedlearn-link-screenshot.png" style="border-radius: 15px"></img>\n\n<div>\n<br><br>\n<a href="geza@cs.stanford.edu">Email me</a> if you have already finished the pre-test for this week\'s vocabulary, but you do not see the links in your Facebook feed.\n</div>';
  noneDescription = 'This week, you will not be shown quizzes in your Facebook feed, but will rather be sent a daily email reminder asking you to visit the <a href="/?webvisit=true" target="_blank">FeedLearn website</a> to study.<br>\nThe email will come around 10AM each day (Pacific Time). Please do not mark it as spam.<br>\nIt should look like this:<br><br>\n\n<img src="feedlearn-email-screenshot.png" style="border-radius: 15px"></img>\n\n<div>\n<br><br>\n<a href="geza@cs.stanford.edu">Email me</a> if you have already finished the pre-test for this week\'s vocabulary, but you do not receive the daily email by the next day at 11AM.\n</div>';
  getDescriptionForFormatAndWeek = function(format, weeknum){
    var firstpart, formatDescription;
    firstpart = (function(){
      switch (weeknum) {
      case 0:
        return 'After you have completed the pretest, you will be studying the week 1 vocabulary as follows:';
      case 1:
        return 'After you have completed the pretest, you will be studying the week 2 vocabulary as follows:';
      case 2:
        return 'After you have completed the pretest, you will be studying the week 3 vocabulary as follows:';
      }
    }());
    formatDescription = (function(){
      switch (format) {
      case 'interactive':
        return interactiveDescription;
      case 'link':
        return linkDescription;
      case 'none':
        return noneDescription;
      }
    }());
    return $('<div>').append([$('<div>').text(firstpart), $('<div>').html(formatDescription)]);
  };
  setWeek1Description = function(format){
    var desctext;
    desctext = getDescriptionForFormatAndWeek(format, 0);
    return $('#week1desc').html(desctext);
  };
  setWeek2Description = function(format){
    var desctext;
    desctext = getDescriptionForFormatAndWeek(format, 1);
    return $('#week2desc').html(desctext);
  };
  setWeek3Description = function(format){
    var desctext;
    desctext = getDescriptionForFormatAndWeek(format, 2);
    return $('#week3desc').html(desctext);
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
    readable = moment(timestamp).format('llll');
    $('#pretest' + num + 'check').css('visibility', 'visible');
    $('#pretest' + num + 'button').attr('disabled', true);
    return $('#pretest' + num + 'donedisplay').css('color', 'green').text('You submitted pre-test ' + num + ' on ' + readable);
  };
  showPosttestDone = function(num, timestamp){
    var readable;
    if (timestamp == null) {
      timestamp = Date.now();
    }
    readable = moment(timestamp).format('llll');
    $('#posttest' + num + 'check').css('visibility', 'visible');
    $('#posttest' + num + 'button').attr('disabled', true);
    return $('#posttest' + num + 'donedisplay').css('color', 'green').text('You submitted post-test ' + num + ' on ' + readable);
  };
  showConsentAgreed = function(timestamp){
    var readable;
    if (timestamp == null) {
      timestamp = Date.now();
    }
    readable = moment(timestamp).format('llll');
    $('#consentcheck').css('visibility', 'visible');
    $('#consentbutton').attr('disabled', true);
    return $('#consentdisplay').css('color', 'green').text('You agreed to this on ' + readable);
  };
  showStudyperiodStarted = function(num, timesamp){
    var timestamp, readable, oneweeklater, message1, message2;
    if (typeof timestamp == 'undefined' || timestamp === null) {
      timestamp = Date.now();
    }
    readable = moment(timestamp).format('llll');
    oneweeklater = moment(timestamp + 1000 * 3600 * 24 * 7).format('llll');
    $('#startweek' + num + 'check').css('visibility', 'visible');
    $('#startweek' + num + 'button').attr('disabled', true);
    message1 = $('<div>').text('You started the week ' + num + ' study period at ' + readable);
    message2 = $('<div>').text('Please return one week later to take post-test ' + num + ' at ' + oneweeklater);
    return $('#startweek' + num + 'donedisplay').attr('color', 'green').html($('<div>').append([message1, message2]));
  };
  root.completedParts = {};
  openPartThatNeedsDoing = function(){
    var events;
    events = root.completedParts;
    if (events.consentagreed == null) {
      $('#collapseOne').data('allowcollapse', false);
      $('#collapseOne').collapse('show');
      return;
    }
    $('#collapseOne').data('allowcollapse', true);
    if ($('#extensioninstalledcheck').css('visibility') !== 'visible') {
      $('#collapseThree').data('allowcollapse', false);
      $('#collapseThree').collapse('show');
      return;
    }
    $('#collapseThree').data('allowcollapse', true);
    if (events.extensionfirstinstalled == null) {
      postStartEvent('extensionfirstinstalled');
    }
    if (events['posttest1'] == null) {
      $('#collapseTwo').data('allowcollapse', false);
      $('#collapseTwo').collapse('show');
      return;
    }
    $('#collapseTwo').data('allowcollapse', true);
    if (events['posttest2'] == null) {
      $('#collapseSix').data('allowcollapse', false);
      $('#collapseSix').collapse('show');
      return;
    }
    $('#collapseSix').data('allowcollapse', true);
    if (events['posttest3'] == null) {
      $('#collapseNine').data('allowcollapse', false);
      $('#collapseNine').collapse('show');
      return;
    }
    $('#collapseNine').data('allowcollapse', true);
  };
  setupAccordionElem = function(elemname){
    var elem;
    elem = $('#' + elemname);
    elem.data('allowcollapse', true);
    elem.on('hide.bs.collapse', function(){
      if (elem.data('allowcollapse')) {
        return true;
      } else {
        return false;
      }
    });
  };
  preventAccordionCollapsing = function(){
    setupAccordionElem('collapseOne');
    setupAccordionElem('collapseThree');
    setupAccordionElem('collapseTwo');
    setupAccordionElem('collapseSix');
    return setupAccordionElem('collapseNine');
  };
  root.is_first_time_fetching_events = true;
  refreshCompletedParts = function(){
    var num_events_prev;
    num_events_prev = -1;
    return getUserEvents(function(events){
      var have_new_events, k, v, i$, ref$, len$, num;
      have_new_events = root.is_first_time_fetching_events;
      for (k in events) {
        v = events[k];
        if (root.completedParts[k] == null) {
          root.completedParts[k] = v;
          have_new_events = true;
        }
      }
      if (!have_new_events) {
        return;
      }
      root.is_first_time_fetching_events = false;
      if (events.consentagreed != null) {
        showConsentAgreed(events.consentagreed);
      }
      for (i$ = 0, len$ = (ref$ = [1, 2, 3]).length; i$ < len$; ++i$) {
        num = ref$[i$];
        if (events['pretest' + num] != null) {
          showPretestDone(num, events['pretest' + num]);
          if (events['posttest' + num] != null) {
            $('#week' + num + 'posttesttime').text('You have already taken the post-test for week ' + num + ' vocabulary.');
          } else if (Date.now() > events['pretest' + num] + 1000 * 3600 * 24 * 7) {
            $('#week' + num + 'posttesttime').text('Please take the post-test for week ' + num + ' vocabulary now.');
          } else {
            $('#week' + num + 'posttesttime').text('Please revisit this page on ' + moment(events['pretest' + num] + 1000 * 3600 * 24 * 7).format('llll') + ' to take the post-test for week ' + num + ' vocabulary.');
          }
        }
        if (events['posttest' + num] != null) {
          showPosttestDone(num, events['posttest' + num]);
        }
      }
      for (i$ = 0, len$ = (ref$ = [3, 2, 1]).length; i$ < len$; ++i$) {
        num = ref$[i$];
        if (events['pretest' + num] != null) {
          configWeek(num);
          break;
        }
      }
      return openPartThatNeedsDoing();
    });
  };
  out$.showStudyFormatDescriptions = showStudyFormatDescriptions = function(){
    var studyformatdescriptions;
    studyformatdescriptions = {
      'interactive': 'you will be shown vocabulary quizzes directly in your feed',
      'link': 'you will be shown links in your feed asking you to go to the FeedLearn site to do the quizzes.',
      'none': 'you will be sent daily email reminders to study Japanese on the FeedLearn site.'
    };
    $('#week1format').text(studyformatdescriptions[root.studyorder[0]]);
    $('#week2format').text(studyformatdescriptions[root.studyorder[1]]);
    return $('#week3format').text(studyformatdescriptions[root.studyorder[2]]);
  };
  out$.haveFullName = haveFullName = function(){
    return updatecookiesandevents(function(){
      $('#getfullname').hide();
      $('#fbloginpage').hide();
      $('#accordion').show();
      $('#fullnamedisplay').text(' ' + root.fullname);
      addlog({
        type: 'study1visit'
      });
      return getCondition(function(condition){
        root.condition = condition;
        setvar('condition', root.condition);
        root.studyorder = condition_to_order[condition];
        setStudyorder(root.studyorder);
        showStudyFormatDescriptions();
        refreshCompletedParts();
        return setInterval(function(){
          return refreshCompletedParts();
        }, 2000);
      });
    });
  };
  /*
  fb-login-status-change-callback = (response) ->
    if response.status == 'connected'
  
    setvar 'fullname', response.name
    addlog {type: 'fblogin', logintype: 'automatic', fblogin: response}
    addlogfblogin {type: 'fblogin', logintype: 'automatic', fblogin: response}
    #window.location.href = '/study1'
    have-full-name()
  */
  out$.fbTryLoginAutomatic = fbTryLoginAutomatic = function(){
    return FB.getLoginStatus(function(loginstatus){
      if (loginstatus.status !== 'connected') {
        return;
      }
      return FB.api('/me', function(response){
        if (response.name != null) {
          setvar('fullname', response.name);
          addlog({
            type: 'fblogin',
            logintype: 'automatic',
            fblogin: response
          });
          addlogfblogin({
            type: 'fblogin',
            logintype: 'automatic',
            fblogin: response
          });
          return haveFullName();
        }
      });
    });
  };
  out$.fbTryLoginManual = fbTryLoginManual = function(){
    return FB.getLoginStatus(function(loginstatus){
      if (loginstatus.status !== 'connected') {
        return;
      }
      return FB.api('/me', function(response){
        if (response.name != null) {
          setvar('fullname', response.name);
          addlog({
            type: 'fblogin',
            logintype: 'manual',
            fblogin: response
          });
          addlogfblogin({
            type: 'fblogin',
            logintype: 'manual',
            fblogin: response
          });
          return haveFullName();
        }
      });
    });
  };
  window.fbAsyncInit = function(){
    var appid;
    console.log('fbAsyncInit called');
    appid = getFBAppId();
    FB.init({
      appId: appid,
      cookie: true,
      xfbml: true,
      version: 'v2.1'
    });
    return fbTryLoginAutomatic();
  };
  injectFacebookTag = function(){
    var e;
    console.log('inject-facebook-tag called');
    e = document.createElement('script');
    e.async = true;
    e.src = '//connect.facebook.net/en_US/sdk.js';
    return document.getElementById('fb-root').appendChild(e);
  };
  out$.dontHaveFullName = dontHaveFullName = function(){
    return injectFacebookTag();
  };
  out$.fbButtonOnlogin = fbButtonOnlogin = function(){
    return fbTryLoginManual();
  };
  $(document).ready(function(){
    var param;
    forcehttps();
    setvar('hideoption', true);
    param = getUrlParameters();
    root.fullname = firstNonNull(param.fullname, param.username, param.user, param.name);
    if (root.fullname != null) {
      setvar('fullname', root.fullname);
      window.location.href = '/study1';
      return;
    }
    if (window.chrome == null) {
      toastr.options = {
        showDuration: 0,
        hideDuration: 0,
        timeOut: 0,
        extendedTimeOut: 0
      };
      toastr.error('FeedLearn currently only supports the Google Chrome browser');
    }
    root.fullname = firstNonNull(root.fullname, getvar('fullname'), getvar('username'));
    preventAccordionCollapsing();
    if (root.fullname != null && root.fullname !== 'Anonymous User' && root.fullname.length > 0) {
      return haveFullName();
    } else {
      return dontHaveFullName();
    }
  });
}).call(this);
