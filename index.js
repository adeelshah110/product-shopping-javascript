(async () => {
  const productContainerEl = document.getElementById("productContainer");

  const searchInputEl = document.getElementById("searchInput");
  const url = "https://fakestoreapi.com/products";
  // 1
  const fetchContent = async () => {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (error) {
      return error;
    }
  };
  const products = await fetchContent();
  //2
  const generateProduct = (product) => {
    return `<div class="product_card">
    <div class="image_container">
      <img
        src="${product.image}"
        alt=""
      />
    </div>
    <div class="product_content">
      <h2>${product.title}</h2>
      <p>
       ${product.description.split(" ").slice(0, 25).join(" ")}
      </p>
      <button>${product.price} $</button>
    </div>
  </div>`;
  };
  //3
  const renderProducts = (products) => {
    productContainerEl.innerHTML = "";

    products.forEach((product) => {
      productContainerEl.innerHTML += generateProduct(product);
    });
  };
  //4
  const searchFunction = (text, input_search) => {
    return text.toString().toLowerCase().includes(input_search);
  };
  const filterHandler = (event) => {
    const input_search = event.target.value.toLowerCase();
    const filterProducts = products.filter((product) => {
      return (
        searchFunction(product.title, input_search) ||
        searchFunction(product.description, input_search) ||
        searchFunction(product.price, input_search)
      );
    });
    renderProducts(filterProducts);
  };
  searchInputEl.addEventListener("keyup", filterHandler);
  renderProducts(products);
})();
