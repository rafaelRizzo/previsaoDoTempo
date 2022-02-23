document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;
    
    if(input !== ''){
        document.querySelector('.resultado').style.display = 'none';
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=63a771831c92844a67e67e9fa1a55df5&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        }else{
            showWarning('Não encontramos essa localização.')
            document.querySelector('.resultado').style.display = 'none';
        }
    } else{
        document.querySelector('.resultado').style.display = 'none';
    }
})

function showInfo(json){
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;

    document.querySelector('.resultado').style.display = 'block';

    if(json.temp >= 25){
        clearBG()
        document.body.style.backgroundColor = '#FFA059';
    } if(json.temp >= 0 && json.temp < 25){
        clearBG()
        document.body.style.backgroundColor = '#83C2BC';
    } if(json.temp < -1){
        clearBG()
        document.body.style.backgroundColor = '#AEC5C5';
    }
}

function clearBG(){
    document.querySelector('.img').style.display = 'none';    
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}