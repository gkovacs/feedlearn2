Polymer {
  is: 'banner-edv'
  /*
  S: (pattern) ->
    return $(this.$$(pattern))
  nextword: ->
    random_idx = Math.random() * vocabulary.length |> Math.floor
    random_word = vocabulary[random_idx]
    {english, romaji, kanji} = random_word
    this.S('#englishword').text english
    this.S('#japaneseword').text romaji
  ready: ->
    this.nextword()
  */
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
}
