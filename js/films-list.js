export function render(data, callback) {

  const container = document.createElement('div');
  const body = document.querySelector('body')
  container.classList.add(
      'container',
      'd-flex',
      'justify-content-between',
      'flex-wrap',
      'py-4'
  );
  body.style.backgroundImage = "url('./img/stars.jpg')";


  for (const film of data.results) {
      const filmCard = document.createElement('div');
      const image = document.createElement('img');
      const cardBody = document.createElement('div');
      const title = document.createElement('h5');
      const episodeNumber = document.createElement('p');
      const detailsButton = document.createElement('a');

      filmCard.classList.add('card', 'my-2');
      title.classList.add('card-title', 'card-body', 'text-center');
      cardBody.classList.add('card-body');
      episodeNumber.classList.add('card-text', 'display-5', 'card-body', 'text-center', 'episode-number');
      detailsButton.classList.add('btn', 'btn-primary');
      image.classList.add('img-fluid', 'rounded-start');
      image.src = `./img/episode-${film.episode_id}.jpg`;
      image.alt = `${film.title}`;
      filmCard.append(image, title, cardBody, detailsButton);
      cardBody.append(episodeNumber);


      let episodeNum;
      for (let i = 1; i < 7; i++) {
          if (i === film.episode_id && i === 4) {
              episodeNum = "I";
          } else if (i === film.episode_id && i === 5) {
              episodeNum = "II";
          } else if (i === film.episode_id && i === 6) {
              episodeNum = "III";
          } else if (i === film.episode_id && i === 1) {
              episodeNum = "IV";
          } else if (i === film.episode_id && i === 2) {
              episodeNum = "V";
          } else if (i === film.episode_id && i === 3) {
              episodeNum = "VI";
          }
      }
      filmCard.style.width = '15%';
      image.style.minHeight = '300px';
      title.style.minHeight = '80px';
      title.textContent = film.title;
      episodeNumber.textContent = episodeNum;
      detailsButton.textContent = 'More';
      detailsButton.href = `?itemId=${film.episode_id}`;
      filmCard.style.backgroundColor = 'rgba(223, 190, 111, .8)';


      detailsButton.addEventListener('click', e => {
          e.preventDefault();
          history.pushState(null, '', `${detailsButton.href}`);
          callback();
      })

      container.append(filmCard);
  }

  return container;

}
