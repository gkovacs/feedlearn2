root = exports ? this

export first-non-null = (...args) ->
  for x in args
    if x?
      return x

