import { whitespace, Expr } from './utils';

function compile(selector, match /* Internal Use Only */) {
  var fun,
      elementMatchers = [];
  fun = matcherFromTokens(match);
  elementMatchers.push(fun);
  fun = matcherFromGroupMatchers(elementMatchers);
  return fun;
};

function matcherFromTokens(tokens) {
  var matcher,
      len = tokens.length,
      i = 0,
      matchers = [];

  for (; i < len; i++) {
    if (matcher = Expr.relative[tokens[i].type]) {
      matchers = [addCombinator(elementMatcher(matchers), matcher)];
    } else {
      matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
      matchers.push(matcher);
    }
  }

  return elementMatcher(matchers);
}

function matcherFromGroupMatchers(elementMatchers) {
  var superMatcher = function (seed, context, xml, results, outermost) {
    var elem,
        j,
        matcher,
        i = 0,
        unmatched = seed && [],
        elems = document.getElementsByTagName('*'),
        len = elems.length;

    for (; i !== len && (elem = elems[i]) != null; i++) {
      j = 0;
      while (matcher = elementMatchers[j++]) {
        if (matcher(elem, context || document, xml)) {
          results.push(elem);
          break;
        }
      }
    }
    return unmatched;
  };

  return superMatcher;
}

function addCombinator(matcher, combinator) {
  var dir = combinator.dir;

  return function (elem, context, xml) {

    while (elem = elem[dir]) {
      if (elem.nodeType === 1) {
        if (matcher(elem, context, xml)) {
          return true;
        }
      }
    }
  };
}

function elementMatcher(matchers) {
  return matchers.length > 1 ? function (elem, context, xml) {
    var i = matchers.length;
    while (i--) {
      if (!matchers[i](elem, context, xml)) {
        return false;
      }
    }
    return true;
  } : matchers[0];
}

export default compile;

//# sourceMappingURL=lite-sizzle-compiled.js.map