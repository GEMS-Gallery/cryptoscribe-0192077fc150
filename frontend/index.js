// frontend/index.js
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as backend_idl, canisterId as backend_id } from "declarations/backend";

const agent = new HttpAgent();
const backend = Actor.createActor(backend_idl, { agent, canisterId: backend_id });

document.addEventListener("DOMContentLoaded", async () => {
    const newPostBtn = document.getElementById("new-post-btn");
    const postForm = document.getElementById("post-form");
    const submitPostBtn = document.getElementById("submit-post");
    const postsContainer = document.getElementById("posts");

    const quill = new Quill('#editor', {
        theme: 'snow'
    });

    newPostBtn.addEventListener("click", () => {
        postForm.classList.toggle("hidden");
    });

    submitPostBtn.addEventListener("click", async () => {
        const title = document.getElementById("post-title").value;
        const author = document.getElementById("post-author").value;
        const body = quill.root.innerHTML;

        if (title && author && body) {
            await backend.addPost(title, body, author);
            loadPosts();
            postForm.classList.add("hidden");
        } else {
            alert("Please fill in all fields.");
        }
    });

    async function loadPosts() {
        const posts = await backend.getPosts();
        postsContainer.innerHTML = posts.map(post => `
            <div class="post">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-author">by ${post.author}</p>
                <div class="post-body">${post.body}</div>
            </div>
        `).join('');
    }

    loadPosts();
});
