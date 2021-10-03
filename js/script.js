/* jshint esversion: 6 */
"use strict";



document.addEventListener('DOMContentLoaded', function () {

    const cards = require ('./modules/cards'),
          tabs = require ('./modules/tabs'),
          modal = require ('./modules/modal'),
          timer = require ('./modules/timer'),
          calc = require ('./modules/calc'),
          forms = require ('./modules/forms'),
          slider = require ('./modules/slider');

    tabs ();
    modal ();
    timer ();
    cards ();
    calc ();
    forms ();
    slider ();

});