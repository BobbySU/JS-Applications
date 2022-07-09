function attachEvents() {
    let postsSelect = document.querySelector('select#posts');
    let btnLoadPosts = document.getElementById('btnLoadPosts');
    let btnViewPost = document.getElementById('btnViewPost');
    let postTitle = document.getElementById('post-title');
    let postContent = document.getElementById('post-body');

    btnLoadPosts.addEventListener('click', handleLoadPosts);
    btnViewPost.addEventListener('click', handleViewPost);
    let commonData;

    function handleLoadPosts() {
        fetch('http://localhost:3030/jsonstore/blog/posts')
            .then(res => res.json())
            .then(data => addPosts(data));

        function addPosts(data) {
            commonData = data;

            postsSelect.innerHTML = '';

            for (let [id, postInfo] of Object.entries(data)) {
                let option = document.createElement('option');
                option.value = id;
                option.textContent = postInfo.title;
                option.dataset.body = postInfo.body;
                postsSelect.appendChild(option);
            }
        }
    }

    function handleViewPost() {
        let selectedPostId = document.getElementById('posts').value;

        postTitle.textContent = commonData[selectedPostId].title;
        postContent.textContent = commonData[selectedPostId].body;

        fetch('http://localhost:3030/jsonstore/blog/comments')
            .then(res => res.json())
            .then(data => handleComments(data));

        function handleComments(data) {
            let commentsUl = document.getElementById('post-comments');
            commentsUl.innerHTML = '';

            Object.entries(data).forEach(commentInfo =>
                    //   for (let commentInfo of Object.entries(data))
                {
                    if (commentInfo[1].postId == selectedPostId) {
                        let li = document.createElement('li');
                        li.id = commentInfo[1].id
                        li.textContent = commentInfo[1].text;
                        commentsUl.appendChild(li);
                    }

                }
            )
        }
    }
}

attachEvents();