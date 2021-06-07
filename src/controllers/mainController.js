const fs = require('fs');
const path = require('path');
const productModel = require('../model/productModel')


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {	
		res.render('index.ejs', {productModel})
	},
	search: (req, res) => {
		
	},
};

module.exports = controller;
