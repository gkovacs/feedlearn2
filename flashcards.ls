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
soldier | heishi | 兵士
architect | kenchikuka | 建築家
teacher | sensei | 先生
singer | kashu | 歌手

# body

foot | ashi | 足
head | atama | 頭
face | kao | 顔
mouth | kuchi | 口
lips | kuchibiru | 唇
hair | kami | 髪
ear | mimi | 耳
arm | ude | 腕
finger | yubi | 指
neck | kubi | 首
heart | shinzō | 心臓
chest | mune | 胸
illness | byōki | 病気

# family

parents | oya | 親
father | chichi | 父
mother | haha | 母
wife | tsuma | 妻
husband | otto | 夫
# older brother | ani | 兄
# older sister | ane | 姉
younger brother | otōto | 弟
younger sister | imōto | 妹
# siblings | kyōdai | 兄弟
grandfather | sofu | 祖父
grandmother | sobo | 祖母
grandchild | mago | 孫
uncle | oji | 叔父
aunt | oba | 叔母

# life

# living creatures | ikimono | 生き物
monster | bakemono | 化け物

# animals

animal | dōbutsu | 動物
dog | inu | 犬
cat | neko | 猫
cow | ushi | 牛
pig | buta | 豚
horse | uma | 馬
sheep | hitsuji | 羊
monkey | saru | 猿
mouse | nezumi | 鼠
tiger | tora | 虎
wolf | ōkami | 狼
rabbit | usagi | 兎
dragon | ryū | 竜
deer | shika | 鹿
frog | kaeru | カエル
# toad | hikigaeru | ヒキガエル
lion | shishi | 獅子
giraffe | kirin | キリン
elephant | zō | 像
bird | tori | 鳥
chicken | niwatori | 鶏
sparrow | suzume | 雀
crow | karasu | 烏
eagle | washi | 鷲
# hawk, falcon | taka | 鷹
fish | sakana | 魚
shrimp | ebi | 蝦
tuna | maguro | 鮪
octopus | tako | タコ
insect | mushi | 虫
butterfly | chō | 蝶
spider | kumo | クモ
firefly | hotaru | 蛍
cockroach | gokiburi | ゴキブリ
earthworm | mimizu | ミミズ
lizard | tokage | トカゲ
snake | hebi | 蛇

# plants

plants | shokubutsu | 植物
grass | kusa | 草
flower | hana | 花
tree | ki | 木
mushroom | kinoko | キノコ

# crops

uncooked rice | kome | コメ
wheat, oats | mugi | 麦
vegetable | yasai | 野菜
yam, potato | imo | 芋
beans | mame | 豆
fruit | kudamono | 果物
carrot | ninjin | 人参
apple | ringo | リンゴ
orange | mikan | ミカン
pear | nashi | 梨
chestnut | kuri | 栗
peach | momo | 桃
# tomato | banka | バンカ
watermelon | suika | 水瓜

# food

breakfast | asagohan | 朝ご飯
lunch | hirugohan | 昼ご飯
supper | bangohan | 晩ご飯
cooked rice, food | gohan | ご飯
cooking | ryōri | 料理

# drink

beverage | nomimono | 飲み物
milk | gyūnyū | 牛乳

# seasoning

sugar | satō | 砂糖
salt | shio | 塩
soy sauce | shōyu | 醤油

# time and space

time | jikan | 時間
day | nichi | 日
month | gatsu | ガツ
year | toshi | トシ
# last year | kyōnen | 
# this year | kotoshi | 
# next year | rainen | 
today | kyō | 今日
yesterday | kinō | 昨日
tomorrow | ashita | 明日
morning | asa | 朝
night | yoru | 夜
moon | tsuki | ツキ
star | hoshi | 星
weather | tenki | 天気
rain | ame | 雨
cloudy | kumori | 曇り
snow | yuki | 雪
wind | kaze | 風
thunder | kaminari | 雷
storm | arashi | 嵐
sky | sora | 空

# directions and positions

