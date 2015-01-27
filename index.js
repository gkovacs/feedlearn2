(function(){
  var root, J, ref$, findIndex, minimumBy, firstNonNull, getUrlParameters, getvar, setvar, forcehttps, updatecookies, updatecookiesandevents, getFBAppId, getbaselang, addlog, addlogfblogin, flashcard_sets, language_names, language_codes, flashcard_name_aliases, values_over_1, values_over_1_exp, normalize_values_to_sum_to_1, saveSRS, saveKanjiSeen, word_wrong, word_correct, introducedwordAskAgainLater, introducedwordAlreadyKnow, introducedwordAddToStudyList, is_srs_correct, resetSRS, loadSrsWords, setFlashcardSet, selectIdx, selectElem, selectNElem, selectNElemExceptElem, to_wordinfo_list, selectOtherOptions, swapIdxInList, shuffleList, deepCopy, get_kanji_probabilities, select_kanji_from_srs, is_kanji_first_time, select_word_from_srs, introduceWord, newQuestion, refreshQuestion, playSound, playSoundCurrentWord, questionWithWords, gotoQuizPage, gotoOptionPage, gotoChatPage, changeLang, setInsertionFormat, changeFeedInsertionFormat, setFullName, changeFullName, setScriptFormat, changeScriptFormat, showAnswer, showAnswers, gotoPage, showControlpage, openfeedlearnlink, shallowCopy, excludeParam, getRequiredTest, openvocabtestlink, showRequiredTest, fbTryLoginManual, fbButtonOnlogin, showFbLoginPage, setVisitSource, haveFullName, injectFacebookTag, dontHaveFullName, fbTryLoginAutomatic, clearcookies, clearlocalstorage, clearcookiesandlocalstorage, out$ = typeof exports != 'undefined' && exports || this, slice$ = [].slice;
  root = typeof exports != 'undefined' && exports !== null ? exports : this;
  J = $.jade;
  ref$ = require('prelude-ls'), findIndex = ref$.findIndex, minimumBy = ref$.minimumBy;
  firstNonNull = root.firstNonNull, getUrlParameters = root.getUrlParameters, getvar = root.getvar, setvar = root.setvar, forcehttps = root.forcehttps, updatecookies = root.updatecookies, updatecookiesandevents = root.updatecookiesandevents, getFBAppId = root.getFBAppId, getbaselang = root.getbaselang;
  addlog = root.addlog, addlogfblogin = root.addlogfblogin;
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
  values_over_1_exp = function(dict){
    var output, k, v;
    output = {};
    for (k in dict) {
      v = dict[k];
      output[k] = Math.pow(2.0, Math.max(-v, -30));
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
  out$.saveSRS = saveSRS = function(){
    localStorage.setItem('srs_' + getvar('lang'), JSON.stringify(root.srs_words));
  };
  out$.saveKanjiSeen = saveKanjiSeen = function(kanji, options_list){
    var curtime, i$, len$, opt;
    curtime = Date.now();
    root.srs_words[kanji].seen = curtime;
    root.srs_words[kanji].optseen = curtime;
    if (options_list != null) {
      for (i$ = 0, len$ = options_list.length; i$ < len$; ++i$) {
        opt = options_list[i$];
        root.srs_words[opt].optseen = curtime;
      }
    }
    saveSRS();
  };
  out$.word_wrong = word_wrong = function(kanji){
    var curtime;
    curtime = Date.now();
    root.srs_words[kanji].practiced = curtime;
    root.srs_words[kanji].seen = curtime;
    root.srs_words[kanji].optseen = curtime;
    root.srs_words[kanji].level = 1;
    saveSRS();
  };
  out$.word_correct = word_correct = function(kanji){
    var curtime, curlevel;
    curtime = Date.now();
    curlevel = root.srs_words[kanji].level;
    if (!(curlevel != null && isFinite(curlevel))) {
      curlevel = 1;
    }
    root.srs_words[kanji].practiced = curtime;
    root.srs_words[kanji].seen = curtime;
    root.srs_words[kanji].optseen = curtime;
    root.srs_words[kanji].level = Math.max(2, curlevel + 1);
    saveSRS();
  };
  out$.introducedwordAskAgainLater = introducedwordAskAgainLater = function(){
    var kanji, curtime;
    kanji = root.currentWord.kanji;
    curtime = Date.now();
    root.srs_words[kanji].seen = curtime;
    root.srs_words[kanji].optseen = curtime;
    saveSRS();
    newQuestion();
    addlog({
      type: 'asklater',
      word: root.currentWord
    });
  };
  out$.introducedwordAlreadyKnow = introducedwordAlreadyKnow = function(){
    var kanji, curtime;
    kanji = root.currentWord.kanji;
    curtime = Date.now();
    root.srs_words[kanji].known = true;
    root.srs_words[kanji].seen = curtime;
    saveSRS();
    newQuestion();
  };
  out$.introducedwordAddToStudyList = introducedwordAddToStudyList = function(){
    var kanji, curtime;
    kanji = root.currentWord.kanji;
    curtime = Date.now();
    root.srs_words[kanji].seen = curtime;
    root.srs_words[kanji].level = 1;
    root.srs_words[kanji].studying = true;
    saveSRS();
    newQuestion();
  };
  is_srs_correct = function(srs_words){
    var i$, ref$, len$, wordinfo;
    for (i$ = 0, len$ = (ref$ = flashcard_sets[getvar('lang')]).length; i$ < len$; ++i$) {
      wordinfo = ref$[i$];
      if (srs_words[wordinfo.kanji] == null) {
        return false;
      }
    }
    return true;
  };
  out$.resetSRS = resetSRS = function(){
    var i$, ref$, len$, wordinfo;
    console.log('rebuildling srs_' + getvar('lang'));
    root.srs_words = {};
    for (i$ = 0, len$ = (ref$ = flashcard_sets[getvar('lang')]).length; i$ < len$; ++i$) {
      wordinfo = ref$[i$];
      root.srs_words[wordinfo.kanji] = {
        level: 0,
        practiced: 0,
        seen: 0,
        optseen: 0,
        known: false,
        studying: false
      };
    }
    saveSRS();
    localStorage.setItem('srsformat_' + getvar('lang'), 'memreflex_progressive_1');
  };
  loadSrsWords = function(){
    var stored_srs, e;
    if ((typeof localStorage != 'undefined' && localStorage !== null) && localStorage.getItem('srsformat_' + getvar('lang')) === 'memreflex_progressive_1') {
      stored_srs = localStorage.getItem('srs_' + getvar('lang'));
      if (stored_srs != null) {
        try {
          root.srs_words = JSON.parse(stored_srs);
          if (is_srs_correct(root.srs_words)) {
            console.log('srs_' + getvar('lang') + ' loaded successfully');
            return;
          }
          root.srs_words = null;
        } catch (e$) {
          e = e$;
          root.srs_words = null;
        }
      }
    }
    resetSRS();
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
      elem = selectElem(list);
      newidx = elem.idx;
      if (seenidx[newidx] == null) {
        seenidx[newidx] = true;
        output.push(elem);
      }
    }
    return output;
  };
  to_wordinfo_list = function(kanji_list){
    var kanji_to_wordinfo, i$, ref$, len$, elem, output, res$, x;
    kanji_to_wordinfo = {};
    for (i$ = 0, len$ = (ref$ = root.vocabulary).length; i$ < len$; ++i$) {
      elem = ref$[i$];
      kanji_to_wordinfo[elem.kanji] = elem;
    }
    res$ = [];
    for (i$ = 0, len$ = kanji_list.length; i$ < len$; ++i$) {
      x = kanji_list[i$];
      res$.push(kanji_to_wordinfo[x]);
    }
    output = res$;
    return output;
  };
  selectOtherOptions = function(elem){
    var output, seenkanji, allkanji, notknown_kanji, studying_kanji, pool_of_kanji, pool_of_kanji_hash, res$, i$, len$, k, ref$, x;
    output = [];
    seenkanji = {};
    seenkanji[elem.kanji] = true;
    allkanji = root.vocabulary.map(function(it){
      return it.kanji;
    });
    notknown_kanji = allkanji.filter(function(kanji){
      return !root.srs_words[kanji].known;
    });
    studying_kanji = notknown_kanji.filter(function(kanji){
      return root.srs_words[kanji].studying;
    });
    pool_of_kanji = studying_kanji;
    res$ = {};
    for (i$ = 0, len$ = pool_of_kanji.length; i$ < len$; ++i$) {
      k = pool_of_kanji[i$];
      res$[k] = true;
    }
    pool_of_kanji_hash = res$;
    for (i$ = 0, len$ = (ref$ = studying_kanji.concat(notknown_kanji, allkanji)).length; i$ < len$; ++i$) {
      x = ref$[i$];
      if (pool_of_kanji.length >= 10) {
        break;
      }
      if (pool_of_kanji_hash[x] != null) {
        continue;
      }
      pool_of_kanji_hash[x] = true;
      pool_of_kanji.push(x);
    }
    while (output.length < 3) {
      elem = selectElem(pool_of_kanji);
      if (seenkanji[elem] != null) {
        continue;
      }
      seenkanji[elem] = true;
      output.push(elem);
    }
    return to_wordinfo_list(output);
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
    return normalize_values_to_sum_to_1(values_over_1_exp(root.srs_words));
  };
  out$.select_kanji_from_srs = select_kanji_from_srs = function(){
    var curtime, allkanji, notknown_kanji, studying_kanji, overdue_kanji, newkanji, randidx;
    curtime = Date.now();
    allkanji = root.vocabulary.map(function(it){
      return it.kanji;
    });
    notknown_kanji = allkanji.filter(function(kanji){
      return !root.srs_words[kanji].known;
    });
    studying_kanji = notknown_kanji.filter(function(kanji){
      return root.srs_words[kanji].studying;
    });
    overdue_kanji = studying_kanji.filter(function(kanji){
      var ref$, level, practiced;
      ref$ = root.srs_words[kanji], level = ref$.level, practiced = ref$.practiced;
      if (level <= 0) {
        return false;
      }
      return curtime >= practiced + 1000 * Math.pow(5, level);
    });
    if (overdue_kanji.length > 0) {
      return minimumBy(function(kanji){
        return root.srs_words[kanji].seen;
      }, overdue_kanji);
    } else {
      newkanji = notknown_kanji.filter(function(kanji){
        var ref$, level, practiced;
        ref$ = root.srs_words[kanji], level = ref$.level, practiced = ref$.practiced;
        return level === 0;
      });
      if (newkanji.length > 0) {
        return minimumBy(function(kanji){
          return root.srs_words[kanji].seen;
        }, newkanji);
      } else {
        randidx = Math.floor(
        Math.random() * allkanji.length);
        return allkanji[randidx];
      }
    }
  };
  is_kanji_first_time = function(kanji){
    if (root.srs_words[kanji] == null) {
      console.log('srs.words[kanji] does not exist for ' + kanji);
      return true;
    }
    if (root.srs_words[kanji].level == null) {
      console.log('srs.words[kanji].level does not exist for ' + kanji);
      return true;
    }
    return root.srs_words[kanji].level === 0;
  };
  out$.select_word_from_srs = select_word_from_srs = function(){
    var kanji, wordinfo, i$, ref$, len$;
    kanji = select_kanji_from_srs();
    if (kanji == null) {
      console.log('did not find kanji from srs');
      wordinfo = selectElem(root.vocabulary);
      return {
        word: wordinfo,
        isfirsttime: is_kanji_first_time(wordinfo.kanji)
      };
    }
    for (i$ = 0, len$ = (ref$ = root.vocabulary).length; i$ < len$; ++i$) {
      wordinfo = ref$[i$];
      if (wordinfo.kanji === kanji) {
        return {
          word: wordinfo,
          isfirsttime: is_kanji_first_time(wordinfo.kanji)
        };
      }
    }
    console.log('selected kanji was not in vocabulary');
    wordinfo = selectElem(root.vocabulary);
    return {
      word: wordinfo,
      isfirsttime: is_kanji_first_time(wordinfo.kanji)
    };
  };
  out$.introduceWord = introduceWord = function(){
    var word;
    $('.mainpage').hide();
    $('#introducewordpage').show();
    word = root.currentWord;
    if (root.scriptformat === 'show romanized only' || word.romaji === word.kanji) {
      $('.introducedword').text(word.romaji);
    } else {
      $('.introducedword').text(word.romaji + ' (' + word.kanji + ')');
    }
    $('#introducedwordenglish').text(word.english);
    $('#introducedwordaudio').show();
    $('#answeroptions').html('');
    $('#answeroptions').append(J('button.btn.btn-default').css({
      width: '100%',
      'font-size': '20px'
    }).attr('type', 'button').text('Already know word'));
    $('#answeroptions').append(J('button.btn.btn-default').css({
      width: '100%',
      'font-size': '20px'
    }).attr('type', 'button').text('Add word to study list'));
  };
  out$.newQuestion = newQuestion = function(){
    var ref$, word, isfirsttime, otherwords, i$, len$, allwords, langname;
    ref$ = deepCopy(
    select_word_from_srs()), word = ref$.word, isfirsttime = ref$.isfirsttime;
    root.isfirsttime = isfirsttime;
    word.correct = true;
    root.currentWord = word;
    if (root.isfirsttime) {
      otherwords = [];
      saveKanjiSeen(word.kanji);
    } else {
      otherwords = deepCopy(
      selectOtherOptions(word));
      saveKanjiSeen(word.kanji, otherwords.map(function(it){
        return it.kanji;
      }));
    }
    for (i$ = 0, len$ = otherwords.length; i$ < len$; ++i$) {
      (fn$.call(this, otherwords[i$]));
    }
    allwords = shuffleList(
    [word].concat(otherwords));
    langname = selectElem(
    ['English', current_language_name]);
    root.curqAllwords = allwords;
    root.curqLangname = langname;
    if (root.isfirsttime) {
      addlog({
        type: 'introduceword',
        word: root.currentWord,
        qnum: root.qnum
      });
    } else {
      addlog({
        type: 'newquestion',
        questiontype: root.curqLangname,
        allwords: root.curqAllwords,
        word: root.currentWord,
        qnum: root.qnum
      });
    }
    root.qnum += 1;
    root.numtries = 0;
    root.showedanswers = false;
    return refreshQuestion();
    function fn$(elem){
      elem.correct = false;
    }
  };
  out$.refreshQuestion = refreshQuestion = function(){
    if (root.isfirsttime) {
      introduceWord();
      return;
    }
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
    $('.mainpage').hide();
    $('#quizpage').show();
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
    $('.mainpage').hide();
    $('#quizpage').show();
    if (true) {
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
      root.fullname = newfullname;
      setvar('fullname', newfullname);
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
  out$.showControlpage = showControlpage = function(){
    var lang, langname;
    $('.outermainpage').hide();
    $('#controlviewpage').show();
    lang = getvar('lang');
    langname = language_names[lang];
    if (lang != null && langname != null) {
      langname = language_names[lang];
      $('#previewdisplay').attr('src', 'preview-' + langname.toLowerCase() + '.png');
      return $('#langdisplay').text(langname);
    }
  };
  out$.openfeedlearnlink = openfeedlearnlink = function(){
    addlog({
      type: 'linkopen',
      linkopen: 'link'
    });
    return window.open('/?webvisit=true&fromfeedlink=true');
  };
  shallowCopy = function(dict){
    return $.extend({}, dict);
  };
  excludeParam = function(){
    var params, output, i$, len$, param;
    params = slice$.call(arguments);
    output = shallowCopy(getUrlParameters());
    for (i$ = 0, len$ = params.length; i$ < len$; ++i$) {
      param = params[i$];
      delete output[param];
    }
    return output;
  };
  out$.getRequiredTest = getRequiredTest = function(){
    var pretest1, pretest2, pretest3, posttest1, posttest2, posttest3, nowtime;
    pretest1 = getevent('pretest1');
    pretest2 = getevent('pretest2');
    pretest3 = getevent('pretest3');
    posttest1 = getevent('posttest1');
    posttest2 = getevent('posttest2');
    posttest3 = getevent('posttest3');
    nowtime = Date.now();
    if (pretest1 == null) {
      return 'pretest1';
    }
    if (pretest1 != null && posttest1 == null && nowtime > 1000 * 3600 * 24 * 7 + pretest1) {
      return 'posttest1';
    }
    if (posttest1 != null && pretest2 == null) {
      return 'pretest2';
    }
    if (pretest2 != null && posttest2 == null && nowtime > 1000 * 3600 * 24 * 7 + pretest2) {
      return 'posttest2';
    }
    if (posttest2 != null && pretest3 == null) {
      return 'pretest3';
    }
    if (pretest3 != null && posttest3 == null && nowtime > 1000 * 3600 * 24 * 7 + pretest3) {
      return 'posttest3';
    }
    return null;
  };
  out$.openvocabtestlink = openvocabtestlink = function(){
    return window.open(root.requiredTestLink);
  };
  showRequiredTest = function(requiredTest){
    var requiredTestType, requiredTestWeek;
    $('.outermainpage').hide();
    $('#requiredtestpage').show();
    root.requiredTest = requiredTest;
    requiredTestType = 'pretest';
    if (requiredTest.indexOf('posttest') === 0) {
      requiredTestType = 'posttest';
    }
    switch (requiredTestType) {
    case 'pretest':
      $('.requiredtesttype').text('Pre-Test');
      $('.posttestexplanation').hide();
      $('.pretestexplanation').show();
      break;
    case 'posttest':
      $('.requiredtesttype').text('Post-Test');
      $('.pretestexplanation').hide();
      $('.posttestexplanation').show();
    }
    requiredTestWeek = parseInt(
    requiredTest.split('pretest').join('').split('posttest').join(''));
    $('.requiredtestweek').text(requiredTestWeek);
    root.requiredTestLink = '/matching?' + $.param({
      vocab: getbaselang() + requiredTestWeek,
      type: requiredTestType,
      source: 'facebook'
    });
    return root.checkRequiredTestTaken = setInterval(function(){
      return updatecookiesandevents(function(){
        if (getRequiredTest() !== root.requiredTest) {
          return window.location = window.location;
        }
      });
    }, 1000);
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
  out$.fbButtonOnlogin = fbButtonOnlogin = function(){
    return fbTryLoginManual();
  };
  out$.showFbLoginPage = showFbLoginPage = function(){
    $('.outermainpage').hide();
    return $('#fbloginpage').show();
  };
  setVisitSource = function(){
    var param;
    param = getUrlParameters();
    if (param.email != null && param.email !== 'false' && param.email !== false) {
      root.visitsource = 'email';
    } else if (param.fromfeedlink != null && param.fromfeedlink !== 'false' && param.fromfeedlink !== false) {
      root.visitsource = 'feedlink';
    } else if (param.facebook != null && param.facebook !== 'false' && param.facebook !== false) {
      root.visitsource = 'feedembed';
    } else {
      root.visitsource = 'direct';
    }
  };
  haveFullName = function(){
    var param;
    $('.outermainpage').hide();
    $('#mainviewpage').show();
    param = getUrlParameters();
    root.openedtime = Date.now();
    return updatecookiesandevents(function(){
      var requiredTest, condition;
      setFlashcardSet(firstNonNull(param.lang, param.language, param.quiz, param.lesson, param.flashcard, param.flashcardset, getvar('lang'), getbaselang() + '1'));
      setInsertionFormat(firstNonNull(param.format, param.condition, getvar('format'), 'interactive'));
      setScriptFormat(firstNonNull(param.script, param.scriptformat, getvar('scriptformat'), 'show romanized only'));
      setVisitSource();
      requiredTest = getRequiredTest();
      if (requiredTest != null) {
        showRequiredTest(requiredTest);
        addlog({
          type: 'showrequiredtest',
          requiredtest: requiredTest
        });
        return;
      }
      if (param.facebook != null && param.facebook !== 'false' && param.facebook !== false) {
        root.qcontext = 'facebook';
        condition = getvar('format');
        addlog({
          type: 'feedinsert'
        });
        if (condition != null && condition === 'link') {
          showControlpage();
          return;
        }
      } else if (param.email != null && param.email !== 'false' && param.email !== false) {
        root.qcontext = 'emailvisit';
        addlog({
          type: 'emailvisit'
        });
      } else {
        root.qcontext = 'website';
        addlog({
          type: 'webvisit'
        });
      }
      gotoPage(firstNonNull(param.page, 'quiz'));
      return $(document).mousemove(function(){
        if (root.firstmousemove == null) {
          root.firstmousemove = true;
          return addlog({
            type: 'firstmousemove'
          });
        }
      });
    });
  };
  injectFacebookTag = function(){
    var e;
    e = document.createElement('script');
    e.async = true;
    e.src = '//connect.facebook.net/en_US/sdk.js';
    return document.getElementById('fb-root').appendChild(e);
  };
  dontHaveFullName = function(){
    return injectFacebookTag();
  };
  out$.fbTryLoginAutomatic = fbTryLoginAutomatic = function(){
    return FB.getLoginStatus(function(loginstatus){
      if (loginstatus.status !== 'connected') {
        showFbLoginPage();
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
  out$.clearcookies = clearcookies = function(){
    var i$, ref$, len$, k, results$ = [];
    for (i$ = 0, len$ = (ref$ = Object.keys($.cookie())).length; i$ < len$; ++i$) {
      k = ref$[i$];
      results$.push($.removeCookie(k));
    }
    return results$;
  };
  out$.clearlocalstorage = clearlocalstorage = function(){
    var i$, ref$, len$, k, results$ = [];
    for (i$ = 0, len$ = (ref$ = Object.keys(localStorage)).length; i$ < len$; ++i$) {
      k = ref$[i$];
      results$.push(localStorage.removeItem(k));
    }
    return results$;
  };
  out$.clearcookiesandlocalstorage = clearcookiesandlocalstorage = function(){
    clearcookies();
    return clearlocalstorage();
  };
  $(document).ready(function(){
    var param, ref$, fbname, fburl;
    forcehttps();
    param = getUrlParameters();
    root.fullname = firstNonNull(param.fullname, param.username, param.user, param.name);
    root.quizid = (ref$ = param.quizid) != null
      ? ref$
      : randstr(25);
    if (root.fullname != null) {
      setvar('fullname', root.fullname);
      window.location = '/?' + $.param(excludeParam('fullname', 'username', 'user', 'name'));
      return;
    }
    fbname = getvar('fbname');
    if (fbname != null) {
      setvar('fbname', fbname);
    }
    fburl = getvar('fburl');
    if (fburl != null) {
      setvar('fburl', fburl);
    }
    root.fullname = firstNonNull(root.fullname, getvar('fullname'), getvar('username'), fbname);
    if (root.fullname != null && root.fullname !== 'Anonymous User' && root.fullname.length > 0) {
      return haveFullName();
    } else {
      return dontHaveFullName();
    }
  });
}).call(this);
