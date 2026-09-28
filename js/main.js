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
  const category = card.dataset.category || "Featured";
const priceText = card.querySelector(".price")?.textContent || "₹0";
  const productId = String(card.dataset.productId || window.getSidraProductSlug(title));
  const found = window.getSidraProductById(productId) || SIDRA_PRODUCTS.find((item) => item.name === title);

  if (found) {
    card.dataset.productId = found.id;
    return found;
  }

  const baseProduct = {
    id: productId,
    name: title,
    category,
    price: Number(String(priceText).replace(/[^0-9.]/g, "")) || 0,
    oldPrice: null,
    discount: "",
    imageClass: Array.from(card.querySelector(".product-media")?.classList || []).find((className) => className.startsWith("media-")) || "media-one",
    stock: 10,
    description: "Premium product from the SIDRA COBE collection."
  };

  card.dataset.productId = baseProduct.id;
  return baseProduct;
};

window.SIDRA_PRODUCT_IDS = SIDRA_PRODUCTS.map((item) => item.id);
window.SIDRA_TRANSLATIONS = {
  en: {
    home: "Home",
    "my-order": "My Order",
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
    "lang-hinglish": "Hinglish"
  },
  hi: {
    home: "होम",
    "my-order": "मेरा ऑर्डर",
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
    "lang-hinglish": "Hinglish"
  },
  hinglish: {
    home: "Home",
    "my-order": "Mera Order",
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
    "lang-hinglish": "Hinglish"
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
        imageClass: item.imageClass || "style-1"
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
          imageClass: item.imageClass || "media-one"
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
        imageClass: item.imageClass || "media-one"
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
    const title = card.querySelector("h3")?.textContent?.trim() || "Product";
    const priceText = card.querySelector(".price")?.textContent || "₹0";
    const imageClass = Array.from(card.querySelector(".product-media")?.classList || []).find((className) => className.startsWith("media-")) || "media-one";
    const id = String(card.dataset.productId || title.toLowerCase().replace(/[^a-z0-9]+/g, "-")).trim();

    card.dataset.productId = id;

    return {
      id,
      name: title,
      category: card.dataset.category || "Featured",
      price: safeNumber(String(priceText).replace(/[^0-9.]/g, "")),
      imageClass
    };
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
  const homeFilterSelect = document.getElementById("filter-select");
  const homeProductCards = Array.from(document.querySelectorAll(".product-card"));
  const homeEmptyState = document.querySelector(".home-empty-state");

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
    const filterValue = homeFilterSelect?.value || "all";
    const sortValue = homeSortSelect?.value || "featured";

    const filteredCards = homeProductCards.filter((card) => {
      const product = window.getSidraProductFromCard(card);
      const name = (product.name || "").toLowerCase();
      const category = (product.category || "").toLowerCase();
      const searchMatches = !query || name.includes(query) || category.includes(query);
      const categoryMatches = categoryValue === "all" || category === categoryValue.toLowerCase();
      const filterMatches =
        filterValue === "all" ||
        (filterValue === "under-100" ? product.price < 100 : product.price >= 100);

      return searchMatches && categoryMatches && filterMatches;
    });

    const sorted = [...filteredCards].sort((cardA, cardB) => {
      const productA = window.getSidraProductFromCard(cardA);
      const productB = window.getSidraProductFromCard(cardB);

      if (sortValue === "price-low") return productA.price - productB.price;
      if (sortValue === "price-high") return productB.price - productA.price;
      return 0;
    });

    homeProductCards.forEach((card) => {
      const shouldShow = sorted.includes(card);
      card.style.display = shouldShow ? "" : "none";
    });

    if (homeEmptyState) {
      homeEmptyState.hidden = sorted.length > 0;
    }
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

    toast.textContent = "Added to Cart";
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";

    clearTimeout(showAddedToast.timeoutId);
    showAddedToast.timeoutId = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
    }, 1200);
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
          await navigator.mediaDevices.getUserMedia({ audio: true });
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

          applyHomeFilters();
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
        setImageStatus("Image search is not available yet.");
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

  [homeSearchInput, homeSortSelect, homeCategorySelect, homeFilterSelect].forEach((control) => {
    if (control) {
      control.addEventListener("input", applyHomeFilters);
      control.addEventListener("change", applyHomeFilters);
    }
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
      const title = productMeta.name;
      const priceValue = safeNumber(productMeta.price);
      const productIdValue = String(productMeta.id);
      const cart = readCart();
      const existingItem = cart.find((item) => String(item.id) === String(productIdValue));

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
        const productPayload = {
          id: productMeta.id,
          name: productMeta.name,
          category: productMeta.category,
          price: productMeta.price,
          oldPrice: productMeta.oldPrice,
          discount: productMeta.discount,
          imageClass: productMeta.imageClass,
          stock: productMeta.stock || 10,
          description: productMeta.description
        };
        localStorage.setItem("sidraCobeBuyNow", JSON.stringify({ product: productPayload, quantity: 1 }));
        window.location.href = "pages/checkout.html";
      });
    }
  });

  updateCartCounts();
  updateWishlistCounts();
  syncWishlistButtons();
  applyHomeFilters();
});