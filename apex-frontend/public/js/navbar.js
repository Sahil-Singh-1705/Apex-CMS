document.querySelectorAll('.dropdown-menu').forEach(function (dropdown) {
    dropdown.addEventListener('click', function (e) {
        e.stopPropagation();
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.bg-nav');
    if (window.scrollY > 500) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

window.addEventListener('scroll', function() {
    const navULs = document.querySelectorAll('.nav-drop'); 
    
    navULs.forEach(function(navUL) {
        if (window.scrollY > 500) {
            navUL.classList.add('scrolled');
        } else {
            navUL.classList.remove('scrolled');
        }
    });
});

window.addEventListener('scroll', function() {
    const Burger = document.querySelector('.burger-div'); 
    if (window.scrollY > 500) {
        Burger.classList.add('burgerscrolled');
    } else {
        Burger.classList.remove('burgerscrolled');
    }
});