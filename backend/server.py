#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Mar 17 00:06:11 2024

@author: natashaoberoi
"""

from flask import Flask, request, jsonify
from sql_connection import get_sql_connection
import mysql.connector
import json
from flask_cors import CORS

import products_dao
import orders_dao
#import uom_dao

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'application/json'

connection = get_sql_connection()

@app.route('/getProducts', methods=['GET'])
def get_products():
    response = products_dao.get_all_products(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertProduct', methods=['POST'])
def insert_product():
    print(request.form['data'])
    request_payload = json.loads(request.form['data'])
    product_id = products_dao.insert_new_product(connection, request_payload)
    response = jsonify({
        'product_id': product_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deleteProduct', methods=['POST'])
def delete_product():
    return_id = products_dao.delete_product(connection, request.form['product_id'])
    response = jsonify({
        'product_id': return_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/getOrders', methods=['GET'])
def get_orders():
    response = orders_dao.get_all_orders(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/getOrderDetails', methods=['GET'])
def get_order_details():
#print("order")
    #print(request.form['order_id'])
    response = orders_dao.get_order_details(connection, request.args.get('order_id'))
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deleteOrder', methods=['POST'])
def delete_order():
    return_id = orders_dao.delete_order(connection, request.form['order_id'])
    response = jsonify({
        'order_id': return_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertOrder', methods=['POST'])
def insert_new_order():
    print(request.form['data'])
    request_payload = json.loads(request.form['data'])
    order_id = orders_dao.insert_new_order(connection, request_payload)
    response = jsonify({
        'order_id': order_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Grocery Store Management System")
    app.run(port=5000)