(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

// REGISTER
window.register = function () {
    let name = document.getElementById("regName").value.trim();
    let email = document.getElementById("regEmail").value.trim();
    let pass = document.getElementById("regPassword").value.trim();
    let confirm = document.getElementById("regConfirm").value.trim();

    if (!name || !email || !pass || !confirm) {
        alert("Fill all fields ❌");
        return;
    }

    if (pass !== confirm) {
        alert("Password not matching ❌");
        return;
    }

    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", pass);

    alert("Registered successfully ✅ Now login");

    showLogin();
};


// LOGIN
window.login = function () {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    let storedEmail = localStorage.getItem("userEmail");
    let storedPass = localStorage.getItem("userPassword");

    if (!email || !password) {
        alert("Fill all fields ❌");
        return;
    }

    if (email === storedEmail && password === storedPass) {
        alert("Login successful ✅");

        localStorage.setItem("isLoggedIn", "true");

        window.location.href = "index.html";
    } else {
        alert("Invalid email or password ❌");
    }
};


// SHOW FORMS
window.showLogin = function () {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
};

window.showRegister = function () {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
};


// LOGOUT BUTTON CONTROL
window.addEventListener("load", function () {
    const authBtn = document.getElementById("authBtn");

    if (!authBtn) return;

    if (localStorage.getItem("isLoggedIn") === "true") {
        authBtn.innerHTML = `Logout<i class="fa fa-sign-out-alt ms-3"></i>`;
        authBtn.href = "#";

        authBtn.onclick = function (e) {
            e.preventDefault();
            localStorage.removeItem("isLoggedIn");
            window.location.href = "login.html";
        };
    }
});