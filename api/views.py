import json
import time
import uuid
import hashlib
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import NoteSerializer, TodoSerializer
from .models import Note, NoteUser, LoginTmp, Todo


@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/login/',
            'method': 'POST',
            'body': None,
            'description': '登录'
        },
        {
            'Endpoint': '/register/',
            'method': 'POST',
            'body': None,
            'description': '注册'
        },
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': '返回所有笔记'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': '查询单个笔记'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': '创建笔记'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': '修改笔记'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': '删除笔记'
        },
        {
            'Endpoint': '/todos/',
            'method': 'GET',
            'body': None,
            'description': '返回所有待办'
        },
        {
            'Endpoint': '/todos/id',
            'method': 'GET',
            'body': None,
            'description': '查询单个待办'
        },
        {
            'Endpoint': '/todos/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': '创建待办'
        },
        {
            'Endpoint': '/todos/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': '修改待办'
        },
        {
            'Endpoint': '/todos/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': '删除待办'
        },
    ]
    return Response(routes)


"""
登录注册
"""


@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        json_data = json.loads(request.body.decode('utf-8'))
        # 处理JSON数据
        # try:
        print(json_data)
        print(NoteUser.objects.get(username=json_data['username']))
        user = NoteUser.objects.get(username=json_data['username'])
        if user.password == calculate_md5(json_data['password']):
            LoginTmp.objects.create(
                username=json_data['username'],
                created=time.time()
            )
            return Response({
                "code": 200,
                "message": '登录成功',
                "data": {
                    "id": user.id
                }
            })
        # except:
        #     return Response({
        #         "code": 400,
        #         "message": '用户名或密码错误'
        #     })
    return Response({
        "code": 500,
        "message": '登录失败'
    })


@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        json_data = json.loads(request.body.decode('utf-8'))
        # 处理JSON数据
        try:
            user = NoteUser.objects.get(username=json_data['username'])
            if user:
                return Response({
                    "code": 400,
                    "message": '用户已经注册'
                })
        except:
            # 添加用户
            NoteUser.objects.create(
                id=str(uuid.uuid4()).replace("-", ""),
                username=json_data['username'],
                password=calculate_md5(json_data['password'])
            )
            print(json_data)
    return Response({
        "code": 200,
        "message": '注册成功'
    })


"""
笔记
"""


@api_view(['GET'])
def getNotes(request):
    user_id = request.GET.get('user_id')
    notes = Note.objects.filter(userId=user_id).order_by('-created')
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getNote(request, pk):
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateNote(request, pk):
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteNote(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response('Note was deleted!')


@api_view(['POST'])
def createNote(request):
    data = request.data
    note = Note.objects.create(
        body=data['body'],
        userId=data['userId']
    )
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)


"""
代办
"""


@api_view(['GET'])
def getTodos(request):
    user_id = request.GET.get('user_id')
    notes = Todo.objects.filter(userId=user_id).order_by('-created')
    serializer = TodoSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getTodo(request, pk):
    note = Todo.objects.get(id=pk)
    serializer = TodoSerializer(note, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateTodo(request, pk):
    note = Todo.objects.get(id=pk)
    serializer = TodoSerializer(instance=note, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteTodo(request, pk):
    note = Todo.objects.get(id=pk)
    note.delete()
    return Response('Note was deleted!')


@api_view(['POST'])
def createTodo(request):
    data = request.data
    note = Todo.objects.create(
        body=data['body'],
        userId=data['userId']
    )
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)


def calculate_md5(input_string):
    # 创建一个 MD5 哈希对象
    md5_hash = hashlib.md5()

    # 更新哈希对象的内容
    md5_hash.update(input_string.encode('utf-8'))

    # 获取十六进制表示的哈希值
    md5_hex = md5_hash.hexdigest()

    return md5_hex
