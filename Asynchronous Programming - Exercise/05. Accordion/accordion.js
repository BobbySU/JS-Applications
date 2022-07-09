function solution() {

    let section = document.getElementById('main');
    // let section = document.querySelector('section#main');
    section.innerHTML = '';

    fetch(`http://localhost:3030/jsonstore/advanced/articles/list`)
        .then(response => response.json())
        .then(data => createUser(data))
        .catch((e) => {
            throw new Error(e)
        });


    const createUser = (data) => {
        for (e of data) {
            let mainDiv = document.createElement('div');
            mainDiv.className = 'accordion';
            section.appendChild(mainDiv)

            let head = document.createElement('div');
            head.className = 'head';
            mainDiv.appendChild(head)

            let span = document.createElement('span');
            span.textContent = e.title;
            head.appendChild(span);

            let button = document.createElement('button');
            button.className = 'button';
            button.id = e._id;
            button.textContent = 'More'
            button.addEventListener('click', clickBtn);
            head.appendChild(button);

            let extra = document.createElement('div');
            extra.className = 'extra';
        }
    }

    function clickBtn(e) {
        if (!e.target.parentElement.nextElementSibling) {
            let articleId = e.target.id;

            fetch('http://localhost:3030/jsonstore/advanced/articles/details/' + articleId)
                .then(res => res.json())
                .then(data => handleContent(data.content))
                .catch((e) => {
                    console.log(e.message)
                });

            function handleContent(content) {

                let extra = document.createElement('div');
                extra.className = 'extra';
                e.target.parentElement.parentElement.appendChild(extra);

                let p = document.createElement('p');
                p.textContent = content;
                extra.appendChild(p);

                extra.style.display = 'block';
                e.target.textContent = 'Less'
            }

        } else if (e.target.parentElement.nextElementSibling.style.display == 'block') {
            e.target.parentElement.nextElementSibling.style.display = 'none';
            e.target.textContent = 'More'
        } else {
            e.target.parentElement.nextElementSibling.style.display = 'block';
            e.target.textContent = 'Less'
        }
    }
}

solution()