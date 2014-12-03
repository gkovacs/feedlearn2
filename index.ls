root = exports ? this

J = $.jade

{find-index} = require \prelude-ls

parse-vocab = (...vocab_text_list) ->
  output = []
  for vocab_text in vocab_text_list
    for line in vocab_text.split('\n')
      line = line.trim()
      if line.length > 0 and line[0] != '#'
        [english,romaji] = line.split('|')
        english = english.trim()
        romaji = romaji.trim()
        output.push {english: english, romaji: romaji, idx: output.length}
  return output

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

# taken from http://en.wiktionary.org/wiki/Appendix:1000_Japanese_basic_words

japanese_all_vocabulary_text = '''
# people

person | hito
man | otoko
woman | onna
children | kodomo
family | kazoku
# I, myself | watashi
# girl | shōjo
# boy | shōnen

# occupations

doctor | isha
nurse | kangoshi
dentist | shikai
politician | seijika
lawyer | bengoshi
firefighter | shōbōshi
soldier | heishi
architect | kenchikuka
teacher | sensei
singer | kashu

# body

foot | ashita
head | atama
face | kao
mouth | kuchi
lips | kuchibiru
hair | kami
ear | mimi
arm | ude
finger | yubi
neck | kubi
heart | shinzō
chest | mune
illness | byōki

# family

parents | oya
father | chichi
mother | haha
wife | tsuma
husband | otto
# older brother | ani
# older sister | ane
younger brother | otōto
younger sister | imōto
# siblings | kyōdai
grandfather | sofu
grandmother | sobo
grandchild | mago
uncle | oji
aunt | oba

# life

# living creatures | ikimono
monster | bakemono

# animals

animal | dōbutsu
dog | inu
cat | neko
cow | ushi
pig | buta
horse | uma
sheep | hitsuji
monkey | saru
mouse | nezumi
tiger | tora
wolf | ōkami
rabbit | usagi
dragon | ryū
deer | shika
frog | kaeru
toad | gama
lion | shishi
giraffe | kirin
elephant | zō
bird | tori
chicken | niwatori
sparrow | suzume
crow | karasu
eagle | washi
hawk, falcon | taka
fish | sakana
shrimp | ebi
tuna | maguro
octopus | tako
insect | mushi
butterfly | chō
spider | kumo
firefly | hotaru
cockroach | gokiburi
earthworm | mimizu
lizard | tokage
snake | hebi

# plants

plants | shokubutsu
grass | kusa
flower | hana
tree | ki
mushroom | kinoko

# crops

uncooked rice | kome
wheat, oats | mugi
vegetable | yasai
yam, potato | imo
beans | mame
fruit | kudamono
carrot | ninjin
apple | ringo
orange | mikan
pear | nashi
chestnut | kuri
peach | momo
tomato | banka
watermelon | suika

# food

breakfast | asagohan
lunch | hirugohan
supper | bangohan
cooked rice, food | gohan
cooking | ryōri

# drink

beverage | nomimono
milk | gyūnyū

# seasoning

sugar | satō
salt | shio
soy sauce | shōyu

# time and space

time | jikan
day | nichi
month | gatsu
year | toshi
# last year | kyōnen
# this year | kotoshi
# next year | rainen
today | kyō
yesterday | kinō
tomorrow | ashita
morning | asa
night | yoru
moon | tsuki
star | hoshi
weather | tenki
rain | ame
cloudy | kumori
snow | yuki
wind | kaze
thunder | kaminari
storm | arashi
sky | sora

# directions and positions

east | higashi
west | nishi
south | minami
north | kita
# here | koko
# there | soko
# over there | asoko
right (direction) | migi
left | hidari
above, up | ue
below, down | shita
in front of | mae
behind | ushiro

# materials

water | mizu
ice | kōri
earth, ground | tsuchi

# society

society | shakai
economy | keizai
company | kaisha
meeting | kaigi
school | gakkō
store | mise
factory | kōjō
money | okane
ticket | kippu

# man made objects

# home

desk | tsukue
window | mado
electricity | denki

# tools

# stationery

diary | nikki
pencil | enpitsu
eraser | keshigomu
scissors | hasami

# clothes

clothes | fuku
shoes | kutsu
glasses | megane

# transport 

airplane | hikōki
street | michi
train | densha
car | jidōsha

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

/*
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
*/

vietnamese_all_vocabulary_text = '''
# time

week | tuần
year | năm
today | hôm nay
tomorrow | ngày mai
yesterday | hôm qua
calendar | lịch
# second | giây
# hour | giờ
# minute | phút
clock | đồng hồ

# seasons

spring | mùa xuân
summer | mùa hè
autumn | mùa thu
winter | mùa đông

# time of day

morning | buổi sáng
night | đêm

# students

university | trường đại học
student | sinh viên

# numbers

one | một
two | hai
three | ba
four | bốn
five | năm
six | sáu
seven | bảy
eight | tám
nine | chín
ten | mười

# body parts

leg | chân
head | đầu
hand | tay

# employment

nurse | y tá
employee | nhân viên
police officer | cảnh sát
chef | đầu bếp
engineer | kỹ sư
doctor | bác sĩ
manager | người quản lý
teacher | giáo sư

# animals

dog | chó
cat | con mèo
horse | ngựa
mouse | chuột
bird | chim
cow | bò
fish | cá

# people

