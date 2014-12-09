(function(){
  var root, parseVocab, japanese_all_vocabulary_text, chinese1_vocabulary_text, korean1_vocabulary_text, vietnamese_all_vocabulary_text, japanese_vocab_all, vietnamese_vocab_all, flashcard_sets, language_names, language_codes, flashcard_name_aliases, slice$ = [].slice, out$ = typeof exports != 'undefined' && exports || this;
  root = typeof exports != 'undefined' && exports !== null ? exports : this;
  parseVocab = function(){
    var vocab_text_list, output, i$, len$, vocab_text, j$, ref$, len1$, line, parts, english, romaji, kanji;
    vocab_text_list = slice$.call(arguments);
    output = [];
    for (i$ = 0, len$ = vocab_text_list.length; i$ < len$; ++i$) {
      vocab_text = vocab_text_list[i$];
      for (j$ = 0, len1$ = (ref$ = vocab_text.split('\n')).length; j$ < len1$; ++j$) {
        line = ref$[j$];
        line = line.trim();
        if (line.length > 0 && line[0] !== '#') {
          parts = line.split('|');
          english = parts[0].trim();
          romaji = parts[1].trim();
          if (parts.length > 2) {
            kanji = parts[2].trim();
          } else {
            kanji = romaji;
          }
          output.push({
            english: english,
            romaji: romaji,
            kanji: kanji,
            idx: output.length
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
  japanese_all_vocabulary_text = '# people\n\nperson | hito | 人\nman | otoko | 男\nwoman | onna | 女\nchildren | kodomo | 子供\nfamily | kazoku | 家族\n# I, myself | watashi | 私\n# girl | shōjo | 少女\n# boy | shōnen | 少年\n\n# occupations\n\ndoctor | isha | 医者\nnurse | kangoshi | 看護師\ndentist | shikai | 歯科医\npolitician | seijika | 政治家\nlawyer | bengoshi | 弁護士\nfirefighter | shōbōshi | 消防士\nsoldier | heishi | 兵士\narchitect | kenchikuka | 建築家\nteacher | sensei | 先生\nsinger | kashu | 歌手\n\n# body\n\nfoot | ashi | 足\nhead | atama | 頭\nface | kao | 顔\nmouth | kuchi | 口\nlips | kuchibiru | 唇\nhair | kami | 髪\near | mimi | 耳\narm | ude | 腕\nfinger | yubi | 指\nneck | kubi | 首\nheart | shinzō | 心臓\nchest | mune | 胸\nillness | byōki | 病気\n\n# family\n\nparents | oya | 親\nfather | chichi | 父\nmother | haha | 母\nwife | tsuma | 妻\nhusband | otto | 夫\n# older brother | ani | 兄\n# older sister | ane | 姉\nyounger brother | otōto | 弟\nyounger sister | imōto | 妹\n# siblings | kyōdai | 兄弟\ngrandfather | sofu | 祖父\ngrandmother | sobo | 祖母\ngrandchild | mago | 孫\nuncle | oji | 叔父\naunt | oba | 叔母\n\n# life\n\n# living creatures | ikimono | 生き物\nmonster | bakemono | 化け物\n\n# animals\n\nanimal | dōbutsu | 動物\ndog | inu | 犬\ncat | neko | 猫\ncow | ushi | 牛\npig | buta | 豚\nhorse | uma | 馬\nsheep | hitsuji | 羊\nmonkey | saru | 猿\nmouse | nezumi | 鼠\ntiger | tora | 虎\nwolf | ōkami | 狼\nrabbit | usagi | 兎\ndragon | ryū | 竜\ndeer | shika | 鹿\nfrog | kaeru | カエル\n# toad | hikigaeru | ヒキガエル\nlion | shishi | 獅子\ngiraffe | kirin | キリン\nelephant | zō | 像\nbird | tori | 鳥\nchicken | niwatori | 鶏\nsparrow | suzume | 雀\ncrow | karasu | 烏\neagle | washi | 鷲\n# hawk, falcon | taka | 鷹\nfish | sakana | 魚\nshrimp | ebi | 蝦\ntuna | maguro | 鮪\noctopus | tako | タコ\ninsect | mushi | 虫\nbutterfly | chō | 蝶\nspider | kumo | クモ\nfirefly | hotaru | 蛍\ncockroach | gokiburi | ゴキブリ\nearthworm | mimizu | ミミズ\nlizard | tokage | トカゲ\nsnake | hebi | 蛇\n\n# plants\n\nplants | shokubutsu | 植物\ngrass | kusa | 草\nflower | hana | 花\ntree | ki | 木\nmushroom | kinoko | キノコ\n\n# crops\n\nuncooked rice | kome | コメ\nwheat, oats | mugi | 麦\nvegetable | yasai | 野菜\nyam, potato | imo | 芋\nbeans | mame | 豆\nfruit | kudamono | 果物\ncarrot | ninjin | 人参\napple | ringo | リンゴ\norange | mikan | ミカン\npear | nashi | 梨\nchestnut | kuri | 栗\npeach | momo | 桃\n# tomato | banka | バンカ\nwatermelon | suika | 水瓜\n\n# food\n\nbreakfast | asagohan | 朝ご飯\nlunch | hirugohan | 昼ご飯\nsupper | bangohan | 晩ご飯\ncooked rice, food | gohan | ご飯\ncooking | ryōri | 料理\n\n# drink\n\nbeverage | nomimono | 飲み物\nmilk | gyūnyū | 牛乳\n\n# seasoning\n\nsugar | satō | 砂糖\nsalt | shio | 塩\nsoy sauce | shōyu | 醤油\n\n# time and space\n\ntime | jikan | 時間\nday | nichi | 日\nmonth | gatsu | ガツ\nyear | toshi | トシ\n# last year | kyōnen | \n# this year | kotoshi | \n# next year | rainen | \ntoday | kyō | 今日\nyesterday | kinō | 昨日\ntomorrow | ashita | 明日\nmorning | asa | 朝\nnight | yoru | 夜\nmoon | tsuki | ツキ\nstar | hoshi | 星\nweather | tenki | 天気\nrain | ame | 雨\ncloudy | kumori | 曇り\nsnow | yuki | 雪\nwind | kaze | 風\nthunder | kaminari | 雷\nstorm | arashi | 嵐\nsky | sora | 空\n\n# directions and positions\n\neast | higashi | ヒガシ\nwest | nishi | 西\nsouth | minami | 南\nnorth | kita | 北\n# here | koko | ここ\n# there | soko | そこ\n# over there | asoko | あそこ\nright (direction) | migi | 右\nleft (direction) | hidari | 左\nabove, up | ue | うえ\nbelow, down | shita | した\nin front of | mae | 前\nbehind | ushiro | 後ろ\n\n# materials\n\nwater | mizu | 水\nice | kōri | 氷\nearth, ground | tsuchi | 土\n\n# society\n\nsociety | shakai | 社会\neconomy | keizai | 経済\ncompany | kaisha | 会社\nmeeting | kaigi | 会議\nschool | gakkō | 学校\nstore | mise | 店\nfactory | kōjō | 工場\nmoney | okane | お金\nticket | kippu | 切符\n\n# man made objects\n\n# home\n\ndesk | tsukue | 机\nwindow | mado | 窓\nelectricity | denki | 電気\n\n# tools\n\nbag | fukuro | 袋\numbrella | kasa | 傘\n\n# stationery\n\ndiary | nikki | 日記\npencil | enpitsu | 鉛筆\neraser | keshigomu | 消しゴム\nscissors | hasami | ハサミ\n\n# clothes\n\nclothes | fuku | 服\nshoes | kutsu | 靴\nglasses | megane | 眼鏡\n\n# transport \n\nrailway | tetsudō | 鉄道\nairplane | hikōki | 飛行機\nstreet | michi | 道\ntrain | densha | 電車\ncar | jidōsha | 自動車\n\n# language\n\nletter | tegami | 手紙\nenglish | eigo | 英語\nnewspaper | shinbun | 新聞\ndictionary | jisho | 辞書\n\n# colors\n\ncolor | iro | 色\nred | aka | 赤\nyellow | kiiro | 黄色\ngreen | midori | 緑\nblue | ao | 青\npurple | murasaki | 紫\nwhite | shiro | 白\nblack | kuro | 黒\nbrown | chairo | 茶色\ngrey | haiiro | 灰色\n\n# others\n\nmusic | ongaku | 音楽\nhistory | rekishi | 歴史\ngeography | chiri | 地理\nphysical education | taiiku | 体育\ninformation | jōhō | 情報\nstudy | benkyō | 勉強\n\n# numbers\n\n# zero | rei | レイ\none | ichi | 一\ntwo | ni | 二\nthree | san | 三\nfour | yon | 四\nfive | go | 五\nsix | roku | 六\nseven | nana | 七\neight | hachi | 八\nnine | kyū | 九\nten | jū | 十\nhundred | hyaku | 百\n';
  chinese1_vocabulary_text = 'dog | gǒu | 狗\ncat | māo | 猫\nhorse | mǎ | 马\nmouse | lǎoshǔ | 老鼠\nbird | niǎo | 鸟\ncow | niú | 牛\nfish | yú | 鱼\nman | nánrén | 男人\nwoman | nǚrén | 女人\nred | hóng sè | 红色\nblue | lán sè | 蓝色\ngreen | lǜ sè | 绿色\nyellow | huáng sè | 黄色\npurple | zǐ sè | 紫色\nuniversity | dàxué | 大学\nstudent | xuéshēng | 学生\nmorning | zǎoshàng | 早上\nnight | yèwǎn | 夜晚\nyesterday | zuótiān | 昨天\ntoday | jīntiān | 今天\ntomorrow | míngtiān | 明天\nspring | chūntiān | 春天\nsummer | xiàtiān | 夏天\nautumn | qiūtiān | 秋天\nwinter | dōngtiān | 冬天';
  korean1_vocabulary_text = 'dog | gae | 개\ncat | goyang-i | 고양이\nhorse | mal | 말\nmouse | jwi | 쥐\nbird | sae | 새\ncow | so | 소\nfish | mulgogi | 물고기\nman | namja | 남자\nwoman | yeoja | 여자\nred | ppalgansaeg | 빨간색\nblue | puleunsaeg | 푸른색\ngreen | nogsaeg | 녹색\nyellow | hwangsaeg | 황색\npurple | bolasaeg | 보라색\nuniversity | daehag | 대학\nstudent | hagsaeng | 학생\nmorning | achim | 아침\nnight | bam | 밤\nyesterday | eoje | 어제\ntoday | oneul | 오늘\ntomorrow | naeil | 내일\nspring | bom | 봄\nsummer | yeoleum | 여름\nautumn | ga-eul | 가을\nwinter | gyeoul | 겨울';
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
  vietnamese_all_vocabulary_text = '# time\n\nweek | tuần\nyear | năm\ntoday | hôm nay\ntomorrow | ngày mai\nyesterday | hôm qua\ncalendar | lịch\n# second | giây\n# hour | giờ\n# minute | phút\nclock | đồng hồ\n\n# seasons\n\nspring | mùa xuân\nsummer | mùa hè\nautumn | mùa thu\nwinter | mùa đông\n\n# time of day\n\nmorning | buổi sáng\nnight | đêm\n\n# students\n\nuniversity | trường đại học\nstudent | sinh viên\n\n# numbers\n\none | một\ntwo | hai\nthree | ba\nfour | bốn\nfive | năm\nsix | sáu\nseven | bảy\neight | tám\nnine | chín\nten | mười\n\n# body parts\n\nleg | chân\nhead | đầu\nhand | tay\n\n# employment\n\nnurse | y tá\nemployee | nhân viên\npolice officer | cảnh sát\nchef | đầu bếp\nengineer | kỹ sư\ndoctor | bác sĩ\nmanager | người quản lý\nteacher | giáo sư\n\n# animals\n\ndog | chó\ncat | con mèo\nhorse | ngựa\nmouse | chuột\nbird | chim\ncow | bò\nfish | cá\n\n# people\n\nman | đàn ông\nwoman | đàn bà\n\n# colors\n\nred | đỏ\nblue | xanh lam\ngreen | xanh lá cây\nyellow | vàng\npurple | màu đỏ tía';
  japanese_vocab_all = parseVocab(japanese_all_vocabulary_text);
  console.log('num japanese words: ' + japanese_vocab_all.length);
  vietnamese_vocab_all = parseVocab(vietnamese_all_vocabulary_text);
  out$.flashcard_sets = flashcard_sets = {
    'japanese1': [japanese_vocab_all[0], japanese_vocab_all[1], japanese_vocab_all[2], japanese_vocab_all[3], japanese_vocab_all[4], japanese_vocab_all[5], japanese_vocab_all[6], japanese_vocab_all[7], japanese_vocab_all[8], japanese_vocab_all[9], japanese_vocab_all[10], japanese_vocab_all[11], japanese_vocab_all[12], japanese_vocab_all[13], japanese_vocab_all[14], japanese_vocab_all[15], japanese_vocab_all[16], japanese_vocab_all[17], japanese_vocab_all[18], japanese_vocab_all[19], japanese_vocab_all[20], japanese_vocab_all[21], japanese_vocab_all[22], japanese_vocab_all[23], japanese_vocab_all[24], japanese_vocab_all[25], japanese_vocab_all[26], japanese_vocab_all[27], japanese_vocab_all[28], japanese_vocab_all[29], japanese_vocab_all[30], japanese_vocab_all[31], japanese_vocab_all[32], japanese_vocab_all[33], japanese_vocab_all[34], japanese_vocab_all[35], japanese_vocab_all[36], japanese_vocab_all[37], japanese_vocab_all[38], japanese_vocab_all[39], japanese_vocab_all[40], japanese_vocab_all[41], japanese_vocab_all[42], japanese_vocab_all[43], japanese_vocab_all[44], japanese_vocab_all[45], japanese_vocab_all[46], japanese_vocab_all[47], japanese_vocab_all[48], japanese_vocab_all[49]],
    'japanese2': [japanese_vocab_all[50], japanese_vocab_all[51], japanese_vocab_all[52], japanese_vocab_all[53], japanese_vocab_all[54], japanese_vocab_all[55], japanese_vocab_all[56], japanese_vocab_all[57], japanese_vocab_all[58], japanese_vocab_all[59], japanese_vocab_all[60], japanese_vocab_all[61], japanese_vocab_all[62], japanese_vocab_all[63], japanese_vocab_all[64], japanese_vocab_all[65], japanese_vocab_all[66], japanese_vocab_all[67], japanese_vocab_all[68], japanese_vocab_all[69], japanese_vocab_all[70], japanese_vocab_all[71], japanese_vocab_all[72], japanese_vocab_all[73], japanese_vocab_all[74], japanese_vocab_all[75], japanese_vocab_all[76], japanese_vocab_all[77], japanese_vocab_all[78], japanese_vocab_all[79], japanese_vocab_all[80], japanese_vocab_all[81], japanese_vocab_all[82], japanese_vocab_all[83], japanese_vocab_all[84], japanese_vocab_all[85], japanese_vocab_all[86], japanese_vocab_all[87], japanese_vocab_all[88], japanese_vocab_all[89], japanese_vocab_all[90], japanese_vocab_all[91], japanese_vocab_all[92], japanese_vocab_all[93], japanese_vocab_all[94], japanese_vocab_all[95], japanese_vocab_all[96], japanese_vocab_all[97], japanese_vocab_all[98], japanese_vocab_all[99]],
    'japanese3': [japanese_vocab_all[100], japanese_vocab_all[101], japanese_vocab_all[102], japanese_vocab_all[103], japanese_vocab_all[104], japanese_vocab_all[105], japanese_vocab_all[106], japanese_vocab_all[107], japanese_vocab_all[108], japanese_vocab_all[109], japanese_vocab_all[110], japanese_vocab_all[111], japanese_vocab_all[112], japanese_vocab_all[113], japanese_vocab_all[114], japanese_vocab_all[115], japanese_vocab_all[116], japanese_vocab_all[117], japanese_vocab_all[118], japanese_vocab_all[119], japanese_vocab_all[120], japanese_vocab_all[121], japanese_vocab_all[122], japanese_vocab_all[123], japanese_vocab_all[124], japanese_vocab_all[125], japanese_vocab_all[126], japanese_vocab_all[127], japanese_vocab_all[128], japanese_vocab_all[129], japanese_vocab_all[130], japanese_vocab_all[131], japanese_vocab_all[132], japanese_vocab_all[133], japanese_vocab_all[134], japanese_vocab_all[135], japanese_vocab_all[136], japanese_vocab_all[137], japanese_vocab_all[138], japanese_vocab_all[139], japanese_vocab_all[140], japanese_vocab_all[141], japanese_vocab_all[142], japanese_vocab_all[143], japanese_vocab_all[144], japanese_vocab_all[145], japanese_vocab_all[146], japanese_vocab_all[147], japanese_vocab_all[148], japanese_vocab_all[149]],
    'chinese1': parseVocab(chinese1_vocabulary_text),
    'korean1': parseVocab(korean1_vocabulary_text),
    'vietnamese1': [vietnamese_vocab_all[0], vietnamese_vocab_all[1], vietnamese_vocab_all[2], vietnamese_vocab_all[3], vietnamese_vocab_all[4], vietnamese_vocab_all[5], vietnamese_vocab_all[6], vietnamese_vocab_all[7], vietnamese_vocab_all[8], vietnamese_vocab_all[9], vietnamese_vocab_all[10], vietnamese_vocab_all[11], vietnamese_vocab_all[12], vietnamese_vocab_all[13], vietnamese_vocab_all[14], vietnamese_vocab_all[15], vietnamese_vocab_all[16], vietnamese_vocab_all[17], vietnamese_vocab_all[18], vietnamese_vocab_all[19], vietnamese_vocab_all[20], vietnamese_vocab_all[21], vietnamese_vocab_all[22], vietnamese_vocab_all[23], vietnamese_vocab_all[24], vietnamese_vocab_all[25], vietnamese_vocab_all[26], vietnamese_vocab_all[27], vietnamese_vocab_all[28], vietnamese_vocab_all[29], vietnamese_vocab_all[30], vietnamese_vocab_all[31], vietnamese_vocab_all[32], vietnamese_vocab_all[33], vietnamese_vocab_all[34], vietnamese_vocab_all[35], vietnamese_vocab_all[36], vietnamese_vocab_all[37], vietnamese_vocab_all[38], vietnamese_vocab_all[39], vietnamese_vocab_all[40], vietnamese_vocab_all[41], vietnamese_vocab_all[42], vietnamese_vocab_all[43], vietnamese_vocab_all[44], vietnamese_vocab_all[45], vietnamese_vocab_all[46], vietnamese_vocab_all[47], vietnamese_vocab_all[48], vietnamese_vocab_all[49]]
  };
  out$.language_names = language_names = {
    'japanese1': 'Japanese',
    'japanese2': 'Japanese',
    'japanese3': 'Japanese',
    'chinese1': 'Chinese',
    'korean1': 'Korean',
    'vietnamese1': 'Vietnamese'
  };
  out$.language_codes = language_codes = {
    'Japanese': 'ja',
    'Chinese': 'zh-CN',
    'Korean': 'ko',
    'Vietnamese': 'vi'
  };
  out$.flashcard_name_aliases = flashcard_name_aliases = {
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
}).call(this);
