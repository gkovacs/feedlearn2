(function(){
  Polymer({
    is: 'small-edv',
    S: function(pattern){
      return $(this.$$(pattern));
    },
    nextword: function(){
      var random_idx, random_word, english, romaji, kanji, english_top;
      random_idx = Math.floor(
      Math.random() * vocabulary.length);
      random_word = vocabulary[random_idx];
      english = random_word.english, romaji = random_word.romaji, kanji = random_word.kanji;
      english_top = Math.random() >= 0.5;
      if (english_top) {
        this.S('#firstline').text('English:');
        this.S('#secondline').text('Japanese:');
        this.S('#speaker1').hide();
        this.S('#speaker2').show();
        this.S('#englishword').text(english);
        return this.S('#japaneseword').text(romaji);
      } else {
        this.S('#firstline').text('Japanese:');
        this.S('#secondline').text('English:');
        this.S('#speaker1').show();
        this.S('#speaker2').hide();
        this.S('#englishword').text(romaji);
        return this.S('#japaneseword').text(english);
      }
    },
    ready: function(){
      return this.nextword();
    }
    /*
    properties: {
      width: {
        type: Number
        value: 500
        #observer: 'size_changed'
      }
      height: {
        type: Number
        value: 300
        #observer: 'size_changed'
      }
    }
    S: (pattern) ->
      return $(this.$$(pattern))
    size_changed: ->
      $(this).css {
        width: this.width
        height: this.height
      }
      this.S('#edvframe').css {
        width: this.width
        height: this.height
      }
    */
  });
}).call(this);
