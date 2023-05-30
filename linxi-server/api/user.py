# 用户操作接口: 登陆、注册、修改、删除等
import datetime
import json
import os
import sqlite3
from api.db import *
import hashlib
from flask import jsonify
import jwt

# 定义一个秘钥
SECRET_KEY = 'linxi#%&@zx%$cv456bnm**123'


def admin_getinfo(token):
    try:
        info = verify_token(token).json
        if info['code'] == 200:
            userinfo = select_db(f"SELECT 昵称,头像,邮箱,签名,职业 FROM 用户 WHERE 用户名='{info['username']}' AND UID='{info['uid']}'")[0]
            result = select_db("SELECT * FROM 菜单")
            data = {'code': 200,'id':info['uid'], 'name': userinfo[0], 'avatar': userinfo[1], 'username': info['username'] , 'email': userinfo[2], 'text': userinfo[3], 'job': userinfo[4], 'menus': []}
            for i in result:
                if i[5] == 0:
                    data['menus'].append({'mid': i[0], 'name': i[1], 'path': i[2], 'status': i[3], 'icon': i[4], 'secMenus':[]})
                # 有二级菜单
                else:
                    for D in data['menus']:
                        if D['mid'] == i[5]:
                            D['secMenus'].append({'mid': i[0], 'name': i[1], 'path': i[2], 'status': i[3], 'icon': i[4]})
            return jsonify(data)
        else:
            return info,400
    except sqlite3.Error:
        return Error()


def admin_login(username, password):
    try:
        result = select_db(f"SELECT * FROM 用户 WHERE 用户名='{username}' AND 密码='{password}'")
        if result:
            # 用户id
            uid = result[0][0]
            # # 用户昵称
            # name = result[0][1]
            # # 用户头像
            # avatar = result[0][4]
            # 生成token
            payload = {
                'username': username,
                'uid': uid,
                # 两小时过期(hours,minutes...)
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)
            }
            token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
            return jsonify({'code': 200, 'msg': '登陆成功', 'token': token})
        else:
            return jsonify({'code': 400, 'msg': '用户名或密码错误'}), 400
    except sqlite3.Error:
        return Error()


def admin_logout(token):
    try:
        info = verify_token(token).json
        if info['code'] == 200:
            return jsonify({'code': 400, 'msg': '退出登陆成功'})
        else:
            return info
    except sqlite3.Error:
        return Error()


def admin_register(username, password):
    try:
        result_s = select_db(f"SELECT * FROM 用户 WHERE 用户名='{username}' AND 身份='普通用户'")
        if result_s:
            return jsonify({'code': 400, 'msg': '该用户已存在'}), 400
        else:
            sqlite_db(f"INSERT INTO 用户(用户名,密码) VALUES('{username}','{password}')")
            return jsonify({'code': 200, 'msg': '恭喜,注册成功!'})
    except sqlite3.Error:
        return Error()


def admin_update(username, password, uid, token_time):
    try:
        result_s = select_db(f"SELECT * FROM 用户 WHERE 用户名='{username}'")
        if result_s:
            sqlite_db(f"UPDATE 用户 SET 用户名='{username}',密码='{password}',身份='{uid}',登陆时间='{token_time}'")
            return {'用户名': username, '提示': '用户信息更新成功!', '操作码': 200}
        else:
            return {'用户名': username, '提示': '该用户名不存在!', '操作码': 400}
    except sqlite3.Error:
        return Error()


def admin_adduser(username, password, uid, token_time):
    try:
        result_s = select_db(f"SELECT * FROM 用户 WHERE 用户名='{username}'")
        if result_s:
            return {'用户名': username, '提示': '该用户名已存在!', '操作码': 400}
        else:
            sqlite_db(f"INSERT INTO 用户(用户名,密码,身份,登陆时间) VALUES('{username}','{password}','{uid}','{token_time}')")
            return {'用户名': username, '提示': '用户添加成功!', '操作码': 200}
    except sqlite3.Error:
        return Error()


# 验证token接口
def verify_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms='HS256')
        return jsonify({'code': 200, 'msg': '验证成功', 'uid': payload['uid'], 'username': payload['username']})
    except jwt.ExpiredSignatureError:
        return jsonify({'code': 400, 'msg': 'token已失效'})
    except jwt.DecodeError:
        return jsonify({'code': 400, 'msg': '非法token，请先登录！'})
