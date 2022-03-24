export function render(data, callback) {
  const container = document.createElement('div');

  const renderListOfProperty = (src, listName) => {
      const pageContainer = document.createElement('div');
      const header = document.createElement('h2');
      const list = document.createElement('ul');

      header.classList.add('card-title');
      pageContainer.classList.add('px-2', 'py-2');
      list.classList.add('list-group', 'list-group-horizontal', 'flex-wrap');

      header.textContent = listName;
      list.style.border = '1px solid transparent';


      Promise.all(src.map(src => fetch(src).then(res => res.json()))).then(data => {
          data.map(item => {
              const li = document.createElement('li');
              li.classList.add('list-group-item', 'bg-transparent');
              li.style.border = '1px solid transparent';
              li.textContent = item.name;
              list.append(li);
          });
          const cardBody = document.querySelector('.card-body');
          pageContainer.append(header, list);
          cardBody.append(pageContainer);
          return data;
      })
  }

  document.body.style.background = `url(./img/stars.jpg)`;
  container.classList.add('container', 'py-4');
  container.style.backgroundColor = 'rgba(223, 190, 111, .8)';
  container.innerHTML = `
<div class="card mb-3 bg-transparent" style="max-width: 1024px; ">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="./img/episode-${data.episode_id}.jpg" class="img-fluid rounded-start" alt="${data.title}">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h2 class="card-title">Episode:${data.episode_id} ${data.title}</h2>
        <p class="card-text">${data.opening_crawl}</p>
      </div>
    </div>
  </div>
</div>
`;

  // создание goback кнопки
  const goBackBtn = document.createElement('a');
  goBackBtn.classList.add('btn', 'btn-primary');
  goBackBtn.textContent = 'Back to Episodes';
  goBackBtn.href = `index.html`;

  goBackBtn.addEventListener('click', e => {
      e.preventDefault();
      history.pushState(null, '', `${goBackBtn.href}`)
      callback();
  })

  container.append(goBackBtn);

  renderListOfProperty(data.planets, 'Planets');
  renderListOfProperty(data.species, 'Species');
  renderListOfProperty(data.starships, 'Starships');

  return container;
}
