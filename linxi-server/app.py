import json

from flask import Flask, request, render_template
from api.user import *
from api.menu import *
from flask_cors import CORS
import requests
from flask import make_response
# 解析请求头的user_agent
from user_agents import parse

app = Flask(__name__)
CORS(app, supports_credentials=True)  # 注册CORS, "/*" 允许访问所有api


@app.route('/', methods=["GET", "POST"])
def hello():
    return render_template('index.html')


@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html'), 404


# 获取用户列表
@app.route('/admin/getinfo', methods=["POST"])
def getinfo():
    token = request.headers.get("token")
    # print(token)
    data = admin_getinfo(token)
    return data


# 用户登陆接口
@app.route('/admin/login', methods=["POST"])
def login():
    # 获取用户名和密码
    username = request.get_json()['username']
    password = request.get_json()['password']
    token = request.headers.get("token")
    if token:
        return verify_token(token)
    else:
        data = admin_login(username, password)
        # 状态码 data.json['code']
        return data


# 用户退出登陆接口
@app.route('/admin/logout', methods=["POST"])
def logout():
    token = request.headers.get("token")
    return admin_logout(token)


# 用户注册接口
@app.route('/register', methods=["POST"])
def register():
    # 获取用户名和密码
    username = request.form.get('username')
    password = request.form.get('password')
    data = admin_register(username, password)
    return data


# 修改用户接口
@app.route('/update', methods=["POST"])
def update():
    # {"username": "linxi","password":"linxi123","uid":"管理员","sex": 1}
    data_json = request.get_json()
    data = admin_update(data_json['username'], data_json['password'], data_json['uid'], data_json['sex'])
    return data


# 添加用户接口
@app.route('/adduser', methods=["POST"])
def adduser():
    # {"username": "linxi","password":"linxi123","uid":"管理员","sex": 1}
    data_json = request.get_json()
    data = admin_adduser(data_json['username'], data_json['password'], data_json['uid'], data_json['sex'])
    return data


# 验证token接口
@app.route('/verify', methods=['POST'])
def verify():
    # 获取token
    token = request.form.get('token')
    # 验证token
    return verify_token(token)


# 卡片列表
@app.route('/getcardlist', methods=['GET'])
def cardlists():
    return {'code': 200, 'data': [
        {'avatar': 'http://linxi.tk/img/avatar.jpg', 'id': 1, 'title': '海上权论原从清。', 'user_name': '廖刚',
         'email': 'k.bgpnbsdd@pvamliuos.mr', 'number': '$2091.00', 'date': '1976-05-27', 'pay_state': '1001',
         'content': '你好'},
        {'avatar': 'http://linxi.tk/img/avatar.jpg', 'id': 2, 'title': '流今报并什查里。', 'user_name': '方敏',
         'email': 'm.divmmo@bnltdlkfqq.la', 'number': '$2939.00', 'date': '1992-06-27', 'pay_state': '1002',
         'content': '你好'},
        {'avatar': 'http://linxi.tk/img/avatar.jpg', 'id': 3, 'title': '海上权论原从清。', 'user_name': '廖刚',
         'email': 'k.bgpnbsdd@pvamliuos.mr', 'number': '$2091.00', 'date': '1976-05-27', 'pay_state': '1001',
         'content': '你好'},
        {'avatar': 'http://linxi.tk/img/avatar.jpg', 'id': 4, 'title': '流今报并什查里。', 'user_name': '方敏',
         'email': 'm.divmmo@bnltdlkfqq.la', 'number': '$2939.00', 'date': '1992-06-27', 'pay_state': '1002',
         'content': '你好'},
        {'avatar': 'http://linxi.tk/img/avatar.jpg', 'id': 5, 'title': '海上权论原从清。', 'user_name': '廖刚',
         'email': 'k.bgpnbsdd@pvamliuos.mr', 'number': '$2091.00', 'date': '1976-05-27', 'pay_state': '1001',
         'content': '你好'},
        {'avatar': 'http://linxi.tk/img/avatar.jpg', 'id': 6, 'title': '流今报并什查里。', 'user_name': '方敏',
         'email': 'm.divmmo@bnltdlkfqq.la', 'number': '$2939.00', 'date': '1992-06-27', 'pay_state': '1002',
         'content': '你好'},
        {'avatar': 'http://linxi.tk/img/avatar.jpg', 'id': 7, 'title': '海上权论原从清。', 'user_name': '廖刚',
         'email': 'k.bgpnbsdd@pvamliuos.mr', 'number': '$2091.00', 'date': '1976-05-27', 'pay_state': '1003',
         'content': '你好'},
        {'avatar': 'http://linxi.tk/img/avatar.jpg', 'id': 8, 'title': '流今报并什查里。', 'user_name': '方敏',
         'email': 'm.divmmo@bnltdlkfqq.la', 'number': '$2939.00', 'date': '1992-06-27', 'pay_state': '1002',
         'content': '你好'}]}


