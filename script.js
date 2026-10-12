/* ============================
   FOOD HOUSE - script.js
   JavaScript: Nav, Filter, Search, Modal, Form
============================= */

// ── Data mon an (dong bo voi HTML) ──
const foodData = [
  {
    name: "Pho Bo",
    price: "45.000d",
    category: "viet",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Pho_bo.jpg/400px-Pho_bo.jpg",
    desc: "Pho bo truyen thong voi nuoc dung dam da, thit bo tuoi ngon va cac loai rau thom dac trung."
  },
  {
    name: "Com Tam",
    price: "40.000d",
    category: "viet",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Com_tam_suon_bi_cha_trung.jpg/400px-Com_tam_suon_bi_cha_trung.jpg",
    desc: "Com tam suon bi cha thom ngon, an kem nuoc mam chua ngot dac trung mien Nam."
  },
  {
    name: "Bun Bo Hue",
    price: "50.000d",
    category: "viet",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Bun-bo-hue.jpg/400px-Bun-bo-hue.jpg",
    desc: "Bun bo Hue cay nong, thom mui sa, nuoc dung dam vi dac trung xu Hue."
  },
  {
    name: "Banh Mi Dac Biet",
    price: "25.000d",
    category: "viet",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Banh-mi-sandwich-popular-food.jpg/400px-Banh-mi-sandwich-popular-food.jpg",
    desc: "Banh mi gion tan, nhan thit nguoi, cha lua, rau thom va tuong ot dac trung."
  },
  {
    name: "Tokbokki",
    price: "55.000d",
    category: "han",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Korean.food-Tteokbokki-02.jpg/400px-Korean.food-Tteokbokki-02.jpg",
    desc: "Banh gao Han Quoc xao sot cay dac trung, dai ngon va hap dan."
  },
  {
    name: "Kimbap",
    price: "45.000d",
    category: "han",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Korean.food-Gimbap-01.jpg/400px-Korean.food-Gimbap-01.jpg",
    desc: "Cuon com Han Quoc voi rau cu va thit, cuon trong la rong bien thom ngon."
  },
  {
    name: "Tra Sua Tran Chau",
    price: "35.000d",
    category: "drink",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Bubble_tea_4.jpg/400px-Bubble_tea_4.jpg",
    desc: "Tra sua thom ngon voi tran chau deo, co the chon muc duong va da theo y thich."
  },
  {
    name: "Ca Phe Sua Da",
    price: "20.000d",
    category: "drink",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/400px-A_small_cup_of_coffee.JPG",
    desc: "Ca phe sua da Viet Nam truyen thong, dam da, thom ngon, giai khat hoang hon."
  },
  {
    name: "Ga Ran Gion",
    price: "60.000d",
    category: "fast",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/American_Fried_Chicken.jpg/400px-American_Fried_Chicken.jpg",
    desc: "Ga ran gion tan ben ngoai, mem thom ben trong, an kem sot cay dac biet."
  },
  {
    name: "Burger Dac Biet",
    price: "65.000d",
    category: "fast",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Food-Hamburger.jpg/400px-Food-Hamburger.jpg",
    desc: "Burger thit bo Angus voi pho mai, rau xa lach, ca chua va sot dac biet cua nha hang."
  }
];

/* ============================
   1. HAMBURGER MENU (Mobile)
============================= */
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks     = document.getElementById("navLinks");

hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("open");
  navLinks.classList.toggle("open");
});

// Dong menu khi click vao link
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburgerBtn.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

/* ============================
   2. NAV ACTIVE KHI SCROLL
============================= */
const sections = document.querySelectorAll("section[id], header[id]");
const navAnchors = navLinks.querySelectorAll("a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 90) {
      current = sec.getAttribute("id");
    }
  });
  navAnchors.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) a.classList.add("active");
  });
});

/* ============================
   3. CUON XUONG MENU (Nut Hero)
============================= */
const scrollToMenuBtn = document.getElementById("scrollToMenuBtn");
scrollToMenuBtn.addEventListener("click", () => {
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
});

/* ============================
   4. BO LOC MON AN
============================= */
const filterBtns = document.querySelectorAll(".filter-btn");
const foodCards  = document.querySelectorAll(".food-card");
const noResult   = document.getElementById("noResult");

function filterCards(filter) {
  let visible = 0;
  foodCards.forEach(card => {
    const cat = card.dataset.category;
    const show = filter === "all" || cat === filter;
    card.classList.toggle("hidden", !show);
    if (show) visible++;
  });
  noResult.style.display = visible === 0 ? "block" : "none";
}

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filterCards(btn.dataset.filter);
    // reset search
    document.getElementById("searchInput").value = "";
  });
});

/* ============================
   5. TIM KIEM MON AN
============================= */
const searchInput = document.getElementById("searchInput");
const searchBtn   = document.getElementById("searchBtn");

