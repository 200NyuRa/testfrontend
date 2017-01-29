(function () {
    // если нас транице есть селектор 'select', происходит его стили зация через плагин selectBox
    let select = $('select');
    if (select.length) {
        select.selectBox({
            mobile: false,
            menuTransition: 'default',
            bottomPositionCorrelation: 0
        });
    }
})();
