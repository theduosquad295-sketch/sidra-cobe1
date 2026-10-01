const SIDRA_PRODUCTS = [
  {
    id: "urban-lite-jacket",
    name: "Urban Lite Jacket",
    category: "Clothing",
    price: 89,
    oldPrice: 109,
    discount: "-18%",
    imageClass: "media-one",
    stock: 14,
    description: "A light, tailored everyday jacket designed for easy layering, all-day comfort, and polished styling." 
  },
  {
    id: "summit-runner",
    name: "Summit Runner",
    category: "Shoes",
    price: 120,
    oldPrice: null,
    discount: "",
    imageClass: "media-two",
    stock: 9,
    description: "A lightweight runner built for movement, cushioning, and everyday comfort from commute to weekend plans."
  },
  {
    id: "harbor-tote",
    name: "Harbor Tote",
    category: "Bags",
    price: 74,
    oldPrice: 94,
    discount: "-21%",
    imageClass: "media-three",
    stock: 18,
    description: "A spacious everyday tote with smart organization, soft handles, and a clean, versatile silhouette."
  },
  {
    id: "vela-shades",
    name: "Vela Shades",
    category: "Accessories",
    price: 58,
    oldPrice: null,
    discount: "",
    imageClass: "media-four",
    stock: 24,
    description: "Classic UV-protected sunglasses with a sleek frame and comfortable fit for everyday wear."
  },
  {
    id: "coastline-hoodie",
    name: "Coastline Hoodie",
    category: "Clothing",
    price: 96,
    oldPrice: 120,
    discount: "-20%",
    imageClass: "media-five",
    stock: 11,
    description: "A soft heavyweight hoodie made for relaxed layering, soft texture, and all-season comfort."
  },
  {
    id: "northbound-bag",
    name: "Northbound Bag",
    category: "Bags",
    price: 110,
    oldPrice: null,
    discount: "",
    imageClass: "media-six",
    stock: 7,
    description: "A structured carry-all with sleek lines, roomy storage, and durable finish for work or travel days."
  },
  {
    id: "metro-sneaker",
    name: "Metro Sneaker",
    category: "Shoes",
    price: 132,
    oldPrice: 150,
    discount: "-12%",
    imageClass: "media-seven",
    stock: 10,
    description: "A refined everyday sneaker with comfort-first cushioning and a clean profile designed for easy styling."
  },
  {
    id: "city-accent-watch",
    name: "City Accent Watch",
    category: "Accessories",
    price: 86,
    oldPrice: null,
    discount: "",
    imageClass: "media-eight",
    stock: 13,
    description: "A minimalist timepiece with a confident silhouette, polished finish, and everyday versatility."
  }
];

