const fs = require('fs');
const path = require('path');
const productModel = require('../model/productModel')


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {	
		productList ={
			productModel,
			toThousand
		}
		res.render('index.ejs', {productList})
	},
	search: (req, res) => {
		
	},
};

module.exports = controller;
