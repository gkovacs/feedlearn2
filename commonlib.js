(function(){
  var root, firstNonNull, out$ = typeof exports != 'undefined' && exports || this, slice$ = [].slice;
  root = typeof exports != 'undefined' && exports !== null ? exports : this;
  out$.firstNonNull = firstNonNull = function(){
    var args, i$, len$, x;
    args = slice$.call(arguments);
    for (i$ = 0, len$ = args.length; i$ < len$; ++i$) {
      x = args[i$];
      if (x != null) {
        return x;
      }
    }
  };
}).call(this);
