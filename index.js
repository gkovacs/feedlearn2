(function(){
  var root, J, findIndex, firstNonNull, getUrlParameters, addlog, flashcard_sets, language_names, language_codes, flashcard_name_aliases, setFlashcardSet, selectIdx, selectElem, selectNElem, selectNElemExceptElem, swapIdxInList, shuffleList, deepCopy, newQuestion, refreshQuestion, playSound, playSoundCurrentWord, questionWithWords, gotoQuizPage, gotoOptionPage, gotoChatPage, changeLang, setInsertionFormat, changeFeedInsertionFormat, setFullName, changeFullName, setScriptFormat, changeScriptFormat, showAnswer, showAnswers, gotoPage, slice$ = [].slice, out$ = typeof exports != 'undefined' && exports || this;
  root = typeof exports != 'undefined' && exports !== null ? exports : this;
  J = $.jade;
  findIndex = require('prelude-ls').findIndex;
  firstNonNull = root.firstNonNull, getUrlParameters = root.getUrlParameters;
  addlog = root.addlog;
  flashcard_sets = root.flashcard_sets, language_names = root.language_names, language_codes = root.language_codes, flashcard_name_aliases = root.flashcard_name_aliases;
  setFlashcardSet = function(new_flashcard_set){
    new_flashcard_set = firstNonNull(flashcard_name_aliases[new_flashcard_set.toLowerCase()], new_flashcard_set);
    if (new_flashcard_set !== $.cookie('lang')) {
      $.cookie('lang', new_flashcard_set);
    }
    root.current_flashcard_set = new_flashcard_set;
    root.current_language_name = language_names[new_flashcard_set];
    root.current_language_code = language_codes[current_language_name];
    return root.vocabulary = flashcard_sets[new_flashcard_set];
  };
  selectIdx = function(list){
    return Math.floor(
    Math.random() * list.length);
  };
  selectElem = function(list){
    return list[selectIdx(list)];
  };
  selectNElem = function(list, n){
    var output, seenidx, newidx;
    output = [];
    seenidx = {};
    while (output.length < n) {
      newidx = selectIdx(list);
      if (seenidx[newidx] == null) {
        seenidx[newidx] = true;
        output.push(list[newidx]);
      }
    }
    return output;
  };
  selectNElemExceptElem = function(list, elem, n){
    var output, seenidx, newidx;
    output = [];
    seenidx = {};
    seenidx[elem.idx] = true;
    while (output.length < n) {
      newidx = selectIdx(list);
      if (seenidx[newidx] == null) {
        seenidx[newidx] = true;
        output.push(list[newidx]);
      }
    }
    return output;
  };
  swapIdxInList = function(list, idx1, idx2){
    var tmp;
    tmp = list[idx1];
    list[idx1] = list[idx2];
    list[idx2] = tmp;
  };
  shuffleList = function(origlist){
    var list, i$, ref$, len$, i, randidx;
    list = slice$.call(origlist, 0);
    for (i$ = 0, len$ = (ref$ = (fn$())).length; i$ < len$; ++i$) {
      i = ref$[i$];
      randidx = selectIdx(list);
      swapIdxInList(list, i, randidx);
    }
    return list;
    function fn$(){
      var i$, to$, results$ = [];
      for (i$ = 0, to$ = list.length; i$ < to$; ++i$) {
        results$.push(i$);
      }
      return results$;
    }
  };
  deepCopy = function(elem){
    return JSON.parse(
    JSON.stringify(
    elem));
  };
  root.currentWord = null;
  root.curqAllwords = null;
  root.curqLangname = null;
  root.qnum = 0;
  root.numtries = 0;
  out$.newQuestion = newQuestion = function(){
    var word, otherwords, i$, len$, allwords, langname;
    word = deepCopy(
    selectElem(root.vocabulary));
    word.correct = true;
    root.currentWord = word;
    otherwords = deepCopy(
    selectNElemExceptElem(root.vocabulary, word, 3));
    for (i$ = 0, len$ = otherwords.length; i$ < len$; ++i$) {
      (fn$.call(this, otherwords[i$]));
    }
    allwords = shuffleList(
    [word].concat(otherwords));
    langname = selectElem(
    ['English', current_language_name]);
    root.curqAllwords = allwords;
    root.curqLangname = langname;
    addlog({
      type: 'newquestion',
      questiontype: root.curqLangname,
      allwords: root.curqAllwords,
      word: root.currentWord,
      qnum: root.qnum
    });
    root.qnum += 1;
    root.numtries = 0;
    root.showedanswers = false;
    return refreshQuestion();
    function fn$(elem){
      elem.correct = false;
    }
  };
  out$.refreshQuestion = refreshQuestion = function(){
    $('#showanswersbutton').attr('disabled', false);
    return questionWithWords(root.curqAllwords, root.curqLangname);
  };
  out$.playSound = playSound = function(word){
    var srcurl;
    $('#speechsynth')[0].pause();
    srcurl = 'https://speechsynth.herokuapp.com/speechsynth?' + $.param({
      lang: root.current_language_code,
      word: word
    });
    $('#speechsynth').attr('src', srcurl);
    return $('#speechsynth')[0].play();
  };
  out$.playSoundCurrentWord = playSoundCurrentWord = function(){
    return playSound(root.currentWord.kanji);
  };
  questionWithWords = function(allwords, langname){
    var wordIdx, word, i$, len$, results$ = [];
    wordIdx = findIndex(function(it){
      return it.correct;
    }, allwords);
    word = allwords[wordIdx];
    if (langname === 'English') {
      $('#questionmessage').html("What does this word mean");
      if (root.scriptformat === 'show romanized only' || word.romaji === word.kanji) {
        $('#questionword').html("<b>" + word.romaji + "</b>");
      } else {
        $('#questionword').html("<b>" + word.romaji + " (" + word.kanji + ")</b>");
      }
      $('#questionwordaudio').show();
    } else {
      $('#questionmessage').html("How would you say this in " + current_language_name);
      $('#questionword').html("<b>" + word.english + "</b>");
      $('#questionwordaudio').hide();
    }
    $('#answeroptions').html('');
    for (i$ = 0, len$ = allwords.length; i$ < len$; ++i$) {
      results$.push((fn$.call(this, i$, allwords[i$])));
    }
    return results$;
    function fn$(idx, elem){
      var outeroptiondiv, optiondivwidth, optiondiv, worddiv, notediv;
      outeroptiondiv = J('div').css({
        width: '100%'
      });
      optiondivwidth = '100%';
      if (langname !== 'English') {
        optiondivwidth = 'calc(100% - 40px)';
      }
      optiondiv = J('button.btn.btn-default.answeroption#option' + idx).css({
        width: optiondivwidth,
        'font-size': '20px'
      }).attr('type', 'button');
      worddiv = J('span.answeroptionword#optionword' + idx);
      notediv = J('span.answeroptionnote#optionnote' + idx);
      optiondiv.append([worddiv, notediv]);
      if (langname === 'English') {
        worddiv.text(elem.english);
      } else if (root.scriptformat === 'show romanized only' || word.romaji === word.kanji) {
        worddiv.text(elem.romaji);
      } else {
        worddiv.text(elem.romaji + ' (' + elem.kanji + ')');
      }
      outeroptiondiv.append(optiondiv);
      if (langname !== 'English') {
        outeroptiondiv.append(J('div.glyphicon.glyphicon-volume-up').css({
          fontSize: '32px',
          paddingLeft: '5px',
          marginTop: '-10px',
          verticalAlign: 'middle',
          cursor: 'pointer',
          top: '5px'
        }).click(function(){
          return playSound(elem.kanji);
        }));
      }
      $('#answeroptions').append(outeroptiondiv);
      $('#option' + idx).data({
        wordinfo: elem,
        langname: langname,
        idx: idx
      });
      return optiondiv.click(function(){
        if (!(!elem.correct && optiondiv.data('showed'))) {
          addlog({
            type: 'answered',
            iscorrect: elem.correct,
            wordclicked: elem,
            questiontype: root.curqLangname,
            wordtested: word,
            allwords: allwords,
            qnum: root.qnum,
            numtries: root.numtries,
            showedanswers: root.showedanswers
          });
        }
        if (elem.correct) {
          optiondiv.removeClass('btn-default');
          optiondiv.addClass('btn-success');
          showAnswer(optiondiv);
          playSoundCurrentWord();
          return setTimeout(function(){
            return newQuestion();
          }, 1300);
        } else {
          if (!optiondiv.data('showed')) {
            showAnswer(optiondiv);
            return root.numtries += 1;
          }
        }
      });
    }
  };
  out$.gotoQuizPage = gotoQuizPage = function(){
    var hideoption;
    $('.mainpage').hide();
    $('#quizpage').show();
    hideoption = $.cookie('hideoption');
    if (hideoption != null && hideoption !== 'false' && hideoption !== false) {
      $('#optionbutton').hide();
      $('#showanswersbutton').css({
        marginRight: '0px',
        width: '100%'
      });
    }
    if (root.currentWord == null) {
      newQuestion();
    } else {
      refreshQuestion();
    }
  };
  out$.gotoOptionPage = gotoOptionPage = function(){
    $('.mainpage').hide();
    $('#optionpage').show();
    $('#langselect').val(root.current_flashcard_set);
    $('#formatselect').val($.cookie('format'));
    $('#fullnameinput').val($.cookie('fullname'));
    $('#scriptselect').val($.cookie('scriptformat'));
  };
  out$.gotoChatPage = gotoChatPage = function(){
    $('.mainpage').hide();
    $('#chatpage').show();
    $('#currentanswer').text(root.currentWord.romaji + ' = ' + root.currentWord.english);
  };
  out$.changeLang = changeLang = function(){
    var newlang;
    newlang = $('#langselect').val();
    setFlashcardSet(newlang);
    newQuestion();
  };
  out$.setInsertionFormat = setInsertionFormat = function(newformat){
    if (newformat === 'interactive' || newformat === 'link' || newformat === 'none') {
      $.cookie('format', newformat);
    }
  };
  out$.changeFeedInsertionFormat = changeFeedInsertionFormat = function(){
    var newformat;
    newformat = $('#formatselect').val();
    setInsertionFormat(newformat);
  };
  out$.setFullName = setFullName = function(newfullname){
    if (newfullname != null && newfullname.length > 0) {
      $.cookie('fullname', newfullname);
    }
  };
  out$.changeFullName = changeFullName = function(){
    var newfullname;
    newfullname = $('#fullnameinput').val();
    setFullName(newfullname);
  };
  out$.setScriptFormat = setScriptFormat = function(scriptformat){
    $('#scriptselect').val(scriptformat);
    $.cookie('scriptformat', scriptformat);
    root.scriptformat = scriptformat;
  };
  out$.changeScriptFormat = changeScriptFormat = function(){
    var scriptformat;
    scriptformat = $('#scriptselect').val();
    setScriptFormat(scriptformat);
  };
  showAnswer = function(optiondiv){
    var langname, elem, notediv;
    optiondiv.data('showed', true);
    langname = optiondiv.data('langname');
    elem = optiondiv.data('wordinfo');
    notediv = optiondiv.find('.answeroptionnote');
    if (langname === 'English') {
      notediv.html(' = ' + elem.romaji);
    } else {
      notediv.html(' = ' + elem.english);
    }
  };
  root.showedanswers = false;
  out$.showAnswers = showAnswers = function(){
    var i$, ref$, len$, option;
    $('#showanswersbutton').attr('disabled', true);
    for (i$ = 0, len$ = (ref$ = $('.answeroption')).length; i$ < len$; ++i$) {
      option = ref$[i$];
      showAnswer($(option));
    }
    root.showedanswers = true;
    addlog({
      type: 'showanswers',
      wordtested: root.currentWord,
      langname: root.curqLangname,
      allwords: root.curqAllwords,
      qnum: root.qnum,
      numtries: root.numtries
    });
  };
  gotoPage = function(page){
    switch (page) {
    case 'quiz':
      return gotoQuizPage();
    case 'option':
      return gotoOptionPage();
    case 'chat':
      return gotoChatPage();
    }
  };
  root.qcontext = null;
  $(document).ready(function(){
    var param, condition;
    param = getUrlParameters();
    setFlashcardSet(firstNonNull(param.lang, param.language, param.quiz, param.lesson, param.flashcard, param.flashcardset, $.cookie('lang'), 'chinese1'));
    setInsertionFormat(firstNonNull(param.format, param.condition, $.cookie('format'), 'interactive'));
    setFullName(firstNonNull(param.fullname, $.cookie('fullname'), 'Anonymous User'));
    setScriptFormat(firstNonNull(param.script, param.scriptformat, $.cookie('scriptformat'), 'show romanized only'));
    if (param.facebook != null && param.facebook !== 'false' && param.facebook !== false) {
      root.qcontext = 'facebook';
      condition = $.cookie('format');
      addlog({
        type: 'feedinsert'
      });
      if (condition != null && condition === 'link') {
        window.location = '/control';
        return;
      }
    } else {
      root.qcontext = 'website';
      addlog({
        type: 'webvisit'
      });
    }
    return gotoPage(firstNonNull(param.page, 'quiz'));
  });
}).call(this);