east | higashi | ヒガシ
west | nishi | 西
south | minami | 南
north | kita | 北
# here | koko | ここ
# there | soko | そこ
# over there | asoko | あそこ
right (direction) | migi | 右
left (direction) | hidari | 左
above, up | ue | うえ
below, down | shita | した
in front of | mae | 前
behind | ushiro | 後ろ

# materials

water | mizu | 水
ice | kōri | 氷
earth, ground | tsuchi | 土

# society

society | shakai | 社会
economy | keizai | 経済
company | kaisha | 会社
meeting | kaigi | 会議
school | gakkō | 学校
store | mise | 店
factory | kōjō | 工場
money | okane | お金
ticket | kippu | 切符

# man made objects

# home

desk | tsukue | 机
window | mado | 窓
electricity | denki | 電気

# tools

bag | fukuro | 袋
umbrella | kasa | 傘

# stationery

diary | nikki | 日記
pencil | enpitsu | 鉛筆
eraser | keshigomu | 消しゴム
scissors | hasami | ハサミ

# clothes

clothes | fuku | 服
shoes | kutsu | 靴
glasses | megane | 眼鏡

# transport 

railway | tetsudō | 鉄道
airplane | hikōki | 飛行機
street | michi | 道
train | densha | 電車
car | jidōsha | 自動車

# language

letter | tegami | 手紙
english | eigo | 英語
newspaper | shinbun | 新聞
dictionary | jisho | 辞書

# colors

color | iro | 色
red | aka | 赤
yellow | kiiro | 黄色
green | midori | 緑
blue | ao | 青
purple | murasaki | 紫
white | shiro | 白
black | kuro | 黒
brown | chairo | 茶色
grey | haiiro | 灰色

# others

music | ongaku | 音楽
history | rekishi | 歴史
geography | chiri | 地理
physical education | taiiku | 体育
information | jōhō | 情報
study | benkyō | 勉強

# numbers

# zero | rei | レイ
one | ichi | 一
two | ni | 二
three | san | 三
four | yon | 四
five | go | 五
six | roku | 六
seven | nana | 七
eight | hachi | 八
nine | kyū | 九
ten | jū | 十
hundred | hyaku | 百

'''

chinese1_vocabulary_text = '''
dog | gǒu | 狗
cat | māo | 猫
horse | mǎ | 马
mouse | lǎoshǔ | 老鼠
bird | niǎo | 鸟
cow | niú | 牛
fish | yú | 鱼
man | nánrén | 男人
woman | nǚrén | 女人
red | hóng sè | 红色
blue | lán sè | 蓝色
green | lǜ sè | 绿色
yellow | huáng sè | 黄色
purple | zǐ sè | 紫色
university | dàxué | 大学
student | xuéshēng | 学生
morning | zǎoshàng | 早上
night | yèwǎn | 夜晚
yesterday | zuótiān | 昨天
today | jīntiān | 今天
tomorrow | míngtiān | 明天
spring | chūntiān | 春天
summer | xiàtiān | 夏天
autumn | qiūtiān | 秋天
winter | dōngtiān | 冬天
'''

korean1_vocabulary_text = '''
dog | gae | 개
cat | goyang-i | 고양이
horse | mal | 말
mouse | jwi | 쥐
bird | sae | 새
cow | so | 소
fish | mulgogi | 물고기
man | namja | 남자
woman | yeoja | 여자
red | ppalgansaeg | 빨간색
blue | puleunsaeg | 푸른색
green | nogsaeg | 녹색
yellow | hwangsaeg | 황색
purple | bolasaeg | 보라색
university | daehag | 대학
student | hagsaeng | 학생
morning | achim | 아침
night | bam | 밤
yesterday | eoje | 어제
today | oneul | 오늘
tomorrow | naeil | 내일
spring | bom | 봄
summer | yeoleum | 여름
autumn | ga-eul | 가을
winter | gyeoul | 겨울
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

