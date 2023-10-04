const replaceAt = (str, idx, value) => {
  return str.substring(0, idx) + value + str.substring(idx + value.length)
}

const scramble = (str) => {
  let rnd_idx = Math.floor(Math.random() * str.length)
  let rnd_ascii = Math.floor(Math.random() * 100)
  return replaceAt(str, rnd_idx, String.fromCharCode(rnd_ascii))
}

(function() {
  const nodes = document.querySelectorAll('a');

  nodes.forEach(node => {
    const name = node.textContent;
    node.addEventListener('click', () => gtag('event', 'click', { name }));

    node.addEventListener('mouseover', () => {
      gtag('event', 'mouseover', { name });

      let count = 0;
      let inter = setInterval(() => {
        node.textContent = scramble(node.textContent)
        count += 1;

        if (count === 10) {
          clearInterval(inter);
          node.textContent = name;
          count = 0;
        }
      }, 20)
    });
  })
})();
