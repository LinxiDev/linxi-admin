import sqlite3
from flask import jsonify
from api.db import *


# 添加菜单
def add_menu_(name, path):
    try:
        if select_db(f"SELECT * FROM 菜单 WHERE 菜单名称='{name}' OR 路径='{path}'"):
            return jsonify({'code': 400, 'msg': '已存在该菜单项已被绑定'})
        else:
            sqlite_db(f"INSERT INTO 菜单 (菜单名称, 路径) VALUES ('{name}', '{path}')")
            return jsonify({'code': 200, 'msg': '菜单项添加成功'})
    except sqlite3.Error:
        return Error()


# 查看菜单
def menu_list_():
    menu_list = select_db('SELECT * FROM 菜单')
    return menu_list


# 修改菜单
def edit_menu_(menu_id, method):
    if method == 'GET':
        menu = select_db(f'SELECT * FROM 菜单 WHERE MID={menu_id}')
        return render_template('edit_menu.html', menu=menu)
    else:
        name = request.form.get('name')
        path = request.form.get('path')
        sqlite_db(f"UPDATE 菜单 SET 菜单名称='{name}', 路径='{path}' WHERE MID={menu_id}")
        return '修改成功'


# 删除菜单
def delete_menu_(menu_id):
    sqlite_db(f'DELETE FROM menu WHERE id={menu_id}')
    return '删除成功'
