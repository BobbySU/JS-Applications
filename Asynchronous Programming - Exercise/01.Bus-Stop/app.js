function getInfo() {
    let urlBase = `http://localhost:3030/jsonstore/bus/businfo/`;
    let input = document.getElementById('stopId');
    let divEl = document.getElementById('stopName');
    let ulEl = document.getElementById('buses');

    divEl.textContent = '';
    ulEl.innerHTML = '';

    fetch(`${urlBase}${input.value}`)
        .then(response => response.json())
        .then(data => {
            let busList = data.buses;
            let name = data.name;
            divEl.textContent = name;
            Object.entries(busList).forEach(([busId, time]) => {
                let li = document.createElement('li');
                li.textContent = `Bus ${busId} arrives in ${time} minutes`;
                ulEl.appendChild(li);
            })
        })
        .catch(() => {
            stopName.textContent = 'Error';
        });
}