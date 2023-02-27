const searchAllData = (id) => {
  const inputElement = document.getElementById('search-value');
  const inputValue = inputElement.value;
  document.getElementById('single-player-details').innerHTML = '';
  document.getElementById('male').classList.add('d-none');
  document.getElementById('female').classList.add('d-none');
  document.getElementById('spinner').classList.remove('d-none');

  const searchId = id || inputValue
  const URL = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchId}`
  console.log(URL);

  fetch(URL)
    .then(res => res.json())
    .then(data => {
      document.getElementById('spinner').classList.add('d-none');
      showPlayersData(data.player)
    });
};


const showPlayersData = (players) => {
  document.getElementById('search-value').value = '';
  const playerInfo = document.getElementById('player-info');
  playerInfo.innerHTML = '';

  players.forEach(player => {
    const { strThumb, strPlayer, strNationality, idPlayer } = player;
    // console.log(player);
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card">
      <img src="${strThumb ? strThumb : 'https://picsum.photos/200'}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${strPlayer}</h5>
        <p class="card-text">Nationality: ${strNationality}</p>
      </div>
      <div class="my-5 mx-3">
        <button onclick="singlePlayer('${idPlayer}')" type="button" class="btn btn-primary">Details</button>
        <button type="button" class="btn btn-danger">Delete</button>
      </div>
    </div>
        `
    playerInfo.appendChild(div);
  });
}

document.getElementById('search-value').addEventListener('keypress', function (event) {
  // console.log(event.key);
  if (event.key === 'Enter') {
    searchAllData();
  }
})

const singlePlayer = (id) => {
  // console.log(id);
  const URL = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`
  fetch(URL)
    .then(res => res.json())
    .then(data => showSinglePlayer(data.players[0]));
};

const showSinglePlayer = (data) => {
  console.log(data);
  const singlePlayerContainer = document.getElementById('single-player-details');
  const { strThumb, strPlayer, strDescriptionEN, strGender } = data;

  const div = document.createElement('div');
  if (strGender === 'Male') {
    document.getElementById('male').classList.remove('d-none');
  }
  else {
    document.getElementById('female').classList.remove('d-none');
  }
  div.innerHTML = `
      <div class="card mb-3 w-100 h-100">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${strThumb}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${strPlayer}</h5>
            <p class="card-text">${strDescriptionEN.slice(0, 100) + '....'}</p>
          </div>
        </div>
      </div>
    </div>
  `
  singlePlayerContainer.appendChild(div)
}

searchAllData('neymar');