let formCard = {
    form: document.querySelector('.form-card__form'),
    inputs: document.querySelectorAll('input'),
    submit: document.querySelector('button[type="submit"'),
    cardNumber: document.querySelectorAll('.field__number'),
    cardholder: document.getElementById('cardholder'),
    iCVC: document.getElementById('iCVC'),
    selects: document.querySelectorAll('select'),

    init: function () {
        if (this.form) {
            let cardNumber = this.cardNumber,
                cardholder = this.cardholder,
                iCVC = this.iCVC;

            // Создадим объект CustomValidation для каждого поля, которое должно проходить валидацию
            for (let j = 0; j < cardNumber.length; j++) {
                cardNumber[j].CustomValidation = new this.CustomValidation();
                cardNumber[j].CustomValidation.validityChecks = this.validityChecks.cardNumber;
            }

            cardholder.CustomValidation = new this.CustomValidation();
            cardholder.CustomValidation.validityChecks = this.validityChecks.cardholder;
            iCVC.CustomValidation = new this.CustomValidation();
            iCVC.CustomValidation.validityChecks = this.validityChecks.iCVC;
            this.setUpListeners();
        }
    },

    // функция конструктор для проверки валидации поля input, по параметрам в объекте checkValidity
    // добавляет/удаляет класс ошибки и возвращает true/false, если поле валидно/невалидно
    CustomValidation: function () {
        this.validityChecks = [];
        this.checkValidity = function (input, event) {

            for (let i = 0; i < this.validityChecks.length; i++) {

                let isValid = this.validityChecks[i].isValid(input, event);
                if (isValid) {
                    input.classList.remove('field__input_error');
                    return true;
                } else {
                    input.classList.add('field__input_error');
                    return false;
                }
            }
        };
    },

    // объект с параметрами, для праверки на валидность для каждого вида полей input
    validityChecks: {
        cardNumber: [{
            isValid: function (input, event) {
                let result;

                if (event.type === 'blur' || event.type === 'click') {
                    result = /^\d{4}$/.test(input.value);
                } else {
                    result = (input.value.length <= 4) ? /^[0-9]+$/.test(input.value) : /^\d{4}$/.test(input.value);
                }

                return result;
            },
        }],
        cardholder: [{
            isValid: function (input, event) {
                let result;
                if (event.type === 'blur' || event.type === 'click') {
                    result = /^[A-Z]{4,}$/.test(input.value);
                } else {
                    result = /^[A-Z]+$/.test(input.value);
                }

                return result;
            },
        }],
        iCVC: [{
            isValid: function (input, event) {
                let result;
                if (event.type === 'blur' || event.type === 'click') {
                    result = /^\d{3}$/.test(input.value);
                } else {
                    result = (input.value.length <= 3) ? /^[0-9]+$/.test(input.value) : /^\d{3}$/.test(input.value);
                }
                return result;
            }
        }]
    },

    setUpListeners: function () {
        let inputs = this.inputs,
            selects = this.selects;

        // проверка input на валидность при вводе информации и при потере фокуса
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('keyup', function (event) {
                this.checkInput.call(formCard, inputs[i], event);
            }.bind(formCard));

            inputs[i].addEventListener('blur', function (event) {
                this.checkInput.call(formCard, inputs[i], event);
            }.bind(formCard));
        }

        // проверка select на валидность при потере фокуса blur
        for (let i = 0; i < selects.length; i++) {
            selects[i].nextSibling.addEventListener('blur', function (event) {
                this.validitySelect.call(formCard, selects[i].nextSibling, event);
            }.bind(formCard));
        }

        // проверка всех input и селект при клике на кнопку отправки формы
        this.submit.addEventListener('click', function (event) {
            let stopSubmit = false;
            for (let i = 0; i < inputs.length; i++) {
                this.checkInput.call(formCard, inputs[i], event);

                if (this.checkInput.call(formCard, inputs[i], event) === false) {
                    stopSubmit = true;
                }
            }

            for (let i = 0; i < selects.length; i++) {
                this.validitySelect.call(formCard, selects[i].nextSibling, event);

                if (this.validitySelect.call(formCard, selects[i].nextSibling, event) === false) {
                    stopSubmit = true;
                }
            }

            if (stopSubmit) {
                event.preventDefault();
            }
        }.bind(formCard));
    },

    // возвращает результат выполнения проверки на валидность
    // true - поле валидно, false - невалидно
    checkInput: function (input, event) {
        return input.CustomValidation.checkValidity(input, event);
    },

    validitySelect: function (select, event) {
        // проверка на валидность select - если у списка select не выбрано значение, то
        // список не валиден - добавляется класс ошибки, функция возвращает false
        //  если занчение выбрано - класс ошибки удаляется, функция возвращает true
        let currentSelect = select.previousElementSibling,
            result = currentSelect.value ? true : false;

        if (result) {
            select.classList.remove('field__input_error');
            return true;
        } else {
            select.classList.add('field__input_error');
            return false;
        }
    }
};

formCard.init();