man | đàn ông
woman | đàn bà

# colors

red | đỏ
blue | xanh lam
green | xanh lá cây
yellow | vàng
purple | màu đỏ tía
'''

japanese_vocab_all = parse-vocab japanese_all_vocabulary_text

vietnamese_vocab_all = parse-vocab vietnamese_all_vocabulary_text

console.log vietnamese_vocab_all.length

flashcard_sets = {
  #'japanese1': parse-vocab japanese1_vocabulary_text
  'japanese1': japanese_vocab_all[0 til 50]
  'japanese2': japanese_vocab_all[50 til 100]
  'japanese3': japanese_vocab_all[100 til 150]
  'chinese1': parse-vocab chinese1_vocabulary_text
  'korean1': parse-vocab korean1_vocabulary_text
  #'vietnamese1': parse-vocab vietnamese1_vocabulary_text
  'vietnamese1': vietnamese_vocab_all[0 til 50]
}

language_names = {
  'japanese1': 'Japanese'
  'japanese2': 'Japanese'
  'japanese3': 'Japanese'
  'chinese1': 'Chinese'
  'korean1': 'Korean'
  'vietnamese1': 'Vietnamese'
}

flashcard_name_aliases = {
  'ja1': 'japanese1'
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
  new_flashcard_set = first-non-null flashcard_name_aliases[new_flashcard_set.toLowerCase()], new_flashcard_set
  if new_flashcard_set != $.cookie('lang')
    $.cookie('lang', new_flashcard_set)
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

root.current-word = null

export new-question = ->
  word = select-elem root.vocabulary |> deep-copy
  word.correct = true
  root.current-word = word
  otherwords = select-n-elem-except-elem root.vocabulary, word, 3 |> deep-copy
  for let elem in otherwords
    elem.correct = false
  allwords = [word] ++ otherwords |> shuffle-list
  langname = ['English', current_language_name ]|> select-elem
  question-with-words allwords, langname

export play-sound = ->
  $('audio')[0].pause()
  $('audio').attr('src', 'error.mp3')
  $('audio')[0].currentTime = 0
  $('audio')[0].play()

export play-sound-current-word = ->
  $('audio')[0].pause()
  $('audio').attr('src', 'error.mp3')
  $('audio')[0].currentTime = 0
  $('audio')[0].play()


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
    optiondiv = J('button.btn.btn-default.answeroption#option' + idx).css({
      width: optiondivwidth
      'font-size': \20px
    }).attr('type', 'button')
    worddiv = J('span.answeroptionword#optionword' + idx)
    notediv = J('span.answeroptionnote#optionnote' + idx)
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
      }).click ->
        play-sound()
    $('#answeroptions').append outeroptiondiv
    #if idx == 1
    #  $('#answeroptions').append '<br>'
    $('#option' + idx).data({
      wordinfo: elem
      langname: langname
      idx: idx
    })
    optiondiv.click ->
      if elem.correct
        new-question()
      else
        show-answer optiondiv

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
  if not root.current-word?
    new-question()
  return

export goto-option-page = ->
  $('.mainpage').hide()
  $('#optionpage').show()
  $('#langselect').val(root.current_flashcard_set)
  $('#formatselect').val($.cookie('format'))
  $('#fullnameinput').val($.cookie('fullname'))
  return

export goto-chat-page = ->
  $('.mainpage').hide()
  $('#chatpage').show()
  $('#currentanswer').text root.current-word.romaji + ' = ' + root.current-word.english
  return

export change-lang = ->
  newlang = $('#langselect').val()
  set-flashcard-set newlang
  new-question()
  return

export set-insertion-format = (newformat) ->
  if newformat == 'interactive' or newformat == 'link'
    $.cookie('format', newformat)
  return

export change-feed-insertion-format = ->
  newformat = $('#formatselect').val()
  set-insertion-format newformat
  return

export set-full-name = (newfullname) ->
  if newfullname? and newfullname.length > 0
    $.cookie('fullname', newfullname)
  return

export change-full-name = ->
  newfullname = $('#fullnameinput').val()
  set-full-name newfullname
  return

show-answer = (optiondiv) ->
  langname = optiondiv.data 'langname'
  elem = optiondiv.data 'wordinfo'
  notediv = optiondiv.find '.answeroptionnote'
  if langname == 'English'
    notediv.html(' = ' + '<b>' + elem.romaji + '</b>')
  else
    notediv.html(' = ' + '<b>' + elem.english + '</b>')
  return

export show-answers = ->
  for option in $('.answeroption')
    show-answer $(option)
  return

goto-page = (page) ->
  switch page
  | \quiz => goto-quiz-page()
  | \option => goto-option-page()
  | \chat => goto-chat-page()

$(document).ready ->
  param = getUrlParameters()
  if param.facebook? and param.facebook != 'false' and param.facebook != false
    condition = $.cookie('format')
    if condition? and condition == 'link'
      window.location = '/control'
      return
  set-flashcard-set <| first-non-null param.lang, param.language, param.quiz, param.lesson, param.flashcard, param.flashcardset, $.cookie('lang'), 'vietnamese1'
  set-insertion-format <| first-non-null param.format, param.condition, $.cookie('format'), 'interactive'
  set-full-name <| first-non-null param.fullname, $.cookie('fullname'), 'Anonymous User'
  goto-page <| first-non-null param.page, 'quiz'
