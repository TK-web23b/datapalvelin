'use strict';

const {LukijaKirjoittaja} = require('./lukijaKirjoittaja.');
const {muunnin} = require('./jäätelösovitin');

const lukija=new LukijaKirjoittaja();

lukija.lueVarasto('./jaatelot.json').then(console.log);
lukija.lueVarasto('./x.json').then(console.log);