/* KEYUR'S PERSONAL PORTFOLIO - Simple JavaScript */

document.addEventListener("DOMContentLoaded", function () {

    /* Mobile navigation */
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navMenu.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
            });
        });

        document.addEventListener("click", function (event) {
            const clickedInsideMenu = navMenu.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (navMenu.classList.contains("active") && !clickedInsideMenu && !clickedToggle) {
                navMenu.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
            }
        });
    }

    /* Active navigation highlighting */
    const sections = document.querySelectorAll("main section");

    const navigationSections = [
        "home",
        "about",
        "education",
        "interests",
        "goals",
        "contact"
    ];

    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const currentSection = entry.target.getAttribute("id");

                if (navigationSections.includes(currentSection)) {
                    navLinks.forEach(function (link) {
                        link.classList.remove("active");
                    });

                    const activeLink = document.querySelector(
                        '.nav-menu a[href="#' + currentSection + '"]'
                    );

                    if (activeLink) {
                        activeLink.classList.add("active");
                    }
                }
            }
        });
    }, {
        root: null,
        threshold: 0.35
    });

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });

    /* Simple scroll reveal */
    const revealStyle = document.createElement("style");

    revealStyle.textContent = `
        .js-reveal {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .js-reveal.is-visible {
            opacity: 1;
            transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
            .js-reveal {
                opacity: 1;
                transform: none;
                transition: none;
            }
        }
    `;

    document.head.appendChild(revealStyle);

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-intro, " +
        ".detail-card, " +
        ".education-card, " +
        ".interest-card, " +
        ".strength-item, " +
        ".goal-card, " +
        ".contact-card"
    );

    revealElements.forEach(function (element) {
        element.classList.add("js-reveal");
    });

    const revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
    });

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });

    /* Current year */
    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* Escape key closes the mobile menu */
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && navMenu && navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");

            if (menuToggle) {
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
                menuToggle.focus();
            }
        }
    });
});
