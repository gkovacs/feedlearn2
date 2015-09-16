Polymer {
  is: 'rectangular-edv'
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
