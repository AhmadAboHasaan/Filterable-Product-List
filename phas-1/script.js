const products = [
  {
    name: "Laptop",
    category: "Electronics",
    price: 999,
    image: "images/laptop.png",
  },
  {
    name: "Headphones",
    category: "Electronics",
    price: 199,
    image: "images/headphones.png",
  },
  {
    name: "Coffee Maker",
    category: "Home Appliances",
    price: 49,
    image: "images/coffeemaker.png",
  },
  {
    name: "Blender",
    category: "Home Appliances",
    price: 29,
    image: "images/blender.png",
  },
  {
    name: "Jeans",
    category: "Clothing",
    price: 59,
    image: "images/jeans.png",
  },
  {
    name: "T-Shirt",
    category: "Clothing",
    price: 19,
    image: "images/tshirt.png",
  },
  {
    name: "Smartphone",
    category: "Electronics",
    price: 799,
    image: "images/smartphone.png",
  },
  {
    name: "Tablet",
    category: "Electronics",
    price: 499,
    image: "images/tablet.png",
  },
  {
    name: "Air Conditioner",
    category: "Home Appliances",
    price: 299,
    image: "images/airconditioner.png",
  },
  {
    name: "Microwave Oven",
    category: "Home Appliances",
    price: 89,
    image: "images/microwave.png",
  },
  {
    name: "Dress",
    category: "Clothing",
    price: 79,
    image: "images/dress.png",
  },
  {
    name: "Sneakers",
    category: "Footwear",
    price: 120,
    image: "images/sneakers.png",
  },
  {
    name: "Sandals",
    category: "Footwear",
    price: 45,
    image: "images/sandals.png",
  },
  {
    name: "Wrist Watch",
    category: "Accessories",
    price: 150,
    image: "images/watch.png",
  },
  {
    name: "Backpack",
    category: "Accessories",
    price: 60,
    image: "images/backpack.png",
  },
  {
    name: "Novel Book",
    category: "Books",
    price: 15,
    image: "images/book.png",
  },
  {
    name: "Cookbook",
    category: "Books",
    price: 25,
    image: "images/book.png",
  },
  {
    name: "Board Game",
    category: "Toys & Games",
    price: 35,
    image: "images/boardgame.png",
  },
  {
    name: "PlayStation",
    category: "Electronics",
    price: 400,
    image: "images/playstation.png",
  },
  {
    name: "TV",
    category: "Electronics",
    price: 350,
    image: "images/tv.png",
  },
];

let currentProducts = products.slice();

function displayProducts(productsToDisplay) {
  const productDisplay = document.getElementById("product-display");
  productDisplay.innerHTML = "";

  productsToDisplay.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");

    const imageSrc = product.image || "images/default.png";

    productItem.innerHTML = `
          <img src="${imageSrc}" alt="${product.name}" loading="lazy">
          <h3>${product.name}</h3>
          <p>Category: ${product.category}</p>
          <p>Price: $${product.price}</p>
      `;

    productDisplay.appendChild(productItem);
  });
}

function createFilterButtons() {
  const filterSection = document.getElementById("filter-section");
  filterSection.innerHTML = "";

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.classList.add("filter-button");
    button.textContent = category;

    button.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-button")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      if (category === "All") {
        currentProducts = products.slice();
      } else {
        currentProducts = products.filter(
          (product) => product.category === category
        );
      }
      applyFilters();
      closeSidebar();
    });

    filterSection.appendChild(button);
  });
}

function createSortOptions() {
  const sortSection = document.getElementById("sort-section");

  const select = document.createElement("select");
  select.id = "sort";

  const options = [
    { value: "", text: "Sort By: None" },
    { value: "name-asc", text: "Name (A-Z)" },
    { value: "name-desc", text: "Name (Z-A)" },
    { value: "price-asc", text: "Price (Low to High)" },
    { value: "price-desc", text: "Price (High to Low)" },
  ];

  options.forEach((opt) => {
    const option = document.createElement("option");
    option.value = opt.value;
    option.textContent = opt.text;
    select.appendChild(option);
  });

  select.addEventListener("change", applyFilters);

  sortSection.appendChild(select);
}

function createSearchBar() {
  const searchSection = document.getElementById("search-section");

  const input = document.createElement("input");
  input.type = "text";
  input.id = "search-input";
  input.placeholder = "Search products...";

  input.addEventListener("input", applyFilters);

  searchSection.appendChild(input);
}

function sortProducts(productsToSort) {
  const criteria = document.getElementById("sort").value;
  const sortedProducts = productsToSort.slice();
  if (criteria === "name-asc") {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (criteria === "name-desc") {
    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
  } else if (criteria === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (criteria === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return sortedProducts;
}

function applyFilters() {
  let filteredProducts = currentProducts.slice();

  const query = document.getElementById("search-input").value.toLowerCase();
  if (query) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }

  filteredProducts = sortProducts(filteredProducts);

  displayProducts(filteredProducts);
}

function closeSidebar() {
  const nav = document.querySelector("nav");
  const overlay = document.getElementById("overlay");
  nav.classList.remove("active");
  overlay.classList.remove("active");
}

function init() {
  createFilterButtons();
  createSortOptions();
  createSearchBar();

  const allFilterButton = document.querySelector(".filter-button");
  if (allFilterButton) {
    allFilterButton.classList.add("active");
  }

  displayProducts(products);
}

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.querySelector("nav");
  const overlay = document.getElementById("overlay");

  menuToggle.addEventListener("click", (event) => {
    nav.classList.toggle("active");
    overlay.classList.toggle("active");
    event.stopPropagation();
  });

  overlay.addEventListener("click", () => {
    closeSidebar();
  });

  document.addEventListener("click", (event) => {
    const isClickInsideNav = nav.contains(event.target);
    const isClickOnMenuToggle = menuToggle.contains(event.target);

    if (!isClickInsideNav && !isClickOnMenuToggle) {
      closeSidebar();
    }
  });

  nav.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  init();
});
