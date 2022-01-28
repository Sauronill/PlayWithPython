from urllib import response
from flask import Flask,request
from flask import jsonify
from flask_cors import CORS
from sqlalchemy import null

app = Flask(__name__)
cors = CORS(app, resources={r"/getMsg": {"origins": "*"}})
cors = CORS(app, resources={r"/test": {"origins": "*"}})

@app.route('/')
def hello_world():
    return 'Banner数据已就绪'


@app.route('/test', methods=['GET', 'POST'])
def form_data():
    history = {
    "history": [{
            "id": 1,
            "brand": "后端1",
            "kind": "后端1",
            "model": "后端1",
            "state": "已发布"
        },
        {
            "id": 2,
            "brand": "后端1",
            "kind": "后端1",
            "model": "后端1",
            "state": "已发布"
        },
        {
            "id": 3,
            "brand": "后端1",
            "kind": "后端1",
            "model": "后端1",
            "state": "未发布"
        }
    ]

}
    listdata = {
    "list": [{
            "id": 1,
            "brand": "后端",
            "kind": "后端",
            "model": "后端",
            "state": "已发布"
        },
        {
            "id": 2,
            "brand": "后端",
            "kind": "后端",
            "model": "后端",
            "state": "已发布"
        },
        {
            "id": 3,
            "brand": "后端",
            "kind": "后端",
            "model": "后端",
            "state": "未发布"
        }
    ]
}
    requesrtArg=request.values
    id=requesrtArg.get("ID")
    if id=="12345":
        return jsonify(listdata)
    else:
        return jsonify(history)




@app.route('/getMsg', methods=['GET', 'POST'])
def home():
    response = {
    "list": [{
            "id": 1,
            "brand": "flask1",
            "kind": "flask1",
            "model": "flask1",
            "state": "flask1"
        },
        {
            "id": 2,
            "brand": "flask2",
            "kind": "flask2",
            "model": "flask2",
            "state": "flask2"
        },
        {
            "id": 3,
            "brand": "后端",
            "kind": "后端",
            "model": "后端",
            "state": "未发布"
        }
    ],
    "history": [
        {
            "id": 1,
            "user": "user1 xxx",
            "time": "2021-12-28 10:30:00",
            "operation": "release",
            "desc": "第一次发布"
        },
        {
            "id": 2,
            "user": "user2 yyy",
            "time": "2021-12-29 17:10:30",
            "operation": "cancel release",
            "desc": "修正图片问题，暂时下架"
        },
        {
            "id": 3,
            "user": "user2 yyy",
            "time": "2021-12-30 09:00:00",
            "operation": "release",
            "desc": "问题已修正，第二版发布"
        }
    ],
    "pageTotal": 3
}
    return jsonify(response)

# 启动运行
if __name__ == '__main__':
    app.run()   # 这样子会直接运行在本地服务器，也即是 localhost:5000
   # app.run(host='your_ip_address') # 这里可通过 host 指定在公网IP上运行