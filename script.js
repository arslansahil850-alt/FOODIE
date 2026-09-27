
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const categoryCards = document.querySelectorAll(".category-card");
const foodCards = document.querySelectorAll(".food-card");
const foodSearch = document.querySelector(".food-search input");
const favoriteButtons = document.querySelectorAll(".favorite-btn");
const cartButtons = document.querySelectorAll(".add-btn");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const scrollTopButton = document.querySelector(".scroll-top");
const yearElement = document.querySelector("#current-year");

function showMessage(message) {
    const messageBox = document.createElement("div");

    messageBox.className = "message-box";
    messageBox.textContent = message;

    document.body.appendChild(messageBox);

    requestAnimationFrame(() => {
        messageBox.classList.add("show");
    });

    setTimeout(() => {
        messageBox.classList.remove("show");

        setTimeout(() => {
            messageBox.remove();
        }, 300);
    }, 2000);
}

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", event => {
        event.stopPropagation();

        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });

    document.addEventListener("click", event => {
        if (
            !menuToggle.contains(event.target) &&
            !navMenu.contains(event.target)
        ) {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");
        }
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");
        });
    });
}

categoryCards.forEach(categoryCard => {
    categoryCard.addEventListener("click", () => {
        const selectedCategory = categoryCard.dataset.category;

        categoryCards.forEach(card => {
            card.classList.remove("active");
        });

        categoryCard.classList.add("active");

        if (foodSearch) {
            foodSearch.value = "";
        }

        foodCards.forEach(foodCard => {
            const foodCategory = foodCard.dataset.category;

            if (
                selectedCategory === "all" ||
                foodCategory === selectedCategory
            ) {
                foodCard.style.display = "block";
            } else {
                foodCard.style.display = "none";
            }
        });
    });
});

if (foodSearch) {
    foodSearch.addEventListener("input", () => {
        const searchValue = foodSearch.value.toLowerCase().trim();

        foodCards.forEach(foodCard => {
            const foodName =
                foodCard.querySelector("h3")?.textContent.toLowerCase() || "";

            const foodCategory =
                foodCard.dataset.category?.toLowerCase() || "";

            const matchesSearch =
                foodName.includes(searchValue) ||
                foodCategory.includes(searchValue);

            if (matchesSearch) {
                foodCard.style.display = "block";
            } else {
                foodCard.style.display = "none";
            }
        });
    });
}

favoriteButtons.forEach(button => {
    button.addEventListener("click", event => {
        event.stopPropagation();

        button.classList.toggle("active");

        if (button.classList.contains("active")) {
            button.innerHTML = "🧡";
            showMessage("Added to wishlist");
        } else {
            button.innerHTML = "♡";
            showMessage("Removed from wishlist");
        }
    });
});

cartButtons.forEach(button => {
    button.addEventListener("click", event => {
        event.stopPropagation();

        showMessage("Added to cart");
    });
});

function updateActiveNavLink() {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}

function updateScrollTopButton() {
    if (!scrollTopButton) {
        return;
    }

    if (window.scrollY > 500) {
        scrollTopButton.classList.add("show");
    } else {
        scrollTopButton.classList.remove("show");
    }
}

window.addEventListener("scroll", () => {
    updateActiveNavLink();
    updateScrollTopButton();
});

if (scrollTopButton) {
    scrollTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

const revealElements = document.querySelectorAll(
    ".section-heading, .category-card, .food-card, .about-content, .about-image, .cta-content"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(element => {
        element.classList.add("show");
    });
}

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 800 && navMenu) {
        navMenu.classList.remove("active");
        menuToggle?.classList.remove("active");
    }
});

updateActiveNavLink();
updateScrollTopButton();

