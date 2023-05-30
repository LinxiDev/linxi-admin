import sqlite3

conn = sqlite3.connect('数据库.db', check_same_thread=False)
c = conn.cursor()
c.execute("CREATE TABLE IF NOT EXISTS 用户 (UID INTEGER PRIMARY KEY AUTOINCREMENT,昵称 VARCHAR(20),用户名 VARCHAR(20),密码 VARCHAR(20),头像 TEXT)")
c.execute("CREATE TABLE IF NOT EXISTS 菜单 (MID INTEGER PRIMARY KEY AUTOINCREMENT,菜单名称 VARCHAR(20),路径 VARCHAR(20),状态 INT,图标 VARCHAR(20), 二级菜单 INTEGER)")


def select_db(sql):
    c.execute(sql)
    data = c.fetchall()
    return data


def sqlite_db(sql):
    c.execute(sql)
    conn.commit()


def Error():
    data = {'msg': '请求异常,请联系管理员!', 'code': 500}
    return data
