root = exports ? this

J = $.jade

{find-index, map, sort, sort-by} = require \prelude-ls

{first-non-null, getUrlParameters, forcehttps} = root # commonlib.ls
{flashcard_sets, language_names, flashcard_name_aliases} = root # flashcards.ls
{addlog, post-start-event} = root # logging_client.ls

export select-changed = ->
  #console.log 'select changed'
  $('#submitmessage').text ''
  $('#submitbutton').attr 'disabled', false
  selected_words = {}
  for x,idx in $('select.engselect')
    #console.log $(x).val().trim()
    curword = $(x).val().trim()
    if curword == '' or curword.indexOf('--- select a word ---') != -1
      $(x).parent().css({background-color: 'white'})
      continue
    if selected_words[curword]?
      newidx = selected_words[curword]
      $('.engselect' + newidx).parent().css({background-color: 'yellow'})
      $(x).parent().css({background-color: 'yellow'})
      #console.log curword
      #console.log <| JSON.stringify selected_words
    else
      $(x).parent().css({background-color: 'white'})
    selected_words[curword] = idx # true
  for x in $('.engwordopt')
    if selected_words[$(x).text().trim()]?
      $(x).css({background-color: 'white', color: 'grey', text-decoration: 'line-through'})
    else
      $(x).css({background-color: 'lightblue', color: 'black', text-decoration: 'none'})

export getCurrentAnswers = ->
  output = []
  for x,idx in $('select.engselect')
    #console.log $(x).val().trim()
    myanswer = $(x).val().trim()
    english = $(x).attr('english').trim()
    romaji = $(x).attr('romaji').trim()
    kanji = $(x).attr('kanji').trim()
    iscorrect = myanswer == english
    output.push {myanswer, iscorrect, english, romaji, kanji}
  return output

get-flashcard-set = ->
  param = getUrlParameters()
  return first-non-null param.vocab, 'japanese1'

get-pretest-num = ->
  switch get-flashcard-set()
  | 'japanese1' => 1
  | 'japanese2' => 2
  | 'japanese3' => 3
  | _ => 0

export submit-answers = ->
  param = getUrlParameters()
  addlog {type: 'vocabquiz', quiztype: param.type, lang: param.vocab, answers: getCurrentAnswers()}
  #alert 'Answers submitted!'
  $('#submitmessage').css('color', 'green').text 'Answers submitted!'
  $('#submitbutton').attr 'disabled', true
  post-start-event(param.type + get-pretest-num())

$(document).ready ->
  forcehttps()
  param = getUrlParameters()
  if param.type == 'posttest'
    $('#testtype').text 'Post-Test'
  if get-pretest-num() != 0
    $('#weeknum').text get-pretest-num()
  flashcard_set = get-flashcard-set()
  flashcards = flashcard_sets[flashcard_set]
  select-options = [ '--- select a word ---' ].concat <| map (.english), flashcards |> sort
  for wordinfo,idx in sort-by (.romaji), flashcards
    #console.log wordinfo.romaji
    #curinput = J('input').attr('list', 'englishwords').css({width: '200px', float: 'right', margin-left: '10px'})
    curinput = J('select.engselect.engselect' + idx).attr('english', wordinfo.english).attr('romaji', wordinfo.romaji).attr('kanji', wordinfo.kanji).attr('onchange', 'selectChanged()').css({width: '200px', float: 'right', margin-left: '10px'})
    for engword in select-options
      curinput.append J('option').attr('value', engword).text(engword)
    $('#foreignwordlist').append <| J('div').css({padding-top: '10px', padding-bottom: '10px', padding-left: '10px', padding-right: '10px', border-radius: '10px', margin-bottom: '10px', vertical-align: 'middle'}).append [ J('span').text(wordinfo.romaji), curinput ]
    #$('#inputbarlist').append <| J('div').css({height: '18px'}).append J('input')
  for wordinfo in sort-by (.english), flashcards
    $('#englishwordlist').append <| J('div.engwordopt').css({margin-top: '0px', display: 'inline-block', vertical-align: 'top', margin-right: '25px', margin-bottom: '20px', background-color: 'lightblue', border-radius: '10px', padding-left: '5px', padding-right: '5px', padding-top: '5px', padding-bottom: '5px'}).append J('span').text(wordinfo.english)
    $('#englishwords').append <| J('option').attr('value', wordinfo.english)
  $('.engselect').select2()
  addlog {type: 'vocabquizvisited', quiztype: param.type, lang: param.vocab}
