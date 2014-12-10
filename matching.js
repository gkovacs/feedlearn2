(function(){
  var root, J, ref$, findIndex, map, sort, sortBy, firstNonNull, getUrlParameters, flashcard_sets, language_names, flashcard_name_aliases, addlog, postStartEvent, selectChanged, getCurrentAnswers, getFlashcardSet, getPretestNum, submitAnswers, out$ = typeof exports != 'undefined' && exports || this;
  root = typeof exports != 'undefined' && exports !== null ? exports : this;
  J = $.jade;
  ref$ = require('prelude-ls'), findIndex = ref$.findIndex, map = ref$.map, sort = ref$.sort, sortBy = ref$.sortBy;
  firstNonNull = root.firstNonNull, getUrlParameters = root.getUrlParameters;
  flashcard_sets = root.flashcard_sets, language_names = root.language_names, flashcard_name_aliases = root.flashcard_name_aliases;
  addlog = root.addlog, postStartEvent = root.postStartEvent;
  out$.selectChanged = selectChanged = function(){
    var selected_words, i$, ref$, len$, idx, x, curword, newidx, results$ = [];
    $('#submitmessage').text('');
    selected_words = {};
    for (i$ = 0, len$ = (ref$ = $('select.engselect')).length; i$ < len$; ++i$) {
      idx = i$;
      x = ref$[i$];
      curword = $(x).val().trim();
      if (curword === '' || curword.indexOf('--- select a word ---') !== -1) {
        $(x).parent().css({
          backgroundColor: 'white'
        });
        continue;
      }
      if (selected_words[curword] != null) {
        newidx = selected_words[curword];
        $('.engselect' + newidx).parent().css({
          backgroundColor: 'yellow'
        });
        $(x).parent().css({
          backgroundColor: 'yellow'
        });
      } else {
        $(x).parent().css({
          backgroundColor: 'white'
        });
      }
      selected_words[curword] = idx;
    }
    for (i$ = 0, len$ = (ref$ = $('.engwordopt')).length; i$ < len$; ++i$) {
      x = ref$[i$];
      if (selected_words[$(x).text().trim()] != null) {
        results$.push($(x).css({
          backgroundColor: 'white',
          color: 'grey',
          textDecoration: 'line-through'
        }));
      } else {
        results$.push($(x).css({
          backgroundColor: 'lightblue',
          color: 'black',
          textDecoration: 'none'
        }));
      }
    }
    return results$;
  };
  out$.getCurrentAnswers = getCurrentAnswers = function(){
    var output, i$, ref$, len$, idx, x, myanswer, english, romaji, kanji, iscorrect;
    output = [];
    for (i$ = 0, len$ = (ref$ = $('select.engselect')).length; i$ < len$; ++i$) {
      idx = i$;
      x = ref$[i$];
      myanswer = $(x).val().trim();
      english = $(x).attr('english').trim();
      romaji = $(x).attr('romaji').trim();
      kanji = $(x).attr('kanji').trim();
      iscorrect = myanswer === english;
      output.push({
        myanswer: myanswer,
        iscorrect: iscorrect,
        english: english,
        romaji: romaji,
        kanji: kanji
      });
    }
    return output;
  };
  getFlashcardSet = function(){
    var param;
    param = getUrlParameters();
    return firstNonNull(param.vocab, 'japanese1');
  };
  getPretestNum = function(){
    switch (getFlashcardSet()) {
    case 'japanese1':
      return 1;
    case 'japanese2':
      return 2;
    case 'japanese3':
      return 3;
    default:
      return 0;
    }
  };
  out$.submitAnswers = submitAnswers = function(){
    var param;
    param = getUrlParameters();
    addlog({
      type: 'vocabquiz',
      quiztype: param.type,
      lang: param.vocab,
      answers: getCurrentAnswers()
    });
    $('#submitmessage').css('color', 'green').text('Answers submitted!');
    return postStartEvent(param.type + getPretestNum());
  };
  $(document).ready(function(){
    var flashcard_set, flashcards, selectOptions, i$, ref$, len$, idx, wordinfo, curinput, j$, len1$, engword;
    flashcard_set = getFlashcardSet();
    flashcards = flashcard_sets[flashcard_set];
    selectOptions = ['--- select a word ---'].concat(sort(
    map(function(it){
      return it.english;
    }, flashcards)));
    for (i$ = 0, len$ = (ref$ = sortBy(fn$, flashcards)).length; i$ < len$; ++i$) {
      idx = i$;
      wordinfo = ref$[i$];
      curinput = J('select.engselect.engselect' + idx).attr('english', wordinfo.english).attr('romaji', wordinfo.romaji).attr('kanji', wordinfo.kanji).attr('onchange', 'selectChanged()').css({
        width: '200px',
        float: 'right',
        marginLeft: '10px'
      });
      for (j$ = 0, len1$ = selectOptions.length; j$ < len1$; ++j$) {
        engword = selectOptions[j$];
        curinput.append(J('option').attr('value', engword).text(engword));
      }
      $('#foreignwordlist').append(J('div').css({
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '10px',
        paddingRight: '10px',
        borderRadius: '10px',
        marginBottom: '10px',
        verticalAlign: 'middle'
      }).append([J('span').text(wordinfo.romaji), curinput]));
    }
    for (i$ = 0, len$ = (ref$ = sortBy(fn1$, flashcards)).length; i$ < len$; ++i$) {
      wordinfo = ref$[i$];
      $('#englishwordlist').append(J('div.engwordopt').css({
        marginTop: '0px',
        display: 'inline-block',
        verticalAlign: 'top',
        marginRight: '25px',
        marginBottom: '20px',
        backgroundColor: 'lightblue',
        borderRadius: '10px',
        paddingLeft: '5px',
        paddingRight: '5px',
        paddingTop: '5px',
        paddingBottom: '5px'
      }).append(J('span').text(wordinfo.english)));
      $('#englishwords').append(J('option').attr('value', wordinfo.english));
    }
    $('.engselect').select2();
    return addlog({
      type: 'vocabquizvisited',
      quiztype: param.type,
      lang: param.vocab
    });
    function fn$(it){
      return it.romaji;
    }
    function fn1$(it){
      return it.english;
    }
  });
}).call(this);