# 卡片数据
@app.route('/addcardList', methods=['POST'])
def addcardList():
    print(request.get_data())
    return request.get_data()


# 卡片数据
@app.route('/upcardList/<id>', methods=['POST'])
def upcardList(id):
    print(id, request.get_data())
    return request.get_data()


# 卡片数据
@app.route('/delcardlist/<id>', methods=['POST'])
def delcardlist(id):
    print(id + '删除')
    return (id + '删除')


# 表格数据
@app.route('/getUserList/<page>', methods=['GET'])
def getUserList(page):
    if (page == '1') | (page == None):
        data = {'code': 200, 'total': 12, 'data': [
            {'id': '150000198207190198', 'title': '1', 'username': '于桂英', 'email': 'x.yrcw@yhl.nc',
             'date': '1970-08-04', 'address': '广西壮族自治区 钦州市'},
            {'id': '540000198008253195', 'title': '1', 'username': '邹勇', 'email': 'o.tjgnrm@tod.tf',
             'date': '1971-05-30', 'address': '广西壮族自治区 河池市'},
            {'id': '140000200507073223', 'title': '1', 'username': '武刚', 'email': 'k.kftwtx@irftc.yu',
             'date': '2016-03-14', 'address': '重庆 重庆市'},
            {'id': '430000201509036614', 'title': '1', 'username': '贺洋', 'email': 'i.szxjgw@rpofmvs.tk',
             'date': '1984-10-19', 'address': '安徽省 马鞍山市'},
            {'id': '810000200802076305', 'title': '1', 'username': '龚磊2', 'email': 'r.wxffty@rbfh.sj',
             'date': '1984-12-25', 'address': '安徽省 黄山市 钦州市'},
            {'id': '360000197402245144', 'title': '1', 'username': '汤敏', 'email': 'r.tghj@noheixps.ne',
             'date': '1975-02-02', 'address': '河南省 平顶山市'},
            {'id': '340000197411162179', 'title': '1', 'username': '万敏', 'email': 's.mvxnikc@lumrqbxbfg.org',
             'date': '1979-03-17', 'address': '江西省 宜春市'},
            {'id': '150000198809038564', 'title': '1', 'username': '江娜', 'email': 'q.fvqi@eytqfsoi.cf',
             'date': '1994-02-13', 'address': '四川省 广安市'},
            {'id': '150000198809038564', 'title': '1', 'username': '江娜', 'email': 'q.fvqi@eytqfsoi.cf',
             'date': '1994-02-13', 'address': '四川省 广安市'},
            {'id': '46000019890128674X', 'title': '1', 'username': '朱强', 'email': 'p.cduyu@qtbpi.pn',
             'date': '1993-04-19', 'address': '山东省 威海市'}]}
    else:
        data = {'code': 200, 'total': 12, 'data': [
            {'id': '810000200802076306', 'title': '1', 'username': '龚磊1', 'email': 'r.wxffty@rbfh.sj',
             'date': '1984-12-25', 'address': '安徽省 黄山市 钦州市'},
            {'id': '150000198809038564', 'title': '1', 'username': '江娜', 'email': 'q.fvqi@eytqfsoi.cf',
             'date': '1994-02-13', 'address': '四川省 广安市'},
            {'id': '150000197201096518', 'title': '1', 'username': '孟勇', 'email': 'e.zfuyqhyi@ygdx.af',
             'date': '2005-06-10', 'address': '海南省 三沙市'},
            {'id': '810000200802076304', 'title': '1', 'username': '龚磊3', 'email': 'r.wxffty@rbfh.sj',
             'date': '1984-12-25', 'address': '安徽省 黄山市 钦州市'}]}
    return data


