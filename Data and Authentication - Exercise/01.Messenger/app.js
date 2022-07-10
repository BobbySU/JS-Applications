function attachEvents() {
    let url = 'http://localhost:3030/jsonstore/messenger';
    let textarea = document.getElementById('messages');
    let author = document.querySelector('[name="author"]');
    let content = document.querySelector('[name="content"]');
    let submitBtn = document.getElementById('submit');
    let refreshBtn = document.getElementById('refresh');

    submitBtn.addEventListener('click', submit);
    refreshBtn.addEventListener('click', refresh);

    function submit() {

        if (!author.value || !content.value) {
            return;
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                author: author.value.trim(),
                content: content.value.trim()
            })
        })
            .then(res => {
                if (res.ok == false) {
                    throw new Error('Error creating new record');
                }
                // refresh() // If you wont AUTO Refresh
                return res.json();
            })
            .catch(e => alert(e));

        author.value = '';
        content.value = '';
    }

    function refresh() {
        textarea.value = '';
        fetch(url)
            .then(res => {
                if (res.ok == false) {
                    throw new Error('Error conected to Server!');
                }
                return res.json();
            })
            .then(data => Object.values(data).forEach(e =>
                textarea.value += `${e.author}: ${e.content}\n`
            ))
            .catch(e => alert(e));
    }
}

attachEvents();