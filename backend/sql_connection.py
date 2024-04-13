#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Mar 16 23:44:02 2024

@author: natashaoberoi
"""

import mysql.connector

__cnx = None

def get_sql_connection():
    global __cnx
    
    if __cnx is None:
        cnx = mysql.connector.connect(user='testuser', password='password',
                                      host='127.0.0.1',
                                      database='grocery_store')
        
     
    return cnx