function doSearch() {
  const keyword = searchInput.value.trim().toLowerCase();
  if (!keyword) {
    // reset filter
    filterCards("all");
    filterBtns.forEach(b => b.classList.remove("active"));
    filterBtns[0].classList.add("active");
    return;
  }

  // Reset active filter
  filterBtns.forEach(b => b.classList.remove("active"));

  let visible = 0;
  foodCards.forEach(card => {
    const name = (card.dataset.name || "").toLowerCase();
    const desc = (card.dataset.desc || "").toLowerCase();
    const show = name.includes(keyword) || desc.includes(keyword);
    card.classList.toggle("hidden", !show);
    if (show) visible++;
  });
  noResult.style.display = visible === 0 ? "block" : "none";

  if (keyword) {
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
  }
}

searchBtn.addEventListener("click", doSearch);
searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") doSearch();
});

/* ============================
   6. MODAL CHI TIET MON AN
============================= */
const modalOverlay = document.getElementById("modalOverlay");
const modalContent = document.getElementById("modalContent");
const modalClose   = document.getElementById("modalClose");

function openModal(card) {
  const name  = card.dataset.name  || "";
  const price = card.dataset.price || "";
  const desc  = card.dataset.desc  || "";
  const img   = card.querySelector("img") ? card.querySelector("img").src : "";

  modalContent.innerHTML = `
    ${img ? '<img src="' + img + '" alt="' + name + '" />' : ""}
    <h2>${name}</h2>
    <p class="modal-price">${price}</p>
    <p>${desc}</p>
    <br/>
    <button class="btn btn-detail" style="width:100%;margin-top:8px" onclick="orderNow('${name}')">
      Dat mon ngay
    </button>
  `;
  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

// Mo modal khi bam "Xem mon"
document.querySelectorAll(".btn-detail").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".food-card");
    if (card) openModal(card);
  });
});

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", e => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

// Dat mon tu modal -> dien vao form
window.orderNow = function(name) {
  closeModal();
  document.getElementById("dish").value = name;
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  showToast("Da chon mon: " + name + ". Hay dien thong tin de dat mon!", "success");
};

/* ============================
   7. FORM LIEN HE + VALIDATION
============================= */
const contactForm = document.getElementById("contactForm");

function setError(id, msg) {
  const el   = document.getElementById(id);
  const errEl = document.getElementById("err-" + id);
  if (msg) {
    el.classList.add("error");
    if (errEl) errEl.textContent = msg;
  } else {
    el.classList.remove("error");
    if (errEl) errEl.textContent = "";
  }
}

function validateForm() {
  let valid = true;

  const fullname = document.getElementById("fullname").value.trim();
  const phone    = document.getElementById("phone").value.trim();
  const dish     = document.getElementById("dish").value.trim();

  if (!fullname) {
    setError("fullname", "Vui long nhap ho va ten.");
    valid = false;
  } else if (fullname.length < 2) {
    setError("fullname", "Ho ten phai co it nhat 2 ky tu.");
    valid = false;
  } else {
    setError("fullname", "");
  }

  if (!phone) {
    setError("phone", "Vui long nhap so dien thoai.");
    valid = false;
  } else if (!/^(0|\+84)[0-9]{8,10}$/.test(phone)) {
    setError("phone", "So dien thoai khong hop le.");
    valid = false;
  } else {
    setError("phone", "");
  }

  if (!dish) {
    setError("dish", "Vui long nhap mon muon hoi.");
    valid = false;
  } else {
    setError("dish", "");
  }

  return valid;
}

contactForm.addEventListener("submit", e => {
  e.preventDefault();
  if (validateForm()) {
    showToast("Gui lien he thanh cong! Chung toi se lien lac sом.", "success");
    contactForm.reset();
    // Xoa error styles
    ["fullname","phone","dish"].forEach(id => setError(id, ""));
  } else {
    showToast("Vui long kiem tra lai thong tin.", "error");
  }
});

// Validate real-time
["fullname","phone","dish"].forEach(id => {
  document.getElementById(id).addEventListener("input", () => {
    validateForm();
  });
});

/* ============================
   8. TOAST NOTIFICATION
============================= */
let toastTimeout;
function showToast(msg, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.className = "toast show " + type;
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

/* ============================
   9. HEADER SCROLL EFFECT
============================= */
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.style.background = "rgba(26,26,46,0.98)";
  } else {
    header.style.background = "rgba(26,26,46,0.96)";
  }
});

/* ============================
   10. ANIMATION KHI SCROLL (IntersectionObserver)
============================= */
const animatedEls = document.querySelectorAll(".food-card, .about-content, .contact-wrapper, .stat");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = "1";
      entry.target.style.transform  = "translateY(0)";
    }
  });
}, { threshold: 0.1 });

animatedEls.forEach(el => {
  el.style.opacity   = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

console.log("FOOD HOUSE script loaded OK");
