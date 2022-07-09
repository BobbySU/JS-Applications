function solve() {
    let urlBase = `http://localhost:3030/jsonstore/bus/schedule/`;
    let info = document.querySelector('span.info');
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    let nextStop = 'depot';
    let stopName = '';

    function depart() {
        departBtn.disabled = true;
        arriveBtn.disabled = false;

        fetch(`${urlBase}${nextStop}`)
            .then(response => response.json())
            .then(data => {
                nextStop = data.next;
                stopName = data.name;
                info.textContent = `Next stop ${stopName}`;
            })
            .catch(() => {
                info.textContent = 'Error';
                departBtn.disabled = true;
                arriveBtn.disabled = true;
            })
    }

    function arrive() {
        departBtn.disabled = false;
        arriveBtn.disabled = true;
        info.textContent = `Arriving at ${stopName}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();