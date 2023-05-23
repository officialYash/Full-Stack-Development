// Fetch blogs from the JSON API
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(blogs => displayBlogs(blogs))
  .catch(error => console.error('Error:', error));

// Display blogs in the UI
function displayBlogs(blogs) {
  const blogsDiv = document.getElementById('blogs');
  
  blogs.forEach(blog => {
    const blogCard = document.createElement('div');
    blogCard.classList.add('blog-card');
    
    const title = document.createElement('h3');
    title.innerText = blog.title;
    
    const content = document.createElement('p');
    content.innerText = blog.body;
    
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => deleteBlog(blog.id));
    
    blogCard.appendChild(title);
    blogCard.appendChild(content);
    blogCard.appendChild(deleteButton);
    
    blogsDiv.appendChild(blogCard);
  });
}

// Add a new blog
const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addBlog);

function addBlog() {
  const titleInput = document.getElementById('titleInput');
  const contentInput = document.getElementById('contentInput');
  
  const newBlog = {
    title: titleInput.value,
    body: contentInput.value,
  };
  
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(newBlog),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json())
    .then(blog => {
      const blogsDiv = document.getElementById('blogs');
      const blogCard = document.createElement('div');
      blogCard.classList.add('blog-card');
      
      const title = document.createElement('h3');
      title.innerText = blog.title;
      
      const content = document.createElement('p');
      content.innerText = blog.body;
      
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.addEventListener('click', () => deleteBlog(blog.id));
      
      blogCard.appendChild(title);
      blogCard.appendChild(content);
      blogCard.appendChild(deleteButton);
      
      blogsDiv.appendChild(blogCard);
      
      titleInput.value = '';
      contentInput.value = '';
    })
    .catch(error => console.error('Error:', error));
}

// Delete a blog
function deleteBlog(blogId) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`, {
    method: 'DELETE',
  })
    .then(() => {
      const blogCard = document.querySelector(`.blog-card[data-id="${blogId}"]`);
      blogCard.remove();
    })
    .catch(error => console.error('Error:', error));
}
