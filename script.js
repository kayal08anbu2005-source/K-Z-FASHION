var cartCount = Number(localStorage.getItem("cartCount")) || 0;

function updateCartCount() {
    document.querySelectorAll(".cart-count").forEach(function (item) {
        item.textContent = cartCount;
    });
}

function showToast(message) {
    var toast = document.querySelector(".toast-message");
    if (!toast) {
        toast = document.createElement("div");
        toast.className = "toast-message";
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(function () {
        toast.classList.remove("show");
    }, 2200);
}

function setupCartButtons() {
    document.querySelectorAll(".quick-add").forEach(function (button) {
        button.addEventListener("click", function () {
            cartCount += 1;
            localStorage.setItem("cartCount", cartCount);
            updateCartCount();
            showToast("Added to bag");
        });
    });
}

function setupFilters() {
    var chips = document.querySelectorAll("[data-filter]");
    var products = document.querySelectorAll("[data-category]");

    chips.forEach(function (chip) {
        chip.addEventListener("click", function () {
            var filter = chip.getAttribute("data-filter");

            chips.forEach(function (item) {
                item.classList.remove("active");
            });
            chip.classList.add("active");

            products.forEach(function (product) {
                var productCategory = product.getAttribute("data-category");
                if (filter === "all" || productCategory === filter) {
                    product.style.display = "";
                } else {
                    product.style.display = "none";
                }
            });
        });
    });
}

function setupSearch() {
    var input = document.querySelector("#siteSearch");
    if (!input) {
        return;
    }

    input.addEventListener("input", function () {
        var searchText = input.value.toLowerCase().trim();
        var products = document.querySelectorAll("[data-product]");

        products.forEach(function (product) {
            var name = product.getAttribute("data-product").toLowerCase();
            if (name.indexOf(searchText) > -1) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }
        });
    });
}

function setupNewsletter() {
    var form = document.querySelector("#newsletterForm");
    if (!form) {
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var email = form.querySelector("input").value.trim();
        if (email.length < 5 || email.indexOf("@") === -1) {
            showToast("Please enter a valid email");
            return;
        }
        form.reset();
        showToast("Thanks for joining StyleNest");
    });
}

function setupYear() {
    var year = document.querySelector("#year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
    setupCartButtons();
    setupFilters();
    setupSearch();
    setupNewsletter();
    setupYear();
});
