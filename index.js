(function(){
  var root, J, findIndex, parseVocab, japanese_all_vocabulary_text, chinese1_vocabulary_text, korean1_vocabulary_text, vietnamese1_vocabulary_text, japanese_vocab_all, flashcard_sets, language_names, flashcard_name_aliases, firstNonNull, setFlashcardSet, selectIdx, selectElem, selectNElem, selectNElemExceptElem, swapIdxInList, shuffleList, deepCopy, newQuestion, playSound, playSoundCurrentWord, questionWithWords, getUrlParameters, gotoQuizPage, gotoOptionPage, gotoChatPage, changeLang, setInsertionFormat, changeFeedInsertionFormat, setFullName, changeFullName, showAnswer, showAnswers, gotoPage, slice$ = [].slice, out$ = typeof exports != 'undefined' && exports || this;
  root = typeof exports != 'undefined' && exports !== null ? exports : this;
  J = $.jade;
  findIndex = require('prelude-ls').findIndex;
  parseVocab = function(){
    var vocab_text_list, output, i$, len$, vocab_text, j$, ref$, len1$, idx, line, ref1$, english, romaji;
    vocab_text_list = slice$.call(arguments);
    output = [];
    for (i$ = 0, len$ = vocab_text_list.length; i$ < len$; ++i$) {
      vocab_text = vocab_text_list[i$];
      for (j$ = 0, len1$ = (ref$ = vocab_text.split('\n')).length; j$ < len1$; ++j$) {
        idx = j$;
        line = ref$[j$];
        line = line.trim();
        if (line.length > 0 && line[0] !== '#') {
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
    }
    return output;
  };
  /*
  japanese1_vocabulary_text = '''
  dog | inu
  cat | neko
  horse | uma
  mouse | nezumi
  bird | tori
  cow | ushi
  fish | sakana
  man | otoko
  woman | onna
  red | akai
  blue | aoi
  green | midori
  yellow | kiiro
  purple | murasaki
  university | daigaku
  student | gakusei
  morning | asa
  night | yoru
  yesterday | kinō
  today | kyō
  tomorrow | ashita
  spring | haru
  summer | natsu
  autumn | aki
  winter | fuyu
  '''
  */
  japanese_all_vocabulary_text = '# people\n\nperson | hito\nman | otoko\nwoman | onna\nchildren | kodomo\nfamily | kazoku\n# I, myself | watashi\n# girl | shōjo\n# boy | shōnen\n\n# occupations\n\ndoctor | isha\nnurse | kangoshi\ndentist | shikai\npolitician | seijika\nlawyer | bengoshi\nfirefighter | shōbōshi\nsoldier | heishi\narchitect | kenchikuka\nteacher | sensei\nsinger | kashu\n\n# body\n\nfoot | ashita\nhead | atama\nface | kao\nmouth | kuchi\nlips | kuchibiru\nhair | kami\near | mimi\narm | ude\nfinger | yubi\nneck | kubi\nheart | shinzō\nchest | mune\nillness | byōki\n\n# family\n\nparents | oya\nfather | chichi\nmother | haha\nwife | tsuma\nhusband | otto\n# older brother | ani\n# older sister | ane\nyounger brother | otōto\nyounger sister | imōto\n# siblings | kyōdai\ngrandfather | sofu\ngrandmother | sobo\ngrandchild | mago\nuncle | oji\naunt | oba\n\n# life\n\n# living creatures | ikimono\nmonster | bakemono\n\n# animals\n\nanimal | dōbutsu\ndog | inu\ncat | neko\ncow | ushi\npig | buta\nhorse | uma\nsheep | hitsuji\nmonkey | saru\nmouse | nezumi\ntiger | tora\nwolf | ōkami\nrabbit | usagi\ndragon | ryū\ndeer | shika\nfrog | kaeru\ntoad | gama\nlion | shishi\ngiraffe | kirin\nelephant | zō\nbird | tori\nchicken | niwatori\nsparrow | suzume\ncrow | karasu\neagle | washi\nhawk, falcon | taka\nfish | sakana\nshrimp | ebi\ntuna | maguro\noctopus | tako\ninsect | mushi\nbutterfly | chō\nspider | kumo\nfirefly | hotaru\ncockroach | gokiburi\nearthworm | mimizu\nlizard | tokage\nsnake | hebi\n\n# plants\n\nplants | shokubutsu\ngrass | kusa\nflower | hana\ntree | ki\nmushroom | kinoko\n\n# crops\n\nuncooked rice | kome\nwheat, oats | mugi\nvegetable | yasai\nyam, potato | imo\nbeans | mame\nfruit | kudamono\ncarrot | ninjin\napple | ringo\norange | mikan\npear | nashi\nchestnut | kuri\npeach | momo\ntomato | banka\nwatermelon | suika\n\n# food\n\nbreakfast | asagohan\nlunch | hirugohan\nsupper | bangohan\ncooked rice, food | gohan\ncooking | ryōri\n\n# drink\n\nbeverage | nomimono\nmilk | gyūnyū\n\n# seasoning\n\nsugar | satō\nsalt | shio\nsoy sauce | shōyu\n\n# time and space\n\ntime | jikan\nday | nichi\nmonth | gatsu\nyear | toshi\n# last year | kyōnen\n# this year | kotoshi\n# next year | rainen\ntoday | kyō\nyesterday | kinō\ntomorrow | ashita\nmorning | asa\nnight | yoru\nmoon | tsuki\nstar | hoshi\nweather | tenki\nrain | ame\ncloudy | kumori\nsnow | yuki\nwind | kaze\nthunder | kaminari\nstorm | arashi\nsky | sora\n\n# directions and positions\n\neast | higashi\nwest | nishi\nsouth | minami\nnorth | kita\n# here | koko\n# there | soko\n# over there | asoko\nright (direction) | migi\nleft | hidari\nabove, up | ue\nbelow, down | shita\nin front of | mae\nbehind | ushiro\n\n# materials\n\nwater | mizu\nice | kōri\nearth, ground | tsuchi\n\n# society\n\nsociety | shakai\neconomy | keizai\ncompany | kaisha\nmeeting | kaigi\nschool | gakkō\nstore | mise\nfactory | kōjō\nmoney | okane\nticket | kippu\n\n# man made objects\n\n# home\n\ndesk | tsukue\nwindow | mado\nelectricity | denki\n\n# tools\n\n# stationery\n\ndiary | nikki\npencil | enpitsu\neraser | keshigomu\nscissors | hasami\n\n# clothes\n\nclothes | fuku\nshoes | kutsu\nglasses | megane\n\n# transport \n\nairplane | hikōki\nstreet | michi\ntrain | densha\ncar | jidōsha\n';
  chinese1_vocabulary_text = 'dog | gǒu\ncat | māo\nhorse | mǎ\nmouse | lǎoshǔ\nbird | niǎo\ncow | niú\nfish | yú\nman | nánrén\nwoman | nǚrén\nred | hóng sè\nblue | lán sè\ngreen | lǜ sè\nyellow | huáng sè\npurple | zǐ sè\nuniversity | dàxué\nstudent | xuéshēng\nmorning | zǎoshàng\nnight | yèwǎn\nyesterday | zuótiān\ntoday | jīntiān\ntomorrow | míngtiān\nspring | chūntiān\nsummer | xiàtiān\nautumn | qiūtiān\nwinter | dōngtiān';
  korean1_vocabulary_text = 'dog | gae\ncat | goyang-i\nhorse | mal\nmouse | jwi\nbird | sae\ncow | so\nfish | mulgogi\nman | namja\nwoman | yeoja\nred | ppalgansaeg\nblue | puleunsaeg\ngreen | nogsaeg\nyellow | hwangsaeg\npurple | bolasaeg\nuniversity | daehag\nstudent | hagsaeng\nmorning | achim\nnight | bam\nyesterday | eoje\ntoday | oneul\ntomorrow | naeil\nspring | bom\nsummer | yeoleum\nautumn | ga-eul\nwinter | gyeoul';
  vietnamese1_vocabulary_text = 'dog | chó\ncat | con mèo\nhorse | ngựa\nmouse | chuột\nbird | chim\ncow | bò\nfish | cá\nman | đàn ông\nwoman | đàn bà\nred | đỏ\nblue | xanh lam\ngreen | xanh lá cây\nyellow | vàng\npurple | màu đỏ tía\nuniversity | trường đại học\nstudent | sinh viên\nmorning | buổi sáng\nnight | đêm\nyesterday | hôm qua\ntoday | ngày nay\ntomorrow | ngày mai\nspring | mùa xuân\nsummer | mùa hè\nautumn | mùa thu\nwinter | mùa đông';
  japanese_vocab_all = parseVocab(japanese_all_vocabulary_text);
  flashcard_sets = {
    'japanese1': [japanese_vocab_all[0], japanese_vocab_all[1], japanese_vocab_all[2], japanese_vocab_all[3], japanese_vocab_all[4], japanese_vocab_all[5], japanese_vocab_all[6], japanese_vocab_all[7], japanese_vocab_all[8], japanese_vocab_all[9], japanese_vocab_all[10], japanese_vocab_all[11], japanese_vocab_all[12], japanese_vocab_all[13], japanese_vocab_all[14], japanese_vocab_all[15], japanese_vocab_all[16], japanese_vocab_all[17], japanese_vocab_all[18], japanese_vocab_all[19], japanese_vocab_all[20], japanese_vocab_all[21], japanese_vocab_all[22], japanese_vocab_all[23], japanese_vocab_all[24], japanese_vocab_all[25], japanese_vocab_all[26], japanese_vocab_all[27], japanese_vocab_all[28], japanese_vocab_all[29], japanese_vocab_all[30], japanese_vocab_all[31], japanese_vocab_all[32], japanese_vocab_all[33], japanese_vocab_all[34], japanese_vocab_all[35], japanese_vocab_all[36], japanese_vocab_all[37], japanese_vocab_all[38], japanese_vocab_all[39], japanese_vocab_all[40], japanese_vocab_all[41], japanese_vocab_all[42], japanese_vocab_all[43], japanese_vocab_all[44], japanese_vocab_all[45], japanese_vocab_all[46], japanese_vocab_all[47], japanese_vocab_all[48], japanese_vocab_all[49]],
    'japanese2': [japanese_vocab_all[50], japanese_vocab_all[51], japanese_vocab_all[52], japanese_vocab_all[53], japanese_vocab_all[54], japanese_vocab_all[55], japanese_vocab_all[56], japanese_vocab_all[57], japanese_vocab_all[58], japanese_vocab_all[59], japanese_vocab_all[60], japanese_vocab_all[61], japanese_vocab_all[62], japanese_vocab_all[63], japanese_vocab_all[64], japanese_vocab_all[65], japanese_vocab_all[66], japanese_vocab_all[67], japanese_vocab_all[68], japanese_vocab_all[69], japanese_vocab_all[70], japanese_vocab_all[71], japanese_vocab_all[72], japanese_vocab_all[73], japanese_vocab_all[74], japanese_vocab_all[75], japanese_vocab_all[76], japanese_vocab_all[77], japanese_vocab_all[78], japanese_vocab_all[79], japanese_vocab_all[80], japanese_vocab_all[81], japanese_vocab_all[82], japanese_vocab_all[83], japanese_vocab_all[84], japanese_vocab_all[85], japanese_vocab_all[86], japanese_vocab_all[87], japanese_vocab_all[88], japanese_vocab_all[89], japanese_vocab_all[90], japanese_vocab_all[91], japanese_vocab_all[92], japanese_vocab_all[93], japanese_vocab_all[94], japanese_vocab_all[95], japanese_vocab_all[96], japanese_vocab_all[97], japanese_vocab_all[98], japanese_vocab_all[99]],
    'japanese3': [japanese_vocab_all[100], japanese_vocab_all[101], japanese_vocab_all[102], japanese_vocab_all[103], japanese_vocab_all[104], japanese_vocab_all[105], japanese_vocab_all[106], japanese_vocab_all[107], japanese_vocab_all[108], japanese_vocab_all[109], japanese_vocab_all[110], japanese_vocab_all[111], japanese_vocab_all[112], japanese_vocab_all[113], japanese_vocab_all[114], japanese_vocab_all[115], japanese_vocab_all[116], japanese_vocab_all[117], japanese_vocab_all[118], japanese_vocab_all[119], japanese_vocab_all[120], japanese_vocab_all[121], japanese_vocab_all[122], japanese_vocab_all[123], japanese_vocab_all[124], japanese_vocab_all[125], japanese_vocab_all[126], japanese_vocab_all[127], japanese_vocab_all[128], japanese_vocab_all[129], japanese_vocab_all[130], japanese_vocab_all[131], japanese_vocab_all[132], japanese_vocab_all[133], japanese_vocab_all[134], japanese_vocab_all[135], japanese_vocab_all[136], japanese_vocab_all[137], japanese_vocab_all[138], japanese_vocab_all[139], japanese_vocab_all[140], japanese_vocab_all[141], japanese_vocab_all[142], japanese_vocab_all[143], japanese_vocab_all[144], japanese_vocab_all[145], japanese_vocab_all[146], japanese_vocab_all[147], japanese_vocab_all[148], japanese_vocab_all[149]],
    'chinese1': parseVocab(chinese1_vocabulary_text),
    'korean1': parseVocab(korean1_vocabulary_text),
    'vietnamese1': parseVocab(vietnamese1_vocabulary_text)
  };
  language_names = {
    'japanese1': 'Japanese',
    'japanese2': 'Japanese',
    'japanese3': 'Japanese',
    'chinese1': 'Chinese',
    'korean1': 'Korean',
    'vietnamese1': 'Vietnamese'
  };
  flashcard_name_aliases = {
    'ja1': 'japanese1',
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
      optiondiv = J('button.btn.btn-default.answeroption#option' + idx).css({
        width: optiondivwidth,
        'font-size': '20px'
      }).attr('type', 'button');
      worddiv = J('span.answeroptionword#optionword' + idx);
      notediv = J('span.answeroptionnote#optionnote' + idx);
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
      $('#option' + idx).data({
        wordinfo: elem,
        langname: langname,
        idx: idx
      });
      return optiondiv.click(function(){
        if (elem.correct) {
          return newQuestion();
        } else {
          return showAnswer(optiondiv);
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
  out$.gotoQuizPage = gotoQuizPage = function(){
    $('.mainpage').hide();
    $('#quizpage').show();
    if (root.currentWord == null) {
      newQuestion();
    }
  };
  out$.gotoOptionPage = gotoOptionPage = function(){
    $('.mainpage').hide();
    $('#optionpage').show();
    $('#langselect').val(root.current_flashcard_set);
    $('#formatselect').val($.cookie('format'));
    $('#fullnameinput').val($.cookie('fullname'));
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
    if (newformat === 'interactive' || newformat === 'link') {
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
  showAnswer = function(optiondiv){
    var langname, elem, notediv;
    langname = optiondiv.data('langname');
    elem = optiondiv.data('wordinfo');
    notediv = optiondiv.find('.answeroptionnote');
    if (langname === 'English') {
      notediv.html(' = ' + '<b>' + elem.romaji + '</b>');
    } else {
      notediv.html(' = ' + '<b>' + elem.english + '</b>');
    }
  };
  out$.showAnswers = showAnswers = function(){
    var i$, ref$, len$, option;
    for (i$ = 0, len$ = (ref$ = $('.answeroption')).length; i$ < len$; ++i$) {
      option = ref$[i$];
      showAnswer($(option));
    }
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
    var param, condition;
    param = getUrlParameters();
    if (param.facebook != null && param.facebook !== 'false' && param.facebook !== false) {
      condition = $.cookie('format');
      if (condition != null && condition === 'link') {
        window.location = '/control';
        return;
      }
    }
    setFlashcardSet(firstNonNull(param.lang, param.language, param.quiz, param.lesson, param.flashcard, param.flashcardset, $.cookie('lang'), 'vietnamese1'));
    setInsertionFormat(firstNonNull(param.format, param.condition, $.cookie('format'), 'interactive'));
    setFullName(firstNonNull(param.fullname, $.cookie('fullname'), 'Anonymous User'));
    return gotoPage(firstNonNull(param.page, 'quiz'));
  });
}).call(this);
