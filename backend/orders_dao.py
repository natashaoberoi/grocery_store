#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Mar 16 23:30:12 2024

@author: natashaoberoi
"""

# products_dao code
from datetime import datetime
import mysql.connector
from sql_connection import get_sql_connection
import json



def get_all_orders(connection):
    
    cursor = connection.cursor()
    query = ('''SELECT order_id, customer_name, total, 
             CAST(date_created AS char) 
             FROM orders''')
    
    cursor.execute(query)
    
    response = []
    
    for (order_id, customer_name, total, date_created) in cursor:
        response.append({
            'order_id': order_id,
            'customer_name': customer_name,
            'total': total,
            'date_created': date_created
        })

    return response

def get_order_details(connection,id):
    
    cursor = connection.cursor()
    query = ('''SELECT od.order_id,p.name,od.quantity,uom.uom_name, od.total_price, p.price_per_unit 
             FROM order_details od,products p, uom 
             WHERE od.product_id=p.product_id AND p.uom_id=uom.uom_id AND od.order_id=%s''')
    
    data = (str(id),)
    cursor.execute(query,data)
    
    response = []
    
    for (order_id, name, quantity, uom_name, total_price, price_per_unit) in cursor:
        response.append({
            'order_id': order_id,
            'product_name': name,
            'quantity': quantity,
            'uom_name': uom_name,
            'total_price': total_price,
            'price_per_unit': price_per_unit
        })
    
    return response

def insert_new_order(connection,order):
    cursor = connection.cursor()

    order_query = ('''INSERT INTO orders (customer_name, total, date_created)
             VALUES (%s, %s, NOW())''')
    
    detail_query = ('''INSERT INTO order_details (order_id,product_id,quantity,total_price)
                    VALUES (%s,%s,%s, (SELECT price_per_unit*%s FROM products WHERE product_id = %s))''') 
    
    data1 = (order['customer_name'],"0")
    cursor.execute(order_query,data1)
    order_id = cursor.lastrowid
    
    for product in order['products']:
        data2 = (order_id,product['product_id'],product['quantity'],product['quantity'],product['product_id'])
        cursor.execute(detail_query,data2)

    update_query = """UPDATE orders 
    SET total = (SELECT sum(total_price) FROM order_details WHERE order_id=%s) 
    WHERE order_id=%s"""

    data3 = (order_id,order_id)
    cursor.execute(update_query,data3)

    connection.commit()
    return order_id

def delete_order(connection, id):
    cursor = connection.cursor()
    query1 = ("DELETE FROM order_details where order_id=" + str(id))
    query2 = ("DELETE FROM orders where order_id=" + str(id))
    cursor.execute(query1)
    cursor.execute(query2)
    connection.commit()

    return cursor.lastrowid

if __name__=='__main__':
    connection = get_sql_connection()
    mock_order = '''{
        "customer_name":"James",
        "products":[
            {
                "product_id":"3",
                "quantity":"3"
            },
            {
                "product_id":"1",
                "quantity":"2"
            }
        ]
    }'''

    print(insert_new_order(connection,json.loads(mock_order)))