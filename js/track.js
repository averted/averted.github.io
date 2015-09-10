(function() {
  var nodes = [
    { id: 'js-now',    name: 'Now' },
    { id: 'js-past',   name: 'Past' },
    { id: 'js-github', name: 'GitHub' },
    { id: 'js-email',  name: 'Email' },
    { id: 'js-travel', name: 'Travel' },
  ];

  for (var i = 0; i < nodes.length; i++) {
    (function() {
      var node = document.getElementById(nodes[i].id);

      node.addEventListener('click', function() {
        ga("send", "event", "button", "click", nodes[i].name);
      });
    })();
  }
})();