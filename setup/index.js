var checkbox = document.getElementById("toggle");

let posts;
var counter = 0;

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    posts = [...data];
    createPosts();
  })
  .catch((error) => {
    console.log("Error:", error);
  });

const createPosts = () => {
  let output = "";

  let newPosts = posts.slice(counter, counter + 4);

  if (newPosts.length > 0) {
    newPosts.forEach((post) => {
      output += `
      <div class="post post-responsive ${checkbox.checked && "dark-mode"}">
        <div class="post-owner">
          <img
            id="profile-img"
            src="${post.profile_image}"
          />
          <p class="name">${post.name}</p>
        </div>
        <div class="post-content" onClick="enlarge(this)">
          <img
            id="post-img"
            src="${post.image}"
          />
        </div>

        <span class="likes">${post.likes} likes</span>
        <div class="description">
          <p>
            ${post.caption}
          </p>
        </div>
        <p class="date">${post.date}</p>
      </div>`;
    });

    counter += 4;

    if (counter >= posts.length) {
      var loadButton = document.getElementById("load-button");
      loadButton.classList.add("hiddenButton");
    }

    document.querySelector(".dynamic-posts").innerHTML += output;

    window.scroll({ top: document.body.scrollHeight, behavior: "smooth" });
  }
};

const toggleMode = () => {
  var postElements = document.querySelectorAll(".post");

  postElements.forEach((postElement) => {
    checkbox.checked
      ? postElement.classList.add("dark-mode")
      : postElement.classList.remove("dark-mode");
  });

  var layout = document.querySelector(".layout-container");

  checkbox.checked
    ? layout.classList.add("dark-theme")
    : layout.classList.remove("dark-theme");
};

checkbox.addEventListener("change", toggleMode);

const enlarge = (element) => {
  element.classList.toggle("enlargedContent");
};
