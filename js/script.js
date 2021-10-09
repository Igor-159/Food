
"use strict";
    require('es6-promise').polyfill();
    import 'nodelist-foreach-polyfill';

    import cards  from './modules/cards';
    import tabs  from './modules/tabs';
    import modal  from './modules/modal';
    import timer  from './modules/timer';
    import calc  from './modules/calc';
    import forms  from './modules/forms';
    import slider  from './modules/slider';
    import {openModal} from './modules/modal';

document.addEventListener('DOMContentLoaded', function () {

    const modalTimerId = setTimeout (() => openModal('.modal, modalTimerId'), 50000);

    tabs ('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal ('[data-modal]', '.modal', modalTimerId);
    timer ('.timer', '2021-10-11');
    cards ();
    calc ();
    forms ('form', modalTimerId);
    slider ({
        conteiner: '.offer__slider',
        nextArrow: '.offer__slider-next',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });

});