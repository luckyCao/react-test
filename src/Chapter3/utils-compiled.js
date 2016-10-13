var whitespace = "[\\x20\\t\\r\\n\\f]",
    identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
    matchExpr = {
  "ID": new RegExp("^#(" + identifier + ")"),
  "CLASS": new RegExp("^\\.(" + identifier + ")"),
  "TAG": new RegExp("^(" + identifier + "|[*])")
},
    rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g");

var Expr = {
  relative: {
    " ": { dir: "parentNode" }
  },
  filter: {
    "TAG": function (nodeNameSelector) {
      var nodeName = nodeNameSelector.toLowerCase();
      return nodeNameSelector === "*" ? function () {
        return true;
      } : function (elem) {
        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
      };
    },

    "CLASS": function (className) {
      var pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)");

      return function (elem) {
        return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
      };
    }
  }
};
export { whitespace, identifier, matchExpr, rcombinators, rtrim, Expr };

//# sourceMappingURL=utils-compiled.js.map