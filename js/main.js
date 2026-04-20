import { api } from "./api.js";

const heroSection = document.getElementById("hero");
const featuresSection = document.getElementById("features");
const loadingState = document.getElementById("loading-state");
const mainContent = document.getElementById("main-content");
const errorState = document.getElementById("error-state");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

async function initApp() {
  try {
    loadingState.style.display = "block";
    mainContent.style.display = "none";
    errorState.style.display = "none";

    const data = await api.fetchData();
    // img link
    let Data = [
      {
        img: "assets/images/selfKiosk.webp",
        targetLink: "",
      },
      {
        img: "assets/images/selfKiosk.webp",
        targetLink: "",
      },
      {
        img: "assets/images/kitchenDisplay.webp",
        targetLink: "",
      },
    ];
    let htmlContent = "";
    Data.forEach((item) => {
      htmlContent = `<a href="${item.targetLink}><img src="${item.img}"/> </a>`;
    });
    document.getElementsByClassName(".product-card").innerHTML = htmlContent;

    // 1. Render Hero Section
    heroSection.innerHTML = `
            <div class="hero-content">
                <img class="shape protractor" src="assets/images/blueEllipse.png">
                <img class="shape cone" src="assets/images/redEllipse.png">
                <h1 class="hero-title">
                    ${data.hero.headlinePrefix} <br>
                    <span class="gradient-text">${data.hero.headlineGradient}</span>
                </h1>
                <p class="sub-text">${data.hero.subHeadline}</p>
                <a href="https://www.grafterr.com/" ><button class="cta-btn">${data.hero.ctaText}</button></a>
                <div class="grow-section">
                    <h2 class="hero-title2">${data.hero.growTitle}</h2>
                    <p>${data.hero.growSub}</p>
                </div>
            </div>`;

    // 2. Render Features Carousel
    featuresSection.innerHTML = data.features
      .map(
        (item) => `
            <div class="product-card">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>


                <a href="${item.targetLink}"><img src="${item.img}" alt="${item.title}"></a>



            </div>
            `,
      )
      .join("");

    // 3. Carousel Logic
    const scrollAmount = () => {
      const card = document.querySelector(".product-card");
      return card ? card.offsetWidth + 20 : 300;
    };

    nextBtn.onclick = () => {
      featuresSection.scrollBy({ left: scrollAmount(), behavior: "smooth" });
    };

    backBtn.onclick = () => {
      featuresSection.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
    };

    loadingState.style.display = "none";
    mainContent.style.display = "block";
  } catch (error) {
    console.error("Initialization error:", error);
    loadingState.style.display = "none";
    errorState.style.display = "block";
  }
}

document.getElementById("retry-btn").addEventListener("click", initApp);
initApp();
