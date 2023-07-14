(function() {
  var nodes = [
    { id: 'js-now',    name: 'Now' },
    { id: 'js-past',   name: 'Past' },
    { id: 'js-sportling', name: 'Sportling' },
    { id: 'js-climbee', name: 'Climbee' },
    { id: 'js-sf-muni', name: 'SF Muni' },
  ];

  for (var i = 0; i < nodes.length; i++) {
    (function() {
      var node = document.getElementById(nodes[i].id);
      var name = nodes[i].name;

      node.addEventListener('click', function() {
        gtag('event', 'click', { name })
      });

      node.addEventListener('mouseover', function() {
        gtag('event', 'mouseover', { name })
      });
    })();
  }
})();
