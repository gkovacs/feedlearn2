root = exports ? this

J = $.jade

{find-index} = require \prelude-ls

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

chinese1_vocabulary_text = '''
dog | gǒu
cat | māo
horse | mǎ
mouse | lǎoshǔ
bird | niǎo
cow | niú
fish | yú
man | nánrén
woman | nǚrén
red | hóng sè
blue | lán sè
green | lǜ sè
yellow | huáng sè
purple | zǐ sè
university | dàxué
student | xuéshēng
morning | zǎoshàng
night | yèwǎn
yesterday | zuótiān
today | jīntiān
tomorrow | míngtiān
spring | chūntiān
summer | xiàtiān
autumn | qiūtiān
winter | dōngtiān
'''

korean1_vocabulary_text = '''
dog | gae
cat | goyang-i
horse | mal
mouse | jwi
bird | sae
cow | so
fish | mulgogi
man | namja
woman | yeoja
red | ppalgansaeg
blue | puleunsaeg
green | nogsaeg
yellow | hwangsaeg
purple | bolasaeg
university | daehag
student | hagsaeng
morning | achim
night | bam
yesterday | eoje
today | oneul
tomorrow | naeil
spring | bom
summer | yeoleum
autumn | ga-eul
winter | gyeoul
'''

vietnamese1_vocabulary_text = '''
dog | chó
cat | con mèo
horse | ngựa
mouse | chuột
bird | chim
cow | bò
fish | cá
man | đàn ông
woman | đàn bà
red | đỏ
blue | xanh lam
green | xanh lá cây
yellow | vàng
purple | màu đỏ tía
university | trường đại học
student | sinh viên
morning | buổi sáng
night | đêm
yesterday | hôm qua
today | ngày nay
tomorrow | ngày mai
spring | mùa xuân
summer | mùa hè
autumn | mùa thu
winter | mùa đông
'''

parse-vocab = (vocab_text) ->
  output = []
  for line,idx in vocab_text.split('\n')
    line = line.trim()
    if line.length > 0
      [english,romaji] = line.split('|')
      english = english.trim()
      romaji = romaji.trim()
      output.push {english: english, romaji: romaji, idx: idx}
  return output

flashcard_sets = {
  'japanese1': parse-vocab japanese1_vocabulary_text
  'chinese1': parse-vocab chinese1_vocabulary_text
  'korean1': parse-vocab korean1_vocabulary_text
  'vietnamese1': parse-vocab vietnamese1_vocabulary_text
}

language_names = {
  'japanese1': 'Japanese'
  'chinese1': 'Chinese'
  'korean1': 'Korean'
  'vietnamese1': 'Vietnamese'
}

flashcard_name_aliases = {
  'ja': 'japanese1'
  'japanese': 'japanese1'
  'zh': 'chinese1'
  'chn': 'chinese1'
  'chinese': 'chinese1'
  'ko': 'korean1'
  'korean': 'korean1'
  'vi': 'vietnamese1'
  'viet': 'vietnamese1'
  'vietnamese': 'vietnamese1'
}

first-non-null = (...args) ->
  for x in args
    if x?
      return x

set-flashcard-set = (new_flashcard_set) ->
  new_flashcard_set = first-non-null flashcard_name_aliases[new_flashcard_set], new_flashcard_set
  console.log new_flashcard_set
  root.current_flashcard_set = new_flashcard_set
  root.current_language_name = language_names[new_flashcard_set]
  root.vocabulary = flashcard_sets[new_flashcard_set]

select-idx = (list) ->
  return Math.random() * list.length |> Math.floor

select-elem = (list) ->
  return list[select-idx(list)]

select-n-elem = (list, n) ->
  output = []
  seenidx = {}
  while output.length < n
    newidx = select-idx list
    if not seenidx[newidx]?
      seenidx[newidx] = true
      output.push list[newidx]
  return output

