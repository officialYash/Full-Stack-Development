document.addEventListener('DOMContentLoaded', getBlogs);

function getBlogs() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
      const blogContainer = document.getElementById('blog-container');
      blogContainer.innerHTML = ''; // Clear the container

      posts.forEach(post => {
        const blogCard = document.createElement('div');
        blogCard.classList.add('blog-card');
        blogCard.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.body}</p>
          <button class="delete-btn" data-id="${post.id}">Delete</button>
        `;
        blogContainer.appendChild(blogCard);
      });

      // Attach event listeners to delete buttons
      const deleteButtons = document.querySelectorAll('.delete-btn');
      deleteButtons.forEach(button => {
        button.addEventListener('click', deleteBlog);
      });
    });
}

const addBlogForm = document.getElementById('add-blog-form');
addBlogForm.addEventListener('submit', addBlog);

function addBlog(event) {
  event.preventDefault();

  const titleInput = document.getElementById('title-input');
  const contentInput = document.getElementById('content-input');

  const newBlog = {
    title: titleInput.value,
    body: contentInput.value
  };

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newBlog)
  })
    .then(response => response.json())
    .then(blog => {
      // Reset the form
      titleInput.value = '';
      contentInput.value = '';

      // Refresh the blog list
      getBlogs();
    });
}

function deleteBlog(event) {
    const blogId = event.target.dataset.id;
  
    fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          // Refresh the blog list
          getBlogs();
        } else {
          console.error('Failed to delete blog');
        }
      });
  }
  