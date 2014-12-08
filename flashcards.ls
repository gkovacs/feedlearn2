root = exports ? this

parse-vocab = (...vocab_text_list) ->
  output = []
  for vocab_text in vocab_text_list
    for line in vocab_text.split('\n')
      line = line.trim()
      if line.length > 0 and line[0] != '#'
        parts = line.split('|')
        english = parts[0].trim()
        romaji = parts[1].trim()
        if parts.length > 2
          kanji = parts[2].trim()
        else
          kanji = romaji
        output.push {english: english, romaji: romaji, kanji: kanji, idx: output.length}
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

person | hito | 人
man | otoko | 男
woman | onna | 女
children | kodomo | 子供
family | kazoku | 家族
# I, myself | watashi | 私
# girl | shōjo | 少女
# boy | shōnen | 少年

# occupations

doctor | isha | 医者
nurse | kangoshi | 看護師
dentist | shikai | 歯科医
politician | seijika | 政治家
lawyer | bengoshi | 弁護士
firefighter | shōbōshi | 消防士
soldier | heishi
architect | kenchikuka
teacher | sensei
singer | kashu

# body

foot | ashi
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

export flashcard_sets = {
  #'japanese1': parse-vocab japanese1_vocabulary_text
  'japanese1': japanese_vocab_all[0 til 50]
  'japanese2': japanese_vocab_all[50 til 100]
  'japanese3': japanese_vocab_all[100 til 150]
  'chinese1': parse-vocab chinese1_vocabulary_text
  'korean1': parse-vocab korean1_vocabulary_text
  #'vietnamese1': parse-vocab vietnamese1_vocabulary_text
  'vietnamese1': vietnamese_vocab_all[0 til 50]
}

export language_names = {
  'japanese1': 'Japanese'
  'japanese2': 'Japanese'
  'japanese3': 'Japanese'
  'chinese1': 'Chinese'
  'korean1': 'Korean'
  'vietnamese1': 'Vietnamese'
}

export language_codes = {
  'Japanese': 'ja'
  'Chinese': 'zh-CN'
  'Korean': 'ko'
  'Vietnamese': 'vi'
}

export flashcard_name_aliases = {
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
