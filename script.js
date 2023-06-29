const API_KEY = "37976065-2b74746903515be2c7b7d9894";

    const searchForm = document.getElementById("search-form");
    const searchQuery = document.getElementById("search-query");
    const gallery = document.getElementById("gallery");

    searchForm.addEventListener("submit", e => {
      e.preventDefault();
      gallery.innerHTML = ""; // Clear previous results
      const query = searchQuery.value.trim();
      if (query !== "") {
        searchImages(query);
      }
    });

    function searchImages(query) {
      const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.hits.length > 0) {
            data.hits.forEach(image => {
              const card = createImageCard(image);
              gallery.appendChild(card);
            });
          } else {
            const message = document.createElement("p");
            message.textContent = "No images found.";
            gallery.appendChild(message);
          }
        })
        .catch(error => {
          console.log("Error fetching images:", error);
        });
    }

    function createImageCard(image) {
      const card = document.createElement("div");
      card.className = "image-card";

      const img = document.createElement("img");
      img.src = image.webformatURL;
      img.alt = image.tags;

      card.appendChild(img);
      return card;
    }