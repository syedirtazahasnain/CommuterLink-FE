window.onload = function () {
    const menuItems = document.querySelectorAll('.menu-item.menu-accordion[data-kt-menu-trigger]');
    for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener('click', function (e) {
            menuItems[i].classList.toggle('show');
        });
    }
}