french_all_vocabulary_text = '''
place | lieu
Earth | Terre
world | monde
capital | capitale
city | ville
street | rue
forest | forêt
hill | colline
river | rivière
hypermarket | supermarché
bike | vélo
car | voiture
air plane | avion
house | maison
apartment | appartement
garden | jardin
living room | salon
kitchen | cuisine
bathroom | salle de bain
bedroom | chambre
toilet | toilette
window | fenêtre
door | porte
wall | mur
floor | sol
roof | plafond
furniture | meuble
bed | lit
chair | chaise
couch | canapé
wardrobe | armoire
device | appareil
heater | chauffage
washing machine | machine à laver
fridge | frigo
microwave | micro-onde
oven | four
clothes | habits
shirt | chemise
sweater | sweat
sweat shirt | pull
trousers | pantalon
skirt | jupe
suit | costume
dress | robe
shoes | chaussures
coat | manteau
suitcase | attaché case
bag | sac
object | objet
mobile | portable
computer | ordinateur
camera | appareil photo
video camera | caméra
television | télévision
book | livre
ballpoint pen | stylo
pencil | crayon
painting | peinture
color | couleur
white | blanc
black | noir
red | rouge
green | vert
blue | bleu
yellow | jaune
body | corps
brain | cerveau
head | tête
eye | oeil
nose | nez
mouth | bouche
ear | oreille
hair | cheveu
arm | bras
hand | main
finger | doigt
stomach | estomac
back | dos
bottom | fesse
leg | jambe
foot | pied
toe | orteil
food | nourriture
bread | pain
meat | viande
vegetable | légume
egg | oeuf
cheese | fromage
chocolate | chocolat
drink | boisson
water | eau
milk | lait
tea | thé
kitchenware | ustensiles
glass | verre
plate | assiette
fork | fourchette
knive | couteau
spoon | cuillère
person | personne
people | gens
man | homme
woman | femme
boy | garçon
girl | fille
father | père
mother | mère
child, baby | bébé
infant | enfant
brother | frère
sister | soeur
grand father | grand-père
grand mother | grand-mère
friend | ami
girlfriend | petite amie
boyfriend | petit ami
dog | chien
cat | chat
fish | poisson
bird | oiseau
cow | vache
chicken | poulet
sheep | mouton
goat | chèvre
turtle | tortue
insect | insecte
spider | araignée
ant | fourmi
snake | serpent
wolf | loup
dolphin | dauphin
snow | neige
idea | idée
thing | chose
word | mot
sentence | phrase
number | nombre
life | vie
work | travail
leisure | loisir
holidays | vacances
music | musique
game | jeu
beginning | début
end | fin
money | argent
difference | différence
day | jour
Monday | lundi
Tuesday | mardi
Wednesday | mercredi
Thursday | jeudi
Friday | vendredi
Saturday | samedi
Sunday | dimanche
month | mois
January | janvier
February | février
March | mars
April | avril
May | mai
June | juin
July | juillet
August | aout
September | septembre
October | octobre
November | novembre
December | décembre
season | saison
winter | hiver
spring | printemps
summer | été
autumn | automne
week | semaine
year | année
century | siècle
hour | heure
second | seconde
clock | horloge
yesterday | hier
today | aujourd'hui
tomorrow | demain
breakfast | petit déjeuner
lunch | déjeuner
dinner | diner
North | nord
South | sud
East | est
West | ouest
'''

japanese_vocab_all = parse-vocab japanese_all_vocabulary_text

# console.log 'num japanese words: ' + japanese_vocab_all.length

vietnamese_vocab_all = parse-vocab vietnamese_all_vocabulary_text

french_vocab_all = parse-vocab french_all_vocabulary_text

export flashcard_sets = {
  #'japanese1': parse-vocab japanese1_vocabulary_text
  'japanese1': japanese_vocab_all[0 til 50]
  'japanese2': japanese_vocab_all[50 til 100]
  'japanese3': japanese_vocab_all[100 til 150]
  'chinese1': parse-vocab chinese1_vocabulary_text
  'korean1': parse-vocab korean1_vocabulary_text
  #'vietnamese1': parse-vocab vietnamese1_vocabulary_text
  'vietnamese1': vietnamese_vocab_all[0 til 50]
  'french1': french_vocab_all[0 til 50]
  'french2': french_vocab_all[50 til 100]
  'french3': french_vocab_all[100 til 150]
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
