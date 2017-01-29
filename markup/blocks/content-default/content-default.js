(function () {
    let menuMobile = {
        menuBtn: document.querySelector('.content-default__btn-hamburger'),

        init: function () {
            // если на странице есть елемент .content-default__btn-hamburger код выполняется
            if (this.menuBtn) {
                this.setUpListeners();
            }
        },

        setUpListeners() {
            // клик по кнопке закрытия/открытия меню ".content-default__btn-hamburger"
            this.menuBtn.addEventListener('click', function (event) {
                this.toggleMenu.call(menuMobile, event);
            }.bind(menuMobile));
        },

        // при клике по кнопке закрытия/открытия меню ".content-default__btn-hamburger"
        // у мобильного меню переключается класс открытия/закрытия, страница(класс .page)
        // изменяет свое состояние при открытом/меню
        toggleMenu: function (event) {
            event.preventDefault();
            let classPage = this.menuBtn.closest('.page'),
                menuInMobile = this.menuBtn.nextElementSibling;
            if (menuInMobile) {
                menuInMobile.classList.toggle('content-default__menu-mobile_open');
                classPage.classList.toggle('page_menu-mobile-open');
            }
        }
    };

    menuMobile.init();
})();