window.SIDRA_PRODUCTS = SIDRA_PRODUCTS;
window.SIDRA_IMAGE_PATHS = {
  "media-one": "./images/products/shirt1.jpg",
  "media-two": "./images/products/shoes1.jpg",
  "media-three": "./images/products/ladies-purse1.jpg",
  "media-four": "./images/products/sunglasses1.jpg",
  "media-five": "./images/products/hoodie1.jpg",
  "media-six": "./images/products/bag1.jpg",
  "media-seven": "./images/products/tshirt1.jpg",
  "media-eight": "./images/products/watch1.jpg"
};
window.getSidraImagePath = (imageClass) => {
  const resolved = String(imageClass || "media-one").trim();
  const path = window.SIDRA_IMAGE_PATHS[resolved] || window.SIDRA_IMAGE_PATHS["media-one"];

  if (window.location.pathname.includes("/pages/")) {
    return path.replace(/^\.\//, "../");
  }

  return path;
};
window.getSidraProductById = (productId) => SIDRA_PRODUCTS.find((item) => String(item.id) === String(productId));

window.getSidraProductSlug = (name) => String(name || "")
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

window.getSidraProductFromCard = (card) => {
  const title = card.querySelector("h3")?.textContent?.trim() || "Product";
  const productId = String(card.dataset.productId || window.getSidraProductSlug(title));
  const found = window.getSidraProductById(productId) || SIDRA_PRODUCTS.find((item) => item.name === title);

  if (found) {
    card.dataset.productId = found.id;
    return found;
  }
  return null;
};

window.SIDRA_PRODUCT_IDS = SIDRA_PRODUCTS.map((item) => item.id);
window.SIDRA_TRANSLATIONS = {
  en: {
    home: "Home",
    "my-order": "My Order",
    "my-orders": "My Orders",
    ai: "AI",
    account: "Account",
    search: "Search",
    sort: "Sort",
    category: "Category",
    filter: "Filter",
    cart: "Cart",
    wishlist: "Wishlist",
    checkout: "Checkout",
    "place-order": "Place Order",
    "help-center": "Help Center",
    "saved-address": "Saved Address",
    "whatsapp-support": "WhatsApp Support",
    logout: "Logout",
    "change-language": "Change Language",
    "share-product": "Share Product",
    rating: "Rating",
    "add-to-cart": "Add to Cart",
    remove: "Remove",
    quantity: "Quantity",
    total: "Total",
    subtotal: "Subtotal",
    "continue-shopping": "Continue Shopping",
    "back-to-home": "Back to Home",
    "lang-english": "English",
    "lang-hindi": "हिन्दी",
    "lang-hinglish": "Hinglish",
    "recent-searches": "Recent searches",
    "clear-all": "Clear all",
    "clear-search": "Clear search",
    "no-products-found": "No products found",
    "browse-categories": "Browse Categories"
  },
  hi: {
    home: "होम",
    "my-order": "मेरा ऑर्डर",
    "my-orders": "मेरे ऑर्डर",
    ai: "एआई",
    account: "अकाउंट",
    search: "खोजें",
    sort: "क्रम",
    category: "श्रेणी",
    filter: "फ़िल्टर",
    cart: "कार्ट",
    wishlist: "विशलिस्ट",
    checkout: "चेकआउट",
    "place-order": "ऑर्डर करें",
    "help-center": "हेल्प सेंटर",
    "saved-address": "सहेजे गए पते",
    "whatsapp-support": "WhatsApp सहायता",
    logout: "लॉग आउट",
    "change-language": "भाषा बदलें",
    "share-product": "प्रोडक्ट शेयर करें",
    rating: "रेटिंग",
    "add-to-cart": "कार्ट में जोड़ें",
    remove: "हटाएं",
    quantity: "मात्रा",
    total: "कुल",
    subtotal: "सबटोटल",
    "continue-shopping": "शॉपिंग जारी रखें",
    "back-to-home": "होम पर लौटें",
    "lang-english": "English",
    "lang-hindi": "हिन्दी",
    "lang-hinglish": "Hinglish",
    "recent-searches": "हाल की खोजें",
    "clear-all": "सब हटाएं",
    "clear-search": "खोज साफ़ करें",
    "no-products-found": "कोई उत्पाद नहीं मिला",
    "browse-categories": "श्रेणियां देखें"
  },
  hinglish: {
    home: "Home",
    "my-order": "Mera Order",
    "my-orders": "Mere Orders",
    ai: "AI",
    account: "Account",
    search: "Search karo",
    sort: "Sort",
    category: "Category",
    filter: "Filter",
    cart: "Cart",
    wishlist: "Wishlist",
    checkout: "Checkout",
    "place-order": "Place Order",
    "help-center": "Help Center",
    "saved-address": "Saved Address",
    "whatsapp-support": "WhatsApp Support",
    logout: "Logout",
    "change-language": "Language badlo",
    "share-product": "Product share karo",
    rating: "Rating",
    "add-to-cart": "Cart me add karo",
    remove: "Remove karo",
    quantity: "Quantity",
    total: "Total",
    subtotal: "Subtotal",
    "continue-shopping": "Shopping continue rakho",
    "back-to-home": "Home pe wapis",
    "lang-english": "English",
    "lang-hindi": "हिन्दी",
    "lang-hinglish": "Hinglish",
    "recent-searches": "Recent searches",
    "clear-all": "Clear all",
    "clear-search": "Clear search",
    "no-products-found": "No products found",
    "browse-categories": "Browse Categories"
  }
};
window.SIDRA_LANGUAGE_OPTIONS = ["en", "hi", "hinglish"];
window.getSidraLanguage = () => {
  const stored = localStorage.getItem("sidraLanguage");
  const selected = window.SIDRA_LANGUAGE_OPTIONS.includes(stored) ? stored : "en";
  localStorage.setItem("sidraLanguage", selected);
  return selected;
};
window.setSidraLanguage = (language) => {
  const nextLanguage = window.SIDRA_LANGUAGE_OPTIONS.includes(language) ? language : "en";
  localStorage.setItem("sidraLanguage", nextLanguage);
  document.documentElement.lang = nextLanguage === "hi" ? "hi" : "en";
  window.dispatchEvent(new CustomEvent("sidra-language-change", { detail: { language: nextLanguage } }));
  window.applySidraTranslation();
  return nextLanguage;
};
window.applySidraTranslation = () => {
  const language = window.getSidraLanguage();
  const dictionary = window.SIDRA_TRANSLATIONS[language] || window.SIDRA_TRANSLATIONS.en;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (dictionary[key]) {
      element.setAttribute("placeholder", dictionary[key]);
    }
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    if (dictionary[key]) {
      element.setAttribute("aria-label", dictionary[key]);
    }
  });
  return language;
};

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const categoryBar = document.querySelector(".category-bar");
  const headerSearch = document.querySelector(".header-search");
  const STORAGE_KEYS = ["sidraCobeCart", "sidraCart", "sidra-cobe-cart", "cartData"];
  const WISHLIST_KEY = "sidraCobeWishlist";

  const safeNumber = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const normalizeCart = (rawCart) => {
    if (!Array.isArray(rawCart)) return [];

    return rawCart
      .filter((item) => item && item.id && safeNumber(item.quantity) > 0)
      .map((item) => ({
        id: String(item.id),
        name: item.name || "Product",
        category: item.category || "Featured",
        price: safeNumber(item.price),
        quantity: safeNumber(item.quantity),
        imageClass: item.imageClass || "media-one",
        size: item.size || "",
        variant: item.variant || ""
      }));
  };

  const saveCart = (cart) => {
    const normalized = normalizeCart(cart);
    const payload = JSON.stringify(normalized);

    STORAGE_KEYS.forEach((key) => {
      try {
        localStorage.setItem(key, payload);
      } catch (error) {
        // Ignore storage issues.
      }
    });
  };

  const readCart = () => {
    for (const key of STORAGE_KEYS) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) continue;

        const parsed = JSON.parse(raw);
        const normalized = normalizeCart(parsed);

        if (normalized.length || raw === "[]") {
          return normalized;
        }
      } catch (error) {
        // Ignore invalid stored data.
      }
    }

    return [];
  };

  const updateCartCounts = () => {
    const cart = readCart();
    const totalItems = cart.reduce((total, item) => total + safeNumber(item.quantity), 0);

    document.querySelectorAll(".cart-count").forEach((count) => {
      count.textContent = String(totalItems);
    });
  };

  const readWishlist = () => {
    try {
      const raw = localStorage.getItem(WISHLIST_KEY);
      if (!raw) return [];

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];

      return parsed
        .filter((item) => item && item.id)
        .map((item) => ({
          id: String(item.id),
          name: item.name || "Product",
          category: item.category || "Featured",
          price: safeNumber(item.price),
          imageClass: item.imageClass || "media-one",
          size: item.size || "",
          variant: item.variant || ""
        }));
    } catch (error) {
      return [];
    }
  };

  const saveWishlist = (items) => {
    const map = new Map();

    items.forEach((item) => {
      const id = String(item.id);
      if (!id) return;

      map.set(id, {
        id,
        name: item.name || "Product",
        category: item.category || "Featured",
        price: safeNumber(item.price),
        imageClass: item.imageClass || "media-one",
        size: item.size || "",
        variant: item.variant || ""
      });
    });

    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify([...map.values()]));
    } catch (error) {
      // Ignore storage issues.
    }
  };

  const updateWishlistCounts = () => {
    const wishlist = readWishlist();

    document.querySelectorAll(".wishlist-count").forEach((count) => {
      count.textContent = String(wishlist.length);
    });
  };

  const getProductMetaFromCard = (card) => {
    const product = window.getSidraProductFromCard(card);
    if (!product) return null;
    return { ...product, id: String(product.id) };
  };

  const syncWishlistButtons = () => {
    const wishlistIds = new Set(readWishlist().map((item) => String(item.id)));

    document.querySelectorAll(".wishlist-btn").forEach((button) => {
      const card = button.closest(".product-card");
      const productMeta = card ? getProductMetaFromCard(card) : null;
      const productId = productMeta ? String(productMeta.id) : "";
      const isActive = Boolean(productId && wishlistIds.has(productId));

      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-label", isActive ? "Remove from wishlist" : "Add to wishlist");
    });
  };

  const homeSearchInput = document.querySelector("#home-search");
  const clearSearchButton = document.getElementById("clear-search-button");
  const searchContainer = document.getElementById("search-container");
  const searchDropdown = document.getElementById("search-dropdown");
  const searchSuggestions = document.getElementById("search-suggestions");
  const recentSearchSection = document.getElementById("recent-search-section");
  const recentSearchList = document.getElementById("recent-search-list");
  const clearRecentSearchesButton = document.getElementById("clear-recent-searches");
  const noResultsTerm = document.getElementById("no-results-term");
  const clearSearchResultsButton = document.getElementById("clear-search-results");
  const browseCategoriesButton = document.getElementById("browse-categories-button");
  const voiceSearchButton = document.getElementById("voice-search-btn");
  const cameraSearchButton = document.getElementById("camera-search-btn");
  const cameraSearchMenu = document.getElementById("camera-search-menu");
  const imageSearchInput = document.getElementById("image-search-input");
  const imageSearchPreview = document.getElementById("image-search-preview");
  const imagePreviewBox = document.getElementById("image-preview-box");
  const voiceSearchStatus = document.getElementById("voice-search-status");
  const imageSearchStatus = document.getElementById("image-search-status");
  const homeSortSelect = document.getElementById("sort-select");
  const homeCategorySelect = document.getElementById("category-select");
  const homeAvailabilitySelect = document.getElementById("availability-filter");
  const homeSizeSelect = document.getElementById("size-filter");
  const homeColorSelect = document.getElementById("color-filter");
  const homeRatingSelect = document.getElementById("rating-filter");
  const homeBrandSelect = document.getElementById("brand-filter");
  const homePriceMin = document.getElementById("price-min");
  const homePriceMax = document.getElementById("price-max");
  const clearFiltersButton = document.getElementById("clear-filters-button");
  const homeProductCards = Array.from(document.querySelectorAll(".product-card"));
  const homeEmptyState = document.querySelector(".home-empty-state");

  const products = (window.SIDRA_PRODUCTS || []).filter(Boolean);
  homeCategorySelect?.querySelectorAll("option:not([value='all'])").forEach((option) => {
    const hasProducts = products.some((product) => (product.category || "").toLowerCase() === option.value.toLowerCase());
    option.textContent = hasProducts ? option.value : `${option.value} (no products)`;
  });
  const getProductValues = (product, keys) => keys.flatMap((key) => {
    const value = product[key];
    return Array.isArray(value) ? value : value == null || value === "" ? [] : [value];
  }).map((value) => String(typeof value === "object" ? value.name || value.color || "" : value).trim()).filter(Boolean);
  const populateFacet = (select, values, unavailableLabel) => {
    if (!select) return;
    const uniqueValues = [...new Set(values)].sort((a, b) => a.localeCompare(b));
    select.replaceChildren(new Option("All", "all"));
    if (!uniqueValues.length) {
      select.add(new Option(unavailableLabel, "unavailable"));
      select.disabled = true;
      select.closest(".toolbar-field")?.classList.add("is-unavailable");
      return;
    }
    uniqueValues.forEach((value) => select.add(new Option(value, value)));
    select.disabled = false;
    select.closest(".toolbar-field")?.classList.remove("is-unavailable");
  };

  populateFacet(homeSizeSelect, products.flatMap((product) => getProductValues(product, ["sizes", "size"])), "No sizes in catalog");
  populateFacet(homeColorSelect, products.flatMap((product) => getProductValues(product, ["colors", "color", "variants"])), "No colors in catalog");
  if (homeRatingSelect) {
    const ratingThresholds = [4, 3, 2].filter((threshold) => products.some((product) => safeNumber(product.rating) >= threshold));
    homeRatingSelect.replaceChildren(new Option("All", "all"));
    ratingThresholds.forEach((threshold) => homeRatingSelect.add(new Option(`${threshold}★ & above`, String(threshold))));
    homeRatingSelect.disabled = ratingThresholds.length === 0;
    if (!ratingThresholds.length) homeRatingSelect.add(new Option("Ratings unavailable", "unavailable"));
    homeRatingSelect.closest(".toolbar-field")?.classList.toggle("is-unavailable", !ratingThresholds.length);
  }
  const catalogBrands = products.map((product) => getProductValues(product, ["brand"])[0] || "SIDRA COBE");
  populateFacet(homeBrandSelect, catalogBrands, "No brands in catalog");

  if (homeSortSelect) {
    const hasCreatedDate = products.some((product) => product.createdAt || product.created_at || product.createdDate || product.dateAdded);
    const hasPopularity = products.some((product) => [product.popularity, product.sales, product.views, product.rating].some((value) => Number.isFinite(Number(value))));
    const newestOption = homeSortSelect.querySelector('[value="newest"]');
    const popularOption = homeSortSelect.querySelector('[value="popular"]');
    if (newestOption) {
      newestOption.disabled = !hasCreatedDate;
      newestOption.textContent = hasCreatedDate ? "Newest" : "Newest (date unavailable)";
    }
    if (popularOption) {
      popularOption.disabled = !hasPopularity;
      popularOption.textContent = hasPopularity ? "Popular" : "Popular (data unavailable)";
    }
  }

  const setVoiceStatus = (message, isListening = false) => {
    if (!voiceSearchStatus) return;
    voiceSearchStatus.textContent = message;
    voiceSearchStatus.classList.toggle("is-listening", isListening);
  };

  const setImageStatus = (message) => {
    if (!imageSearchStatus) return;
    imageSearchStatus.textContent = message;
  };

  const applyHomeFilters = () => {
    if (!homeProductCards.length) return;

    const query = (homeSearchInput?.value || "").trim().toLowerCase();
    const categoryValue = homeCategorySelect?.value || "all";
    const sortValue = homeSortSelect?.value || "featured";
    const minPrice = homePriceMin?.value === "" ? null : safeNumber(homePriceMin?.value);
    const maxPrice = homePriceMax?.value === "" ? null : safeNumber(homePriceMax?.value);
    const terms = query.split(/\s+/).filter(Boolean);

    const filteredCards = homeProductCards.filter((card) => {
      const product = window.getSidraProductFromCard(card);
      if (!product) return false;
      const searchableText = [product.name, product.category, product.description, ...(product.keywords || [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const searchMatches = terms.every((term) => searchableText.includes(term));
      const categoryMatches = categoryValue === "all" || (product.category || "").toLowerCase() === categoryValue.toLowerCase();
      const availability = homeAvailabilitySelect?.value || "all";
      const stock = Number(product.stock);
      const availabilityMatches = availability === "all" || (availability === "in-stock" ? stock > 0 : stock <= 0);
      const sizeMatches = !homeSizeSelect || homeSizeSelect.value === "all" || getProductValues(product, ["sizes", "size"]).includes(homeSizeSelect.value);
      const colorMatches = !homeColorSelect || homeColorSelect.value === "all" || getProductValues(product, ["colors", "color", "variants"]).includes(homeColorSelect.value);
      const ratingThreshold = homeRatingSelect?.value === "all" ? 0 : safeNumber(homeRatingSelect?.value);
      const ratingMatches = !ratingThreshold || safeNumber(product.rating) >= ratingThreshold;
      const brand = getProductValues(product, ["brand"])[0] || "SIDRA COBE";
      const brandMatches = !homeBrandSelect || homeBrandSelect.value === "all" || brand === homeBrandSelect.value;
      const priceMatches = (minPrice === null || safeNumber(product.price) >= minPrice) && (maxPrice === null || safeNumber(product.price) <= maxPrice);

      return searchMatches && categoryMatches && availabilityMatches && sizeMatches && colorMatches && ratingMatches && brandMatches && priceMatches;
    });

    const sorted = [...filteredCards].sort((cardA, cardB) => {
      const productA = window.getSidraProductFromCard(cardA);
      const productB = window.getSidraProductFromCard(cardB);

      if (sortValue === "price-low") return productA.price - productB.price;
      if (sortValue === "price-high") return productB.price - productA.price;
      if (sortValue === "newest") {
        const dateA = new Date(productA.createdAt || productA.created_at || productA.createdDate || productA.dateAdded || 0).getTime();
        const dateB = new Date(productB.createdAt || productB.created_at || productB.createdDate || productB.dateAdded || 0).getTime();
        return dateB - dateA;
      }
      if (sortValue === "popular") {
        const score = (product) => safeNumber(product.popularity ?? product.sales ?? product.views ?? product.rating);
        return score(productB) - score(productA);
      }
      return 0;
    });

    homeProductCards.forEach((card) => {
      const shouldShow = sorted.includes(card);
      card.style.display = shouldShow ? "" : "none";
    });

    if (homeEmptyState) {
      homeEmptyState.hidden = sorted.length > 0;
    }
    if (noResultsTerm) {
      noResultsTerm.textContent = query ? `“${homeSearchInput.value.trim()}”` : "the selected filters";
    }
  };

  const RECENT_SEARCHES_KEY = "sidraCobeRecentSearches";
  const readRecentSearches = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || "[]");
      return Array.isArray(saved) ? saved.filter((term) => typeof term === "string").slice(0, 6) : [];
    } catch (error) {
      return [];
    }
  };

  const saveRecentSearch = (value) => {
    const term = String(value || "").trim().replace(/\s+/g, " ");
    if (!term) return;
    const next = [term, ...readRecentSearches().filter((saved) => saved.toLowerCase() !== term.toLowerCase())].slice(0, 6);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
  };

  const renderRecentSearches = () => {
    if (!recentSearchList || !recentSearchSection) return;
    const searches = readRecentSearches();
    recentSearchList.replaceChildren();
    searches.forEach((term) => {
      const row = document.createElement("div");
      row.className = "recent-search-row";
      const searchButton = document.createElement("button");
      searchButton.type = "button";
      searchButton.className = "search-suggestion";
      searchButton.dataset.searchValue = term;
      searchButton.textContent = term;
      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "remove-recent-search";
      removeButton.dataset.removeSearch = term;
      removeButton.setAttribute("aria-label", `Remove recent search ${term}`);
      removeButton.textContent = "×";
      row.append(searchButton, removeButton);
      recentSearchList.appendChild(row);
    });
    recentSearchSection.hidden = searches.length === 0;
  };

  const renderSearchDropdown = (showRecent = false) => {
    if (!searchDropdown || !searchSuggestions || !homeSearchInput) return;
    const query = homeSearchInput.value.trim().toLowerCase();
    searchSuggestions.innerHTML = "";
    if (!query) {
      renderRecentSearches();
      const showDropdown = showRecent && readRecentSearches().length > 0;
      searchDropdown.classList.toggle("hidden", !showDropdown);
      homeSearchInput.setAttribute("aria-expanded", String(showDropdown));
      if (clearSearchButton) clearSearchButton.hidden = true;
      return;
    }

    if (clearSearchButton) clearSearchButton.hidden = false;
    if (recentSearchSection) recentSearchSection.hidden = true;
    const products = window.SIDRA_PRODUCTS || [];
    const categories = [...new Set(products.map((product) => product.category).filter(Boolean))];
    const matchingCategories = categories.filter((category) => category.toLowerCase().includes(query));
    const suggestions = [
      ...matchingCategories.map((label) => ({ label, type: "category" })),
      ...products
        .filter((product) => {
          const productText = [product.name, product.category, product.description, ...(product.keywords || [])].filter(Boolean).join(" ").toLowerCase();
          return productText.includes(query) || matchingCategories.includes(product.category);
        })
        .map((product) => ({ label: product.name, type: "product" }))
    ].filter((item, index, all) => all.findIndex((candidate) => candidate.label === item.label) === index).slice(0, 7);

    suggestions.forEach((suggestion) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "search-suggestion";
      button.dataset.searchValue = suggestion.label;
      button.dataset.searchType = suggestion.type;
      button.textContent = suggestion.type === "category" ? `${suggestion.label} · Category` : suggestion.label;
      searchSuggestions.appendChild(button);
    });
    const showDropdown = suggestions.length > 0;
    searchDropdown.classList.toggle("hidden", !showDropdown);
    homeSearchInput.setAttribute("aria-expanded", String(showDropdown));
  };

  const submitSearch = (value, type = "product") => {
    if (!homeSearchInput) return;
    const term = String(value || "").trim();
    if (!term) return;
    homeSearchInput.value = term;
    if (type === "category" && homeCategorySelect) {
      const matchingCategory = Array.from(homeCategorySelect.options).find((option) => option.value.toLowerCase() === term.toLowerCase());
      if (matchingCategory) homeCategorySelect.value = matchingCategory.value;
    }
    saveRecentSearch(term);
    applyHomeFilters();
    renderSearchDropdown(false);
    searchDropdown?.classList.add("hidden");
    homeSearchInput.setAttribute("aria-expanded", "false");
  };

  const showAddedToast = () => {
    let toast = document.querySelector(".cart-toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.className = "cart-toast";
      Object.assign(toast.style, {
        position: "fixed",
        right: "20px",
        bottom: "20px",
        background: "rgba(13, 110, 253, 0.96)",
        color: "#fff",
        padding: "10px 16px",
        borderRadius: "999px",
        fontSize: "0.86rem",
        fontWeight: "700",
        boxShadow: "0 12px 28px rgba(13, 110, 253, 0.22)",
        zIndex: "9999",
        opacity: "0",
        transform: "translateY(10px)",
        transition: "all 0.2s ease"
      });
      document.body.appendChild(toast);
    }

    toast.textContent = showAddedToast.message || "Added to Cart";
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";

    clearTimeout(showAddedToast.timeoutId);
    showAddedToast.timeoutId = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
    }, 1200);
  };

  const showToast = (message) => {
    showAddedToast.message = message;
    showAddedToast();
    showAddedToast.message = "Added to Cart";
  };

  const copyToClipboard = async (value) => {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(value);
        return true;
      } catch (error) { }
    }
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand("copy");
    field.remove();
    return copied;
  };

  const shareProduct = async (product) => {
    const url = new URL("pages/product.html", window.location.href);
    url.searchParams.set("id", product.id);
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, url: url.href });
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }
    showToast(await copyToClipboard(url.href) ? "Product link copied" : "Could not copy product link");
  };

  if (voiceSearchButton) {
    let speechRecognitionInstance = null;

    voiceSearchButton.addEventListener("click", async () => {
      const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognitionConstructor) {
        setVoiceStatus("Voice search is not supported on this browser.");
        return;
      }

      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          stream.getTracks().forEach((track) => track.stop());
        }
      } catch (error) {
        setVoiceStatus("Microphone access was denied.");
        return;
      }

      if (!speechRecognitionInstance) {
        speechRecognitionInstance = new SpeechRecognitionConstructor();
        speechRecognitionInstance.lang = "en-US";
        speechRecognitionInstance.continuous = false;
        speechRecognitionInstance.interimResults = false;

        speechRecognitionInstance.onstart = () => {
          voiceSearchButton.classList.add("is-listening");
          setVoiceStatus("Listening...", true);
        };

        speechRecognitionInstance.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map((result) => (result && result[0] ? result[0].transcript : ""))
            .join(" ")
            .trim();

          if (!transcript) return;

          if (homeSearchInput) {
            homeSearchInput.value = transcript;
          }

          saveRecentSearch(transcript);
          applyHomeFilters();
          renderSearchDropdown(false);
          searchDropdown?.classList.add("hidden");
          homeSearchInput?.setAttribute("aria-expanded", "false");
          setVoiceStatus(transcript, false);
        };

        speechRecognitionInstance.onerror = (event) => {
          const errorName = event.error || "unknown";
          if (errorName === "not-allowed") {
            setVoiceStatus("Microphone access was denied.");
          } else if (errorName === "no-speech") {
            setVoiceStatus("No speech detected. Try again.");
          } else {
            setVoiceStatus("Voice search is not supported on this browser.");
          }
        };

        speechRecognitionInstance.onend = () => {
          voiceSearchButton.classList.remove("is-listening");
          if (!voiceSearchStatus || !voiceSearchStatus.textContent.trim()) {
            setVoiceStatus("");
          }
        };
      }

      try {
        speechRecognitionInstance.start();
      } catch (error) {
        setVoiceStatus("Voice search is not supported on this browser.");
      }
    });
  }

  if (cameraSearchButton && cameraSearchMenu) {
    cameraSearchButton.addEventListener("click", () => {
      cameraSearchMenu.classList.toggle("hidden");
    });

    cameraSearchMenu.querySelectorAll(".camera-option").forEach((option) => {
      option.addEventListener("click", () => {
        const mode = option.dataset.cameraMode || "gallery";
        if (!imageSearchInput) return;

        imageSearchInput.removeAttribute("capture");
        if (mode === "camera") {
          imageSearchInput.setAttribute("capture", "environment");
        }

        imageSearchInput.value = "";
        imageSearchInput.click();
        cameraSearchMenu.classList.add("hidden");
      });
    });
  }

  if (imageSearchInput) {
    imageSearchInput.addEventListener("change", (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        if (imageSearchPreview) {
          imageSearchPreview.src = String(reader.result || "");
        }
        if (imagePreviewBox) {
          imagePreviewBox.classList.remove("hidden");
        }
        setImageStatus("Visual search is not available yet.");
      };
      reader.readAsDataURL(file);
    });
  }

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isExpanded));

      if (categoryBar) {
        categoryBar.classList.toggle("mobile-open");
      }

      if (headerSearch) {
        headerSearch.classList.toggle("mobile-visible");
      }
    });
  }

  document.querySelectorAll(".wishlist-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const card = button.closest(".product-card");
      if (!card) return;

      const product = getProductMetaFromCard(card);
      const wishlist = readWishlist();
      const exists = wishlist.some((item) => String(item.id) === String(product.id));
      const nextWishlist = exists
        ? wishlist.filter((item) => String(item.id) !== String(product.id))
        : [...wishlist, product];

      saveWishlist(nextWishlist);
      syncWishlistButtons();
      updateWishlistCounts();
    });
  });

  homeSearchInput?.addEventListener("input", () => {
    applyHomeFilters();
    renderSearchDropdown();
  });
  homeSearchInput?.addEventListener("focus", () => renderSearchDropdown(true));
  homeSearchInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitSearch(homeSearchInput.value);
    }
    if (event.key === "Escape") {
      searchDropdown?.classList.add("hidden");
      homeSearchInput.setAttribute("aria-expanded", "false");
    }
  });

  searchDropdown?.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-search]");
    if (removeButton) {
      const term = removeButton.dataset.removeSearch;
      const next = readRecentSearches().filter((saved) => saved !== term);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
      renderSearchDropdown(true);
      return;
    }
    const suggestion = event.target.closest("[data-search-value]");
    if (suggestion) submitSearch(suggestion.dataset.searchValue, suggestion.dataset.searchType);
  });

  clearRecentSearchesButton?.addEventListener("click", () => {
    localStorage.setItem(RECENT_SEARCHES_KEY, "[]");
    renderSearchDropdown(true);
  });

  clearSearchButton?.addEventListener("click", () => {
    homeSearchInput.value = "";
    applyHomeFilters();
    renderSearchDropdown(true);
    homeSearchInput.focus();
  });

  clearSearchResultsButton?.addEventListener("click", () => {
    homeSearchInput.value = "";
    applyHomeFilters();
    renderSearchDropdown(false);
    homeSearchInput.focus();
  });

  browseCategoriesButton?.addEventListener("click", () => {
    homeSearchInput.value = "";
    if (homeCategorySelect) homeCategorySelect.value = "all";
    applyHomeFilters();
    homeCategorySelect?.scrollIntoView({ behavior: "smooth", block: "center" });
    homeCategorySelect?.focus();
  });

  document.addEventListener("click", (event) => {
    if (searchContainer && !searchContainer.contains(event.target)) {
      searchDropdown?.classList.add("hidden");
      homeSearchInput?.setAttribute("aria-expanded", "false");
    }
  });

  [homeSortSelect, homeCategorySelect, homeAvailabilitySelect, homeSizeSelect, homeColorSelect, homeRatingSelect, homeBrandSelect, homePriceMin, homePriceMax].forEach((control) => {
    if (control) {
      control.addEventListener("input", applyHomeFilters);
      control.addEventListener("change", applyHomeFilters);
    }
  });

  clearFiltersButton?.addEventListener("click", () => {
    if (homeSearchInput) homeSearchInput.value = "";
    if (homeSortSelect) homeSortSelect.value = "featured";
    if (homeCategorySelect) homeCategorySelect.value = "all";
    [homeAvailabilitySelect, homeSizeSelect, homeColorSelect, homeRatingSelect, homeBrandSelect].forEach((select) => {
      if (select) select.value = "all";
    });
    if (homePriceMin) homePriceMin.value = "";
    if (homePriceMax) homePriceMax.value = "";
    applyHomeFilters();
  });

  document.querySelectorAll(".wishlist-button").forEach((button) => {
    button.addEventListener("click", () => {
      const targetPage = button.dataset.wishlistPage || "pages/wishlist.html";
      window.location.href = targetPage;
    });
  });

  document.querySelectorAll(".cart-button").forEach((button) => {
    button.addEventListener("click", () => {
      const targetPage = button.dataset.cartPage || "pages/cart.html";
      window.location.href = targetPage;
    });
  });

  document.querySelectorAll(".account-button").forEach((button) => {
    button.addEventListener("click", () => {
      const targetPage = button.dataset.accountPage || "pages/account.html";
      window.location.href = targetPage;
    });
  });

  document.querySelectorAll(".newsletter-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const button = form.querySelector("button");
      if (button) {
        const originalText = button.textContent;
        button.textContent = "Subscribed";
        button.disabled = true;

        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
          form.reset();
        }, 1500);
      }
    });
  });

  document.querySelectorAll(".product-card").forEach((card) => {
    const product = window.getSidraProductFromCard(card);
    if (!product) {
      card.hidden = true;
      return;
    }
    const productId = String(product.id);
    card.dataset.productId = productId;
    card.dataset.category = product.category || card.dataset.category || "Featured";

    const media = card.querySelector(".product-media");
    if (media) {
      media.style.cursor = "pointer";
      media.addEventListener("click", () => {
        window.location.href = "pages/product.html?id=" + encodeURIComponent(productId);
      });
    }

    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      window.location.href = "pages/product.html?id=" + encodeURIComponent(productId);
    });

    const button = card.querySelector(".button-primary");
    if (!button) return;

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const productMeta = window.getSidraProductFromCard(card);
      if (!productMeta) return;
      const title = productMeta.name;
      const priceValue = safeNumber(productMeta.price);
      const productIdValue = String(productMeta.id);
      const cart = readCart();
      const existingItem = cart.find((item) => String(item.id) === String(productIdValue));
      if (safeNumber(productMeta.stock) < 1 || (existingItem && safeNumber(existingItem.quantity) >= safeNumber(productMeta.stock))) {
        showToast("This product is out of stock");
        return;
      }

      if (existingItem) {
        existingItem.quantity = safeNumber(existingItem.quantity) + 1;
      } else {
        cart.push({
          id: productIdValue,
          name: title,
          category: productMeta.category || "Featured",
          price: priceValue,
          quantity: 1,
          imageClass: productMeta.imageClass || "media-one"
        });
      }

      saveCart(cart);
      updateCartCounts();
      showAddedToast();

      const originalText = button.textContent;
      button.textContent = "Added to Cart";
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 1100);
    });

    const buyNowButton = card.querySelector(".button-secondary");
    if (buyNowButton) {
      buyNowButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const productMeta = window.getSidraProductFromCard(card);
        if (!productMeta) return;
        const productPayload = {
          id: productMeta.id,
          name: productMeta.name,
          category: productMeta.category,
          price: productMeta.price,
          oldPrice: productMeta.oldPrice,
          discount: productMeta.discount,
          imageClass: productMeta.imageClass,
          stock: productMeta.stock,
          description: productMeta.description
        };
        localStorage.setItem("sidraCobeBuyNow", JSON.stringify({ product: productPayload, quantity: 1 }));
        window.location.href = "pages/checkout.html";
      });
    }

    card.querySelector(".share-product-button")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      shareProduct(product);
    });

    card.querySelector(".detail-link")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      window.location.href = "pages/product.html?id=" + encodeURIComponent(productId);
    });
  });

  updateCartCounts();
  updateWishlistCounts();
  syncWishlistButtons();
  window.applySidraTranslation();
  applyHomeFilters();
});