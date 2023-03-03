const container = document.querySelector('.container');
const busca = document.querySelector('.busca button');
const erro404 = document.querySelector('.nao-encontrado');
const climaBox = document.querySelector('.clima-box');
const climaDetalhes = document.querySelector('.clima-detalhes');

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

      const imagem = document.querySelector('.clima-box img');
      const temperatura = document.querySelector('.clima-box .temperatura');
      const descricao = document.querySelector('.descricao');
      const umidade = document.querySelector('.clima-detalhes .umidade span');
      const vento = document.querySelector('.clima-detalhes .vento span');

      const sunriseBruto = new Date(json.sys.sunrise * 1000);
      const sunsetBruto = new Date(json.sys.sunset * 1000);
      const sunriseLimpo = parseInt(sunriseBruto.toLocaleTimeString());
      const sunsetLimpo = parseInt(sunsetBruto.toLocaleTimeString());
      const hora = new Date().getHours();
      const dia = hora >= sunriseLimpo && hora <= sunsetLimpo;

      switch (json.weather[0].main) {
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

        default:
          imagem.src = '';
      }

      if (json.weather[0].main == 'Clear' && dia) {
        imagem.src = 'images/sunny.png';
      } else {
        imagem.src = 'images/moony.png';
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
