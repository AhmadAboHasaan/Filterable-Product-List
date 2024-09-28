import React, { useState, useEffect } from "react";
import "./App.css";
import { Product } from "./types";
import ProductList from "./ProductList";
import FilterButtons from "./FilterButtons";
import SearchBar from "./SearchBar";
import SortOptions from "./SortOptions";
import laptop from "./images/laptop.png";
import headphones from "./images/headphones.png";
import coffeemaker from "./images/coffeemaker.png";
import blender from "./images/blender.png";
import jeans from "./images/jeans.png";
import tshirt from "./images/tshirt.png";
import smartphone from "./images/smartphone.png";
import tablet from "./images/tablet.png";
import airconditioner from "./images/airconditioner.png";
import microwave from "./images/microwave.png";
import dress from "./images/dress.png";
import sneakers from "./images/sneakers.png";
import sandals from "./images/sandals.png";
import watch from "./images/watch.png";
import backpack from "./images/backpack.png";
import book from "./images/book.png";
import boardgame from "./images/boardgame.png";
import playstation from "./images/playstation.png";
import tv from "./images/tv.png";

const productsData: Product[] = [
  {
    name: "Laptop",
    category: "Electronics",
    price: 999,
    image: laptop,
  },
  {
    name: "Headphones",
    category: "Electronics",
    price: 199,
    image: headphones,
  },
  {
    name: "Coffee Maker",
    category: "Home Appliances",
    price: 49,
    image: coffeemaker,
  },
  {
    name: "Blender",
    category: "Home Appliances",
    price: 29,
    image: blender,
  },
  {
    name: "Jeans",
    category: "Clothing",
    price: 59,
    image: jeans,
  },
  {
    name: "T-Shirt",
    category: "Clothing",
    price: 19,
    image: tshirt,
  },
  {
    name: "Smartphone",
    category: "Electronics",
    price: 799,
    image: smartphone,
  },
  {
    name: "Tablet",
    category: "Electronics",
    price: 499,
    image: tablet,
  },
  {
    name: "Air Conditioner",
    category: "Home Appliances",
    price: 299,
    image: airconditioner,
  },
  {
    name: "Microwave Oven",
    category: "Home Appliances",
    price: 89,
    image: microwave,
  },
  {
    name: "Dress",
    category: "Clothing",
    price: 79,
    image: dress,
  },
  {
    name: "Sneakers",
    category: "Footwear",
    price: 120,
    image: sneakers,
  },
  {
    name: "Sandals",
    category: "Footwear",
    price: 45,
    image: sandals,
  },
  {
    name: "Wrist Watch",
    category: "Accessories",
    price: 150,
    image: watch,
  },
  {
    name: "Backpack",
    category: "Accessories",
    price: 60,
    image: backpack,
  },
  {
    name: "Novel Book",
    category: "Books",
    price: 15,
    image: book,
  },
  {
    name: "Cookbook",
    category: "Books",
    price: 25,
    image: book,
  },
  {
    name: "Board Game",
    category: "Toys & Games",
    price: 35,
    image: boardgame,
  },
  {
    name: "PlayStation",
    category: "Electronics",
    price: 400,
    image: playstation,
  },
  {
    name: "TV",
    category: "Electronics",
    price: 350,
    image: tv,
  },
];

function App() {
  const [products] = useState<Product[]>(productsData);
  const [currentProducts, setCurrentProducts] =
    useState<Product[]>(productsData);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortCriteria, setSortCriteria] = useState<string>("");
  const [navActive, setNavActive] = useState<boolean>(false);

  useEffect(() => {
    const uniqueCategories = [
      "All",
      ...new Set(products.map((p) => p.category)),
    ];
    setCategories(uniqueCategories);
  }, [products]);

  useEffect(() => {
    applyFilters();
  }, [activeCategory, searchQuery, sortCriteria]);

  const applyFilters = () => {
    let filtered = [...products];

    if (activeCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === activeCategory
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortCriteria) {
      if (sortCriteria === "name-asc") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortCriteria === "name-desc") {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
      } else if (sortCriteria === "price-asc") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortCriteria === "price-desc") {
        filtered.sort((a, b) => b.price - a.price);
      }
    }

    setCurrentProducts(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setNavActive(false);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (criteria: string) => {
    setSortCriteria(criteria);
  };

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const navElement = document.querySelector("nav");
      if (
        navActive &&
        navElement &&
        !navElement.contains(event.target as Node) &&
        !(event.target as HTMLElement).matches("#menu-toggle")
      ) {
        setNavActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [navActive]);

  return (
    <div className="container">
      <header>
        <h1>Product List</h1>
        <SortOptions onSortChange={handleSortChange} />
        <SearchBar onSearchChange={handleSearchChange} />
        <button id="menu-toggle" aria-label="Toggle Menu" onClick={toggleNav}>
          &#9776;
        </button>
      </header>

      <nav className={navActive ? "active" : ""}>
        <p>Category</p>
        <FilterButtons
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </nav>

      {navActive && <div id="overlay" onClick={toggleNav}></div>}

      <main>
        <ProductList products={currentProducts} />
      </main>
    </div>
  );
}

export default App;
