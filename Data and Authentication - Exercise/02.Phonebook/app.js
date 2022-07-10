function attachEvents() {
    let url = 'http://localhost:3030/jsonstore/phonebook';
    let ulPhonebook = document.getElementById('phonebook');
    let loadBtn = document.getElementById('btnLoad');
    let person = document.getElementById('person');
    let phone = document.getElementById('phone');
    let createBtn = document.getElementById('btnCreate');

    loadBtn.addEventListener('click', load);
    createBtn.addEventListener('click', create);

    function load() {

        ulPhonebook.textContent = '';
        fetch(url)
            .then(res => {
                if (res.ok == false) {
                    throw new Error('Error conected to Server!');
                }
                return res.json();
            })
            .then(data => Object.values(data).forEach(e => {
                let li = document.createElement('li');
                ulPhonebook.appendChild(li);
                let btn = document.createElement('button');
                btn.textContent = 'Delite';
                btn.addEventListener('click', delite);
                btn.setAttribute('id', e._id);
                li.textContent = `${e.person}: ${e.phone}`
                li.appendChild(btn);
            }))
            .catch(e => alert(e));
    }

    function create() {

        if (!person.value || !phone.value) {
            return;
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                person: person.value.trim(),
                phone: phone.value.trim()
            })
        })
            .then(res => {
                if (res.ok == false) {
                    throw new Error('Error creating new record');
                }
                load() // If you wont AUTO Refresh
                return res.json();
            })
            .catch(e => alert(e));

        person.value = '';
        phone.value = '';
    }


    function delite(e) {

        let delId = e.target.id;
        if (e.target.textContent == 'Delite') {
            fetch(`${url}/${delId}`, {
                method: 'DELETE'
            })
                .then(res => {
                    load()
                    return res.json();
                })
                .catch(e => alert(e));
        }
    }
}

attachEvents();