const fs = require('fs');
const path = require('path');

const productModel = require('../model/productModel')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		const products = {
		productsList: productModel.findAll(),
		toThousand
		}
		console.log(products.productsList)
		res.render('products.ejs', {products} )
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const id = req.params.id
		const productDetail = {
			productById: productModel.findByPk(id),
			toThousand
		}
		console.log(productDetail.productById)
		res.render('detail.ejs', {productDetail})
		// Do the magic
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
		// Do the magic
	},
	
	// Create -  Method to store
	store: (req, res) => {
		console.log("entre al controlador")
		const newData = req.body
		const { file } = req
		newData.image = file.filename
		productModel.create(newData)
		res.redirect('products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		const id = req.params.id
		const productToEdit = productModel.findByPk(id)
		res.render('product-edit-form.ejs', {productToEdit})
	},
	// Update - Method to update
	update: (req, res) => {
		const data = req.body
		const productToEdit = productModel.findByPk(req.params.id)
		const { file } = req
		let image
		if(file){
			image = file.filename
		}else{
			image = productToEdit.image
		} 
		data.image = image
		data.price = Number (data.price)
		data.discount = Number (data.discount)
		const id = req.params.id
		productModel.update(data, id) 
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