select-n-elem-except-elem = (list, elem, n) ->
  output = []
  seenidx = {}
  seenidx[elem.idx] = true
  while output.length < n
    newidx = select-idx list
    if not seenidx[newidx]?
      seenidx[newidx] = true
      output.push list[newidx]
  return output

swap-idx-in-list = (list, idx1, idx2) ->
  tmp = list[idx1]
  list[idx1] = list[idx2]
  list[idx2] = tmp
  return

shuffle-list = (origlist) ->
  list = origlist[to]
  for i in [0 til list.length]
    randidx = select-idx list
    swap-idx-in-list list, i, randidx
  return list

deep-copy = (elem) ->
  return elem |> JSON.stringify |> JSON.parse

export new-question = ->
  word = select-elem root.vocabulary |> deep-copy
  word.correct = true
  otherwords = select-n-elem-except-elem root.vocabulary, word, 3 |> deep-copy
  for let elem in otherwords
    elem.correct = false
  allwords = [word] ++ otherwords |> shuffle-list
  langname = ['English', current_language_name ]|> select-elem
  question-with-words allwords, langname

question-with-words = (allwords, langname) ->
  word-idx = find-index (.correct), allwords
  word = allwords[word-idx]
  if langname == 'English'
    $('#questionmessage').html "What does this word mean in #{current_language_name}:"
    $('#questionword').html "<b>#{word.romaji}</b>"
    $('#questionwordaudio').show()
  else
    $('#questionmessage').html "How would you say this in #{current_language_name}:"
    $('#questionword').html "<b>#{word.english}</b>"
    $('#questionwordaudio').hide()
  $('#answeroptions').html('')
  for let elem,idx in allwords
    outeroptiondiv = J('div').css({
      width: \100%
    })
    optiondivwidth = '100%'
    if langname != 'English'
      optiondivwidth = 'calc(100% - 40px)'
    optiondiv = J('button.btn.btn-default#option' + idx).css({
      width: optiondivwidth
      'font-size': \20px
    }).attr('type', 'button')
    worddiv = J('span#optionword' + idx)
    notediv = J('span#optionnote' + idx)
    optiondiv.append [ worddiv, notediv ]
    if langname == 'English'
      worddiv.text(elem.english)
    else
      worddiv.text(elem.romaji)
    outeroptiondiv.append optiondiv
    if langname != 'English'
      outeroptiondiv.append J('div.glyphicon.glyphicon-volume-up').css({
        font-size: \32px
        padding-left: \5px
        margin-top: \-10px
        vertical-align: \middle
        cursor: \pointer
        top: \5px
      })
    $('#answeroptions').append outeroptiondiv
    #if idx == 1
    #  $('#answeroptions').append '<br>'
    optiondiv.click ->
      if elem.correct
        new-question()
      else
        if langname == 'English'
          notediv.html(' = ' + '<b>' + elem.romaji + '</b>')
        else
          notediv.html(' = ' + '<b>' + elem.english + '</b>')

getUrlParameters = root.getUrlParameters = ->
  url = window.location.href
  hash = url.lastIndexOf('#')
  if hash != -1
    url = url.slice(0, hash)
  map = {}
  parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m,key,value) ->
    map[key] = decodeURI(value)
  )
  return map

export goto-quiz-page = ->
  $('.mainpage').hide()
  $('#quizpage').show()
  param = getUrlParameters()
  set-flashcard-set <| first-non-null param.lang, param.language, param.quiz, param.lesson, param.flashcard, param.flashcardset, 'vietnamese1'
  new-question()

export goto-option-page = ->
  $('.mainpage').hide()
  $('#optionpage').show()

export goto-chat-page = ->
  $('.mainpage').hide()
  $('#chatpage').show()

goto-page = (page) ->
  switch page
  | \quiz => goto-quiz-page()
  | \option => goto-option-page()
  | \chat => goto-chat-page()

$(document).ready ->
  console.log 'hello world!'
  param = getUrlParameters()
  goto-page <| first-non-null param.page, 'quiz'
  

