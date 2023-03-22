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

      const imagem = document.querySelector('.imagem-clima');
      const temperatura = document.querySelector('.clima-box .temperatura');
      const descricao = document.querySelector('.descricao');
      const umidade = document.querySelector('.clima-detalhes .umidade span');
      const vento = document.querySelector('.clima-detalhes .vento span');

      const sunrise = json.sys.sunrise;
      const sunset = json.sys.sunset;

      // Supondo que você tenha obtido o fuso horário da região pesquisada
      const timezone = json.timezone;

      // Obter a hora atual no fuso horário do cliente
      const date = new Date();
      const localTime = date.getTime();
      const localOffset = date.getTimezoneOffset() * 60000;
      const utcTime = localTime + localOffset;
      const offset = timezone * 1000;
      const clientTime = utcTime + offset;

      // Converter os valores de sunrise e sunset para o horário local do fuso horário da região pesquisada
      const dateRise = new Date((sunrise + timezone) * 1000);
      const dateSet = new Date((sunset + timezone) * 1000);

      // Obter os horários de nascer e pôr do sol no horário local do fuso horário da região pesquisada
      const riseTime = dateRise.getTime();
      const setTime = dateSet.getTime();

      // Comparar a hora atual com os horários de nascer e pôr do sol para determinar se é dia ou noite
      let isday;
      if (clientTime > riseTime && clientTime < setTime) {
        isday = true;
        console.log('É dia');
      } else {
        isday = false;
        console.log('É noite');
      }
      console.log(json);

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
          case 'Mist':
            imagem.src = 'images/wind.png';
            break;
          case 'Snow':
            imagem.src = 'images/snowing.png';
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
