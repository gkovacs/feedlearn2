(function(){
  var root, J, ref$, findIndex, map, sort, sortBy, firstNonNull, flashcard_sets, language_names, flashcard_name_aliases, selectChanged, out$ = typeof exports != 'undefined' && exports || this;
  root = typeof exports != 'undefined' && exports !== null ? exports : this;
  J = $.jade;
  ref$ = require('prelude-ls'), findIndex = ref$.findIndex, map = ref$.map, sort = ref$.sort, sortBy = ref$.sortBy;
  firstNonNull = root.firstNonNull;
  flashcard_sets = root.flashcard_sets, language_names = root.language_names, flashcard_name_aliases = root.flashcard_name_aliases;
  out$.selectChanged = selectChanged = function(){
    var selected_words, i$, ref$, len$, idx, x, curword, newidx, results$ = [];
    console.log('select changed');
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
        console.log(curword);
        console.log(JSON.stringify(selected_words));
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
  $(document).ready(function(){
    var flashcards, selectOptions, i$, ref$, len$, idx, wordinfo, curinput, j$, len1$, engword;
    console.log('foobar');
    flashcards = flashcard_sets.japanese1;
    selectOptions = ['--- select a word ---'].concat(sort(
    map(function(it){
      return it.english;
    }, flashcards)));
    for (i$ = 0, len$ = (ref$ = sortBy(fn$, flashcards)).length; i$ < len$; ++i$) {
      idx = i$;
      wordinfo = ref$[i$];
      curinput = J('select.engselect.engselect' + idx).attr('onchange', 'selectChanged()').css({
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
    return $('.engselect').select2();
    function fn$(it){
      return it.romaji;
    }
    function fn1$(it){
      return it.english;
    }
  });
}).call(this);
