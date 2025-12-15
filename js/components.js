document.addEventListener("DOMContentLoaded", function () {
  // Load Footer
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    fetch("/components/footer.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load footer: ${response.statusText}`);
        }
        return response.text();
      })
      .then((data) => {
        footerPlaceholder.innerHTML = data;
      })
      .catch((error) =>
        console.error("Error loading footer component:", error)
      );
  }
});
