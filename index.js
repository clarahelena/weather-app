const container = document.querySelector('.container');
const busca = document.querySelector('.busca button');
const erro404 = document.querySelector('.nao-encontrado');
const climaBox = document.querySelector('.clima-box');
const climaDetalhes = document.querySelector('.clima-detalhes');
const inputBusca = document.querySelector('.busca input');

busca.addEventListener('click', () => {
  const APIKey = 'f5807aa17688a7c46f2358123ed14cd4';
  const city = document.querySelector('.busca input').value;

  if (city === '') return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang=pt_br`,
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === '404') {
        container.style.height = '400px';
        erro404.style.display = 'block';
        erro404.classList.add('fadeIn');
        climaBox.style.display = 'none';
        climaDetalhes.style.display = 'none';
        return;
      }
      erro404.style.display = 'none';
      erro404.classList.remove('fadeIn');

      const imagem = document.querySelector('.imagem-clima');
      const temperatura = document.querySelector('.clima-box .temperatura');
      const descricao = document.querySelector('.descricao');
      const umidade = document.querySelector('.clima-detalhes .umidade span');
      const vento = document.querySelector('.clima-detalhes .vento span');

      // Hora atual
      const current_time = new Date(json.dt * 1000);

      // Obtem o nascer e o pôr do sol
      const sunrise = new Date(json.sys.sunrise * 1000);
      const sunset = new Date(json.sys.sunset * 1000);

      // Determina se é dia ou noite
      let isday;
      if (current_time >= sunrise && current_time <= sunset) {
        isday = true;
      } else {
        isday = false;
      }

      if (isday) {
        switch (json.weather[0].main) {
          case 'Clear':
            imagem.src = 'images/sunny.png';
            break;
          case 'Rain':
            imagem.src = 'images/rain.png';
            break;
          case 'Clouds':
            imagem.src = 'images/cloudy.png';
            break;
          case 'Haze':
            imagem.src = 'images/wind.png';
            break;
          case 'Snow':
            imagem.src = 'images/snowing.png';
            break;
          case 'Thunderstorm':
            imagem.src = 'images/thunder.png';
            break;
          case 'Dust':
            imagem.src = 'images/sandstorm.png';
            break;
          case 'Sand':
            imagem.src = 'images/sandstorm.png';
            break;
          case 'Drizzle':
            imagem.src = 'images/drizzle.png';
            break;
          case 'Mist':
            imagem.src = 'images/fog.png';
            break;
          case 'Smoke':
            imagem.src = 'images/fog.png';
            break;
          case 'Fog':
            imagem.src = 'images/fog.png';
            break;
          case 'Ash':
            imagem.src = 'images/fog.png';
            break;
          case 'Squall':
            imagem.src = 'images/fog.png';
            break;
          case 'Tornado':
            imagem.src = 'images/tornado.png';
            break;
          default:
            imagem.src = '';
        }
      } else {
        switch (json.weather[0].main) {
          case 'Clear':
            imagem.src = 'images/moony.png';
            break;
          case 'Rain':
            imagem.src = 'images/rain.png';
            break;
          case 'Clouds':
            imagem.src = 'images/cloudymoon.png';
            break;
          case 'Mist':
            imagem.src = 'images/wind.png';
            break;
          case 'Snow':
            imagem.src = 'images/snowing.png';
            break;
          case 'Thunderstorm':
            imagem.src = 'images/thunder.png';
            break;
          case 'Dust':
            imagem.src = 'images/sandstorm.png';
            break;
          case 'Sand':
            imagem.src = 'images/sandstorm.png';
            break;
          case 'Drizzle':
            imagem.src = 'images/drizzle.png';
            break;
          case 'Mist':
            imagem.src = 'images/fog.png';
            break;
          case 'Smoke':
            imagem.src = 'images/fog.png';
            break;
          case 'Fog':
            imagem.src = 'images/fog.png';
            break;
          case 'Ash':
            imagem.src = 'images/fog.png';
            break;
          case 'Squall':
            imagem.src = 'images/fog.png';
            break;
          case 'Tornado':
            imagem.src = 'images/tornado.png';
            break;
          default:
            imagem.src = '';
        }
      }

      temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      descricao.innerHTML = `${json.weather[0].description}`;
      umidade.innerHTML = `${json.main.humidity}%`;
      vento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      container.style.height = '600px';
      climaBox.style.display = '';
      climaBox.classList.add('fadeIn');
      climaDetalhes.style.display = '';
      climaDetalhes.classList.add('fadeIn');
    });
});

inputBusca.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    busca.click();
  }
});
