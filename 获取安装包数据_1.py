import linecache
import os

app_path=input("请输入app所在的文件夹路径")
file_path=input(r"请输入要修改的py文件路径")

def fix_line(file_path,key,target,result):#在目标文件中检索关键词，并修改关键词下方目标
    target_number=0
    with open(file_path, "r", encoding="utf-8") as f:
        lines = f.readlines()
        with open(file_path, "r+", encoding="utf-8") as f_w:
            for line_number,line in enumerate(lines): 
                
                line_number+1
                if key in line :#检索并给出目标行数                
                    target_number=line_number+2                    
                if target_number!=0 and line_number==target_number:#根据目标行数修改                                 
                    line = line.replace(target, result)
                f_w.write(line)

def change_line(file_path,key,target,result):#在目标文件中检索关键词，并修改关键词下方目标
    target_number=0
    with open(file_path, "r", encoding="utf-8") as f:
        lines = f.readlines()
        with open(file_path, "r+", encoding="utf-8") as f_w:
            for line_number,line in enumerate(lines):                 
                line_number+1
                if key in line :#检索并给出目标行数                    
                    target_number=line_number+1                    
                if target_number!=0 and line_number==target_number:#根据目标行数修改                                 
                    line = line.replace(line, result)
                f_w.write(line)

def get_FileSize(filePath):#获取文件大小    
    fsize = os.path.getsize(filePath)
    fsize = fsize/float(1024)
    return round(fsize,2)

for filename in os.listdir(app_path):#遍历路径下的文件
    if os.path.isdir(app_path+'\\'+filename):#判断是否为目录
        pass
    else:
        filename_path=app_path+'\\'+filename#获取应用程序的路径
        h=hash(filename_path)          #文件哈希值
        a=get_FileSize(filename_path)  #文件大小
        b=filename                     #文件名
        key=str("\"link\" : "+"\"%s\"" %b)#检索关键词
        target=str(":\"\"")
        result_h=str(":\"%d\""%h)#哈希值
        result_a=str("                  \"filesize\":\"%skb\",\n"%a)
        fix_line(file_path,key,target,result_h)
        change_line(file_path,key,target,result_a)
        print("%s已修改完成"%b)










