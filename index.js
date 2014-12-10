(function(){
  var root, J, findIndex, firstNonNull, getUrlParameters, getvar, setvar, forcehttps, addlog, flashcard_sets, language_names, language_codes, flashcard_name_aliases, values_over_1, normalize_values_to_sum_to_1, word_wrong, word_correct, loadSrsWords, setFlashcardSet, selectIdx, selectElem, selectNElem, selectNElemExceptElem, swapIdxInList, shuffleList, deepCopy, get_kanji_probabilities, select_kanji_from_srs, select_word_from_srs, newQuestion, refreshQuestion, playSound, playSoundCurrentWord, questionWithWords, gotoQuizPage, gotoOptionPage, gotoChatPage, changeLang, setInsertionFormat, changeFeedInsertionFormat, setFullName, changeFullName, setScriptFormat, changeScriptFormat, showAnswer, showAnswers, gotoPage, out$ = typeof exports != 'undefined' && exports || this, slice$ = [].slice;
  root = typeof exports != 'undefined' && exports !== null ? exports : this;
  J = $.jade;
  findIndex = require('prelude-ls').findIndex;
  firstNonNull = root.firstNonNull, getUrlParameters = root.getUrlParameters, getvar = root.getvar, setvar = root.setvar, forcehttps = root.forcehttps;
  addlog = root.addlog;
  flashcard_sets = root.flashcard_sets, language_names = root.language_names, language_codes = root.language_codes, flashcard_name_aliases = root.flashcard_name_aliases;
  root.srs_words = null;
  values_over_1 = function(dict){
    var output, k, v;
    output = {};
    for (k in dict) {
      v = dict[k];
      output[k] = 1.0 / v;
    }
    return output;
  };
  normalize_values_to_sum_to_1 = function(dict){
    var output, current_sum, k, v;
    output = {};
    current_sum = 0;
    for (k in dict) {
      v = dict[k];
      current_sum += v;
    }
    if (current_sum === 0) {
      return;
    }
    for (k in dict) {
      v = dict[k];
      output[k] = v / current_sum;
    }
    return output;
  };
  out$.word_wrong = word_wrong = function(kanji){
    var curbucket;
    curbucket = root.srs_words[kanji];
    if (curbucket == null) {
      curbucket = 1;
    }
    root.srs_words[kanji] = Math.max(1, curbucket - 1);
    localStorage.setItem('srs_' + getvar('lang'), JSON.stringify(root.srs_words));
  };
  out$.word_correct = word_correct = function(kanji){
    var curbucket;
    curbucket = root.srs_words[kanji];
    if (curbucket == null) {
      curbucket = 1;
    }
    root.srs_words[kanji] = curbucket + 1;
    localStorage.setItem('srs_' + getvar('lang'), JSON.stringify(root.srs_words));
  };
  loadSrsWords = function(){
    var stored_srs, e, i$, ref$, len$, wordinfo;
    if (typeof localStorage != 'undefined' && localStorage !== null) {
      stored_srs = localStorage.getItem('srs_' + getvar('lang'));
      if (stored_srs != null) {
        try {
          root.srs_words = JSON.parse(stored_srs);
          return;
        } catch (e$) {
          e = e$;
          root.srs_words = null;
        }
      }
    }
    root.srs_words = {};
    for (i$ = 0, len$ = (ref$ = flashcard_sets[getvar('lang')]).length; i$ < len$; ++i$) {
      wordinfo = ref$[i$];
      root.srs_words[wordinfo.kanji] = 1;
    }
  };
  setFlashcardSet = function(new_flashcard_set){
    new_flashcard_set = firstNonNull(flashcard_name_aliases[new_flashcard_set.toLowerCase()], new_flashcard_set);
    if (new_flashcard_set !== getvar('lang')) {
      setvar('lang', new_flashcard_set);
    }
    root.current_flashcard_set = new_flashcard_set;
    root.current_language_name = language_names[new_flashcard_set];
    root.current_language_code = language_codes[current_language_name];
    root.vocabulary = flashcard_sets[new_flashcard_set];
    return loadSrsWords();
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
  get_kanji_probabilities = function(){
    return normalize_values_to_sum_to_1(values_over_1(root.srs_words));
  };
  out$.select_kanji_from_srs = select_kanji_from_srs = function(){
    var randval, cursum, k, ref$, v;
    randval = Math.random();
    cursum = 0;
    for (k in ref$ = get_kanji_probabilities()) {
      v = ref$[k];
      cursum += v;
      if (cursum >= randval) {
        return k;
      }
    }
    return k;
  };
  out$.select_word_from_srs = select_word_from_srs = function(){
    var kanji, i$, ref$, len$, wordinfo;
    kanji = select_kanji_from_srs();
    if (kanji == null) {
      console.log('did not find kanji from srs');
      return selectElem(root.vocabulary);
    }
    for (i$ = 0, len$ = (ref$ = root.vocabulary).length; i$ < len$; ++i$) {
      wordinfo = ref$[i$];
      if (wordinfo.kanji === kanji) {
        return wordinfo;
      }
    }
    console.log('selected kanji was not in vocabulary');
    return selectElem(root.vocabulary);
  };
  out$.newQuestion = newQuestion = function(){
    var word, otherwords, i$, len$, allwords, langname;
    word = deepCopy(
    select_word_from_srs());
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
          setTimeout(function(){
            return newQuestion();
          }, 1300);
          if (root.numtries === 0 && !root.showedanswers) {
            return word_correct(elem.kanji);
          } else {
            return word_wrong(elem.kanji);
          }
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
    hideoption = getvar('hideoption');
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
    $('#langselect').val(getvar('lang'));
    $('#formatselect').val(getvar('format'));
    $('#fullnameinput').val(getvar('fullname'));
    $('#scriptselect').val(getvar('scriptformat'));
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
      setvar('format', newformat);
    }
  };
  out$.changeFeedInsertionFormat = changeFeedInsertionFormat = function(){
    var newformat;
    newformat = $('#formatselect').val();
    setInsertionFormat(newformat);
  };
  out$.setFullName = setFullName = function(newfullname){
    if (newfullname != null && newfullname.length > 0) {
      setvar('fullname', newfullname);
      localStorage;
    }
  };
  out$.changeFullName = changeFullName = function(){
    var newfullname;
    newfullname = $('#fullnameinput').val();
    setFullName(newfullname);
  };
  out$.setScriptFormat = setScriptFormat = function(scriptformat){
    $('#scriptselect').val(scriptformat);
    setvar('scriptformat', scriptformat);
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
    forcehttps();
    param = getUrlParameters();
    setFlashcardSet(firstNonNull(param.lang, param.language, param.quiz, param.lesson, param.flashcard, param.flashcardset, getvar('lang'), 'chinese1'));
    setInsertionFormat(firstNonNull(param.format, param.condition, getvar('format'), 'interactive'));
    setFullName(firstNonNull(param.fullname, getvar('fullname'), 'Anonymous User'));
    setScriptFormat(firstNonNull(param.script, param.scriptformat, getvar('scriptformat'), 'show romanized only'));
    if (param.facebook != null && param.facebook !== 'false' && param.facebook !== false) {
      root.qcontext = 'facebook';
      condition = getvar('format');
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
