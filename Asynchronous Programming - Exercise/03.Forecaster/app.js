function attachEvents() {

    let urlBase = `http://localhost:3030/jsonstore/forecaster/locations/`;
    let input = document.getElementById('location');
    let inputBtn = document.getElementById('submit');
    let divForcast = document.getElementById('forecast');
    let current = document.getElementById('current');
    let upcoming = document.getElementById('upcoming');
    let cityCode = '';

    let conditions = {
        'Sunny':        '&#x2600',// ☀
        'Partly sunny': '&#x26C5',// ⛅
        'Overcast':     '&#x2601',// ☁
        'Rain':         '&#x2614',// ☂
        'Degrees':      '&#176'   // °
    }

    inputBtn.addEventListener('click', submit);

    let forecasts = document.createElement('div');
    let upcomings = document.createElement('div');

    function submit() {
        forecasts.innerHTML = '';
        upcomings.innerHTML = '';
      
        fetch(urlBase)
            .then(response => response.json())
            .then(data => {
                let index = data.findIndex(e => e.name == input.value);
                cityCode = data[index].code;
                divForcast.style.display = 'inline';

                fetch(`http://localhost:3030/jsonstore/forecaster/today/${cityCode}`)
                    .then(response => response.json())
                    .then(data => {

                        forecasts.className = 'forecasts';

                        let condSymbol = document.createElement('span');
                        condSymbol.className = 'condition symbol';
                        condSymbol.innerHTML = conditions[data.forecast.condition];
                        forecasts.appendChild(condSymbol);

                        let spanInfo = document.createElement('span');
                        spanInfo.className = 'condition';

                        let spanCity = document.createElement('span');
                        spanCity.className = 'forecast-data';
                        spanCity.textContent = data.name;
                        spanInfo.appendChild(spanCity);

                        let spanT = document.createElement('span');
                        spanT.className = 'forecast-data';
                        spanT.innerHTML = `${data.forecast.low}${conditions.Degrees}/${data.forecast.high}${conditions.Degrees}`;
                        spanInfo.appendChild(spanT);

                        let spanSimb = document.createElement('span');
                        spanSimb.className = 'forecast-data';
                        spanSimb.textContent = data.forecast.condition;
                        spanInfo.appendChild(spanSimb);

                        forecasts.appendChild(spanInfo);
                        current.appendChild(forecasts);
                    })
                    .catch(() => divForcast.textContent = 'Error');

                fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${cityCode}`)
                    .then(response => response.json())
                    .then(data => {

                        upcomings.className = 'forecast-info';

                        data.forecast.forEach(e => {

                            let upcomingInfo = document.createElement('span');
                            upcomingInfo.className = 'upcoming';

                            let span1 = document.createElement('span');
                            span1.className = 'symbol';
                            span1.innerHTML = conditions[e.condition];
                            upcomingInfo.appendChild(span1);

                            let span2 = document.createElement('span');
                            span2.className = 'forecast-data';
                            span2.innerHTML = `${e.low}${conditions.Degrees}/${e.high}${conditions.Degrees}`;
                            upcomingInfo.appendChild(span2);

                            let span3 = document.createElement('span');
                            span3.className = 'forecast-data';
                            span3.textContent = e.condition;
                            upcomingInfo.appendChild(span3);

                            upcomings.appendChild(upcomingInfo);
                        })
                        upcoming.appendChild(upcomings);
                    })
                    .catch(() => divForcast.textContent = 'Error');
            })
            .catch(() => divForcast.textContent = 'Error');
    }
}

attachEvents();