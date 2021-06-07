const fs = require('fs');
const path = require('path');

const productModel = require('../model/productModel')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		const products = productModel.findAll()
		console.log(products)
		res.render('products.ejs', {products} )
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const id = req.params.id
		const productDetail = productModel.findByPk(id)
		console.log(productDetail)
		res.render('detail.ejs', {productDetail})
		// Do the magic
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {
		const id = req.params.id
		const productToEdit = productModel.findByPk(id)
		res.render('product-edit-form.ejs', {productToEdit})
	},
	// Update - Method to update
	update: (req, res) => {
		console.log("ingreso al update del controller")
		const {name, description, price, discount, image, category} = req.body
		productToUpdate ={
			name,
			description,
			price: Number(price),
			discount: Number(discount),
			image,
			category
		}
		const id = req.params.id
		productModel.update(productToUpdate, id) 
		res.redirect('/')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const id = req.params.id
		productModel.delete(id)
		res.redirect('/')
	}
	
};

module.exports = controller;