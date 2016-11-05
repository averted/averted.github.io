var COUNTRIES = [
  {
    name: 'Canada',
    visited: true,
    cities: [
      { name: 'Toronto', visited: true },
      { name: 'Montreal', visited: true },
      { name: 'Ottawa', visited: false },
      { name: 'Banff', visited: false },
      { name: 'Vancouver', visited: false },
    ]
  },
  {
    name: 'Australia',
    visited: true,
    cities: [
      { name: 'Brisbane', visited: true },
      { name: 'Cairns', visited: true },
      { name: 'Alice Springs', visited: false },
      { name: 'Darwin', visited: true },
      { name: 'Sydney', visited: false },
      { name: 'Melbourne', visited: true },
      { name: 'Perth', visited: false },
    ]
  },
  {
    name: 'USA',
    visited: false,
    cities: [
      { name: 'Chicago', visited: true },
      { name: 'New York', visited: true },
      { name: 'Washington', visited: false },
      { name: 'San Francisco', visited: false },
      { name: 'Los Angeles', visited: false },
    ]
  },
  {
    name: 'Peru',
    visited: true,
    cities: [
      { name: 'Arequipa', visited: true },
      { name: 'Machu Picchu', visited: true },
      { name: 'Cusco', visited: true },
      { name: 'Puno', visited: true },
      { name: 'Lima', visited: false },
    ]
  },
  {
    name: 'Europe',
    visited: true,
    cities: [
      { name: 'Amsterdam', visited: false },
      { name: 'Rome', visited: true },
      { name: 'Paris', visited: true },
      { name: 'London', visited: true },
      { name: 'Prague', visited: false },
      { name: 'Munich', visited: false },
    ]
  },
  {
    name: 'Norway',
    visited: false,
    cities: [
      { name: 'Oslo', visited: false },
      { name: 'Trolltunga', visited: false },
      { name: 'Bergen', visited: false },
    ]
  },
].sort(function(a, b) {
  return a.name > b.name;
});

(function() {
  var opened = false
    , toggle = document.getElementsByClassName('toggle')[0]
    , travel = document.getElementById('travel')

  // toggle listener
  toggle.addEventListener('click', function() {
    this.opened = !this.opened;

    travel.className = this.opened ? 'open' : '';
    toggle.children[0].innerHTML = this.opened ? '-' : '+';
  });

  // countries
  for (var i = 0; i < COUNTRIES.length; i++) {
    var ul = document.createElement('ul')
      , title = document.createElement('li')
      , node = COUNTRIES[i];

    title.innerHTML = node.name;
    title.className = 'title';
    ul.appendChild(title);

    // cities
    for (var j = 0; j < node.cities.sort(function(a, b) { return a.name > b.name }).length; j++) {
      var li = document.createElement('li')
        , city = node.cities[j];

      li.innerHTML = '&#45;&nbsp;' + city.name;
      li.className = city.visited ? '' : 'soon';

      ul.appendChild(li);
    }

    travel.appendChild(ul);
  }
})();
