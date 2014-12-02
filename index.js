(function(){
  var root, J, findIndex, japanese1_vocabulary_text, chinese1_vocabulary_text, korean1_vocabulary_text, vietnamese1_vocabulary_text, parseVocab, flashcard_sets, language_names, flashcard_name_aliases, firstNonNull, setFlashcardSet, selectIdx, selectElem, selectNElem, selectNElemExceptElem, swapIdxInList, shuffleList, deepCopy, newQuestion, playSound, playSoundCurrentWord, questionWithWords, getUrlParameters, gotoNewQuizPage, gotoQuizPage, gotoOptionPage, gotoChatPage, changeLang, gotoPage, slice$ = [].slice, out$ = typeof exports != 'undefined' && exports || this;
  root = typeof exports != 'undefined' && exports !== null ? exports : this;
  J = $.jade;
  findIndex = require('prelude-ls').findIndex;
  japanese1_vocabulary_text = 'dog | inu\ncat | neko\nhorse | uma\nmouse | nezumi\nbird | tori\ncow | ushi\nfish | sakana\nman | otoko\nwoman | onna\nred | akai\nblue | aoi\ngreen | midori\nyellow | kiiro\npurple | murasaki\nuniversity | daigaku\nstudent | gakusei\nmorning | asa\nnight | yoru\nyesterday | kinō\ntoday | kyō\ntomorrow | ashita\nspring | haru\nsummer | natsu\nautumn | aki\nwinter | fuyu';
  chinese1_vocabulary_text = 'dog | gǒu\ncat | māo\nhorse | mǎ\nmouse | lǎoshǔ\nbird | niǎo\ncow | niú\nfish | yú\nman | nánrén\nwoman | nǚrén\nred | hóng sè\nblue | lán sè\ngreen | lǜ sè\nyellow | huáng sè\npurple | zǐ sè\nuniversity | dàxué\nstudent | xuéshēng\nmorning | zǎoshàng\nnight | yèwǎn\nyesterday | zuótiān\ntoday | jīntiān\ntomorrow | míngtiān\nspring | chūntiān\nsummer | xiàtiān\nautumn | qiūtiān\nwinter | dōngtiān';
  korean1_vocabulary_text = 'dog | gae\ncat | goyang-i\nhorse | mal\nmouse | jwi\nbird | sae\ncow | so\nfish | mulgogi\nman | namja\nwoman | yeoja\nred | ppalgansaeg\nblue | puleunsaeg\ngreen | nogsaeg\nyellow | hwangsaeg\npurple | bolasaeg\nuniversity | daehag\nstudent | hagsaeng\nmorning | achim\nnight | bam\nyesterday | eoje\ntoday | oneul\ntomorrow | naeil\nspring | bom\nsummer | yeoleum\nautumn | ga-eul\nwinter | gyeoul';
  vietnamese1_vocabulary_text = 'dog | chó\ncat | con mèo\nhorse | ngựa\nmouse | chuột\nbird | chim\ncow | bò\nfish | cá\nman | đàn ông\nwoman | đàn bà\nred | đỏ\nblue | xanh lam\ngreen | xanh lá cây\nyellow | vàng\npurple | màu đỏ tía\nuniversity | trường đại học\nstudent | sinh viên\nmorning | buổi sáng\nnight | đêm\nyesterday | hôm qua\ntoday | ngày nay\ntomorrow | ngày mai\nspring | mùa xuân\nsummer | mùa hè\nautumn | mùa thu\nwinter | mùa đông';
  parseVocab = function(vocab_text){
    var output, i$, ref$, len$, idx, line, ref1$, english, romaji;
    output = [];
    for (i$ = 0, len$ = (ref$ = vocab_text.split('\n')).length; i$ < len$; ++i$) {
      idx = i$;
      line = ref$[i$];
      line = line.trim();
      if (line.length > 0) {
        ref1$ = line.split('|'), english = ref1$[0], romaji = ref1$[1];
        english = english.trim();
        romaji = romaji.trim();
        output.push({
          english: english,
          romaji: romaji,
          idx: idx
        });
      }
    }
    return output;
  };
  flashcard_sets = {
    'japanese1': parseVocab(japanese1_vocabulary_text),
    'chinese1': parseVocab(chinese1_vocabulary_text),
    'korean1': parseVocab(korean1_vocabulary_text),
    'vietnamese1': parseVocab(vietnamese1_vocabulary_text)
  };
  language_names = {
    'japanese1': 'Japanese',
    'chinese1': 'Chinese',
    'korean1': 'Korean',
    'vietnamese1': 'Vietnamese'
  };
  flashcard_name_aliases = {
    'ja': 'japanese1',
    'japanese': 'japanese1',
    'zh': 'chinese1',
    'chn': 'chinese1',
    'chinese': 'chinese1',
    'ko': 'korean1',
    'korean': 'korean1',
    'vi': 'vietnamese1',
    'viet': 'vietnamese1',
    'vietnamese': 'vietnamese1'
  };
  firstNonNull = function(){
    var args, i$, len$, x;
    args = slice$.call(arguments);
    for (i$ = 0, len$ = args.length; i$ < len$; ++i$) {
      x = args[i$];
      if (x != null) {
        return x;
      }
    }
  };
  setFlashcardSet = function(new_flashcard_set){
    new_flashcard_set = firstNonNull(flashcard_name_aliases[new_flashcard_set.toLowerCase()], new_flashcard_set);
    if (new_flashcard_set !== $.cookie('lang')) {
      $.cookie('lang', new_flashcard_set);
    }
    root.current_flashcard_set = new_flashcard_set;
    root.current_language_name = language_names[new_flashcard_set];
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
    return questionWithWords(allwords, langname);
    function fn$(elem){
      elem.correct = false;
    }
  };
  out$.playSound = playSound = function(){
    $('audio')[0].pause();
    $('audio').attr('src', 'error.mp3');
    $('audio')[0].currentTime = 0;
    return $('audio')[0].play();
  };
  out$.playSoundCurrentWord = playSoundCurrentWord = function(){
    $('audio')[0].pause();
    $('audio').attr('src', 'error.mp3');
    $('audio')[0].currentTime = 0;
    return $('audio')[0].play();
  };
  questionWithWords = function(allwords, langname){
    var wordIdx, word, i$, len$, results$ = [];
    wordIdx = findIndex(function(it){
      return it.correct;
    }, allwords);
    word = allwords[wordIdx];
    if (langname === 'English') {
      $('#questionmessage').html("What does this word mean in " + current_language_name + ":");
      $('#questionword').html("<b>" + word.romaji + "</b>");
      $('#questionwordaudio').show();
    } else {
      $('#questionmessage').html("How would you say this in " + current_language_name + ":");
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
      optiondiv = J('button.btn.btn-default#option' + idx).css({
        width: optiondivwidth,
        'font-size': '20px'
      }).attr('type', 'button');
      worddiv = J('span#optionword' + idx);
      notediv = J('span#optionnote' + idx);
      optiondiv.append([worddiv, notediv]);
      if (langname === 'English') {
        worddiv.text(elem.english);
      } else {
        worddiv.text(elem.romaji);
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
          return playSound();
        }));
      }
      $('#answeroptions').append(outeroptiondiv);
      return optiondiv.click(function(){
        if (elem.correct) {
          return newQuestion();
        } else {
          if (langname === 'English') {
            return notediv.html(' = ' + '<b>' + elem.romaji + '</b>');
          } else {
            return notediv.html(' = ' + '<b>' + elem.english + '</b>');
          }
        }
      });
    }
  };
  getUrlParameters = root.getUrlParameters = function(){
    var url, hash, map, parts;
    url = window.location.href;
    hash = url.lastIndexOf('#');
    if (hash !== -1) {
      url = url.slice(0, hash);
    }
    map = {};
    parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value){
      return map[key] = decodeURI(value);
    });
    return map;
  };
  out$.gotoNewQuizPage = gotoNewQuizPage = function(){
    var param;
    $('.mainpage').hide();
    $('#quizpage').show();
    param = getUrlParameters();
    setFlashcardSet(firstNonNull(param.lang, param.language, param.quiz, param.lesson, param.flashcard, param.flashcardset, $.cookie('lang'), 'vietnamese1'));
    newQuestion();
  };
  out$.gotoQuizPage = gotoQuizPage = function(){
    $('.mainpage').hide();
    $('#quizpage').show();
  };
  out$.gotoOptionPage = gotoOptionPage = function(){
    $('.mainpage').hide();
    $('#optionpage').show();
    $('#langselect').val(root.current_language_name);
  };
  out$.gotoChatPage = gotoChatPage = function(){
    $('.mainpage').hide();
    $('#chatpage').show();
    $('#currentanswer').text(currentWord.romaji + ' = ' + currentWord.english);
  };
  out$.changeLang = changeLang = function(){
    var newlang;
    newlang = $('#langselect').val();
    setFlashcardSet(newlang);
    newQuestion();
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
  $(document).ready(function(){
    var param, targetpage;
    console.log('hello world!');
    param = getUrlParameters();
    targetpage = firstNonNull(param.page, 'quiz');
    if (targetpage === 'quiz') {
      return gotoNewQuizPage();
    } else {
      return gotoPage(targetpage);
    }
  });
}).call(this);
