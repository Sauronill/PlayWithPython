import linecache
import os
import hashlib


app_path=input("请输入app所在的文件夹路径")
file_path=input(r"请输入要修改的py文件路径")


def get_filesize(filepath):#获取文件大小    
    fsize = os.path.getsize(filepath)
    fsize = fsize/float(1024)
    return round(fsize,2)

def get_checksum(app_path):#获取文件checksum    
    #读取文件
    f = open(app_path,'rb')
    thehash = hashlib.md5()
    #读取文件第一行
    theline = f.readline()    
    #逐行读取文件，并计算
    while(theline):
        thehash.update(theline)
        theline = f.readline()
    #哈希值
    return thehash.hexdigest()

def main(app_dict):#检索关键字并替换目标行
    target_number_1=0
    target_number_2=0
    with open(file_path, "r", encoding="utf-8") as f:
        lines = f.readlines()
    with open(file_path, "r+", encoding="utf-8") as f_w:
        for line_number,line in enumerate(lines):#行数，文件内容
            for key in app_dict:                 
                if key in line :#判断是否有关键字                    
                    target_number_1=line_number+1
                    target_number_2=line_number+2
                    key_name=key
                    filesize=app_dict['%s'%key_name][0]
                    checksum=app_dict['%s'%key_name][1]                    
            if target_number_1!=0 and line_number==target_number_1:#判断是否运行到目标位置,line_number最大值不超过总行数，应该不会超出边界                                 
                line = line.replace (line, "%s\n"%filesize)
            if target_number_2!=0 and line_number==target_number_2:                                 
                line = line.replace (line, "%s\n"%checksum)
            f_w.write(line)

def get_dict():#获取数据存入字典
    app_dict={}
    for filename in os.listdir(app_path):#遍历路径下的文件
        if os.path.isdir(app_path+'\\'+filename):#判断是否为目录
            pass
        else:
            filename_path=app_path+'\\'+filename#获取应用程序的路径
            h=get_checksum(filename_path)          #文件哈希值
            a=get_filesize(filename_path)  #文件大小
            b=filename                     #文件名
            key=str("%s" %b)#关键词
            filesize=str("                   \"filesize\":\"%s\","%a)
            checksum=str("                   \"checksum\":\"%s\","%h)
            value=[filesize,checksum]
            app_dict.update({key: value})
    return app_dict

a=get_dict()
main(a)
