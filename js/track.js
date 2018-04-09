(function() {
  var nodes = [
    { id: 'js-now',    name: 'Now' },
    { id: 'js-past',   name: 'Past' },
    { id: 'js-github', name: 'GitHub' },
    { id: 'js-email',  name: 'Email' },
    { id: 'js-travel', name: 'Travel' },
    { id: 'js-sportling', name: 'Sportling' },
    { id: 'js-climbee', name: 'Climbee' },
    { id: 'js-sf-muni', name: 'SF Muni' },
  ];

  for (var i = 0; i < nodes.length; i++) {
    (function() {
      var node = document.getElementById(nodes[i].id)
        , name = nodes[i].name;

      node.addEventListener('click', function() {
        ga('send', 'event', 'button', 'click', name);
      });

      node.addEventListener('mouseover', function() {
        ga('send', 'event', 'button', 'mouseover', name);
      });
    })();
  }
})();
