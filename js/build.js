var LIST = [
  { name: 'Canada',     visited: true },
  { name: 'Australia',  visited: true },
  { name: 'Hawaii',     visited: false },
  { name: 'Peru',       visited: true },
  { name: 'Ukraine',    visited: true },
  { name: 'Norway',     visited: false },
  { name: 'Sweden',     visited: false },
].sort(function(a, b) {
  return a.name > b.name;
});

(function() {
  var opened = false
    , toggle = document.getElementsByClassName('toggle')[0]
    , travel = document.getElementById('travel')

  // handle toggle
  toggle.addEventListener('click', function() {
    this.opened = !this.opened;

    travel.className = this.opened ? 'open' : '';
    toggle.children[0].innerHTML = this.opened ? '-' : '+';
  });

  // populate travel list
  for (var i = 0; i < LIST.length; i++) {
    var li = document.createElement('li');
    var node = LIST[i];

    li.innerHTML = node.name;
    li.className = node.visited ? '' : 'soon';

    travel.appendChild(li);
  }
})();