# 更新用户数据
@app.route('/admin/updateuser/<id>', methods=['POST'])
def updateuser(id):
    print(id, request.get_json())
    return request.get_json()


# 表格数据
@app.route('/updateList/<id>', methods=['POST'])
def updateList(id):
    print(id, request.get_json())
    return request.get_json()


# 表格数据
@app.route('/deleteList/<id>', methods=['POST'])
def deleteList(id):
    print(id + '删除')
    return (id + '删除')


# 添加菜单
@app.route('/add_menu', methods=['GET', 'POST'])
def add_menu():
    if request.method == 'GET':
        return '返回添加页面'
    else:
        name = request.form.get('name')
        path = request.form.get('path')
        return add_menu_(name, path)


# 查看菜单
@app.route('/menu_list', methods=['GET'])
def menu_list():
    return menu_list_()


# 修改菜单
@app.route('/edit_menu/', methods=['GET', 'POST'])
def edit_menu(menu_id):
    return edit_menu_(menu_id, request.method)


# 删除菜单
@app.route('/delete_menu/')
def delete_menu(menu_id):
    return delete_menu_(menu_id)


@app.route('/ip', methods=['GET'])
def ipdata():
    ip = request.headers.get('X-Forwarded-For').split(',')[0]
    system = str(parse(request.headers.get('User-Agent')))
    return {'ip': ip, 'system': system}


# 签到列表
@app.route('/gettodolist', methods=['GET'])
def todolists():
    return {'code': 200, 'data': [
        {'img': 'http://linxi.tk/img/avatar.jpg', 'id': 1, 'title': '海上权论原从清。', 'user_name': '廖刚',
         'email': 'k.bgpnbsdd@pvamliuos.mr', 'number': '$2091.00', 'date': '1976-05-27', 'status': '0',
         'content': '你好'},
        {'img': 'http://linxi.tk/img/avatar.jpg', 'id': 2, 'title': '流今报并什查里。', 'user_name': '方敏',
         'email': 'm.divmmo@bnltdlkfqq.la', 'number': '$2939.00', 'date': '1992-06-27', 'status': '1', 'content': '你好'},
        {'img': 'http://linxi.tk/img/avatar.jpg', 'id': 3, 'title': '海上权论原从清。', 'user_name': '廖刚',
         'email': 'k.bgpnbsdd@pvamliuos.mr', 'number': '$2091.00', 'date': '1976-05-27', 'status': '2',
         'content': '你好'},
        {'img': 'http://linxi.tk/img/avatar.jpg', 'id': 4, 'title': '流今报并什查里。', 'user_name': '方敏',
         'email': 'm.divmmo@bnltdlkfqq.la', 'number': '$2939.00', 'date': '1992-06-27', 'status': '3',
         'content': '你好'}]}


# 签到数据
@app.route('/addtodoList', methods=['POST'])
def addtodoList():
    print(request.get_data())
    return request.get_data()


# 签到数据
@app.route('/uptodoList/<id>', methods=['POST'])
def uptodoList(id):
    print(id, request.get_data())
    return request.get_data()


# 签到数据
@app.route('/deltodolist/<id>', methods=['POST'])
def deltodolist(id):
    print(id + '删除')
    return (id + '删除')


if __name__ == '__main__':
    # debug=True 修改后自动刷新
    app.run(host='0.0.0.0', port=1234, debug=True)
