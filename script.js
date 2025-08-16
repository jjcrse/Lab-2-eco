const API_URL = "http://localhost:3004/posts";
const postsContainer = document.getElementById("posts");
const form = document.getElementById("postForm");

async function loadPosts() {
  postsContainer.innerHTML = "";
  const res = await fetch(API_URL);
  const posts = await res.json();

  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <img src="${post.image}" alt="${post.title}">
      <h3>${post.title}</h3>
      <p>${post.description}</p>
      <button class="delete-btn" onclick="deletePost('${post.id}')">Eliminar</button>
    `;
    postsContainer.appendChild(div);
  });
}

window.deletePost = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadPosts();
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newPost = {
    image: document.getElementById("image").value,
    title: document.getElementById("title").value,
    description: document.getElementById("description").value
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost)
  });

  form.reset();
  loadPosts();
});

loadPosts();
