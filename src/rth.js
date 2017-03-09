    if (!window.console) console = {log: function(){ }, error: function(){ }};
    
    function convert(roman) {
      var hangul = [];
      var node = HANGUL_TRIE;
      for (var i = roman.length - 1; i >= 0; --i) {
        var r = roman[i].toUpperCase();
        var next = node[r];
        if (!next && node["$"]) {
          hangul.push(node["$"]);
          next = HANGUL_TRIE[r];
        }
        if (!next) {
          if (roman[i] != "-") hangul.push(roman[i]);
          next = HANGUL_TRIE;
        }
        node = next;
      }
      if (node["$"]) hangul.push(node["$"]);
      return hangul.reverse().join("");
    }
    
    function onRomanChanged() {
      var hangul = convert($("roman").value);
      var encHangul = encodeURIComponent(hangul);
      $("hangul").value = hangul;
      $("google_ko").href = "http://www.google.co.kr/search?hl=ko&q=" + encHangul;
      $("naver_jpdic").href = "http://jpdic.naver.com/search.nhn?query=" + encHangul;
    }
    
    function init() {
      onRomanChanged();
      new Form.Element.Observer("roman", 0.2, onRomanChanged);
    }
    
    Event.observe(window, "load", init);
    