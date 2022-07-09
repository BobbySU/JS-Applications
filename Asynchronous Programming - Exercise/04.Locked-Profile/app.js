function lockedProfile() {
    let main = document.getElementById('main');
    // let main = document.querySelector('main#main');
    main.innerHTML = '';

    fetch(`http://localhost:3030/jsonstore/advanced/profiles`)
        .then(response => response.json())
        .then(data => createUser(data))
        .catch((e) => {
            throw new Error(e)
        });

    function createUser(data) {
        Object.values(data).forEach((el, i) => addUser(el, i));
        let buttons = Array.from(document.querySelectorAll('button'));
        buttons.forEach(button => button.addEventListener('click', checkClick));
    }

    function addUser(el, i) {
        let userDiv = document.createElement('div');
        userDiv.className = 'profile';
        userDiv.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
                            <label>Lock</label>
                            <input type="radio" name="user${i + 1}Locked" value="lock" checked>
                            <label>Unlock</label>
                            <input type="radio" name="user${i + 1}Locked" value="unlock"><br>
                            <hr>
                            <label>Username</label>
                            <input type="text" name="user${i + 1}Username" value=${el.username} disabled readonly />
                            <div class="user${i + 1}Username" style="display: none">
                                 <hr>
                                <label>Email:</label>
                                <input type="email" name="user${i + 1}Email" value=${el.email} disabled readonly />
                                <label>Age:</label>
                                <input type="text" name="user${i + 1}Age" value=${el.age} disabled readonly />
                            </div>
        
                            <button>Show more</button>`;
        main.appendChild(userDiv);
    }

    function checkClick(e) {
        let checkedRadio = e.target.parentElement.querySelector('input[type=radio]:checked');

        if (checkedRadio.value == 'unlock' && e.target.previousElementSibling.style.display == '') {
            e.target.previousElementSibling.style.display = 'none';
        } else if (checkedRadio.value == 'unlock' && e.target.previousElementSibling.style.display == 'none') {
            e.target.previousElementSibling.style.display = '';
        }
    }
}