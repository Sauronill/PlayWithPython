import pyodbc
cnxn = pyodbc.connect('DRIVER={SQL Server};SERVER=DESKTOP-6QK5JFU;DATABASE=app;UID=chenyue;PWD=xTour2021')
cursor = cnxn.cursor()
line = '======================================='
message = '''
=======================================
DB:
    press 1 to show listname
    press 2 to add 
    press 3 to edit 
    press 4 to delete 
    press 5 to search 
    press 6 to show menu
    press 0 to quit
=======================================
'''
print(message)

sql_column_name="""
Select Name FROM SysColumns Where id = Object_Id('[app]')
"""
cursor.execute(sql_column_name)
get_column_name=cursor.fetchall()


def search():    
    i=input("which column would you want to search")
    sql_search="""
    Select %s FROM app
    """%i
    cursor.execute(sql_search)
    row=cursor.fetchall()
    for a in row :
        print(a[0])
    print(line)
    b=input("input the key to get the complete information")       
    sql_search_1="""
    select * from app where %s like '%s'
    """%(i,b)
    cursor.execute(sql_search_1)
    row=cursor.fetchall()
    listname=get_column_name
    for line_number,i in enumerate(row[0]) :
        print(listname[line_number][0],':',i)
    
def add():
    row_main=get_column_name
    key=[]
    for i in (row_main):
        key.append(i[0])
    value=[]
    for i in key:
        a=input("plz input a value for %s"%i)
        value.append("%s"%a)
    print(value)

    key=','.join(key)
    value=','.join(value)

    sql_insert="""
        INSERT INTO app (%s) VALUES (%s)
    """%(key,value)
    cursor.execute(sql_insert)
    cnxn.commit()
    print("success")

def update():
    name=input("which list would you want to update[press the \'name\']")
    column_name=input("which column name would you want to update")
    information=input("which information would you want to update in %s"%column_name)
    sql_update="""
        UPDATE app SET %s='%s' WHERE name='%s'
    """%(column_name,information,name)
    cursor.execute(sql_update)
    cnxn.commit()
    print("%s has been updated"%information)
    
def delete():
    name=input("press the list name which you want to delete")
    sql_delete="""
        DELETE FROM app WHERE name='%s'
    """%name
    cursor.execute(sql_delete)
    cnxn.commit()
    print("%s has been deleted"%name)

while True:
    num = input('>>')
    if num == '1':
        row=get_column_name
        for i in row :
            print(i[0])
        print(line)
    elif num == '2':
        add()
        print(line)
    elif num == '3':
        update()
        print(line)
    elif num == '4':
        delete()
        print(line)
    elif num == '5':
        search()
        print(line)
    elif num == '6':
        print(message)
    elif num == '0':       
        cursor.close()
        cnxn.close()
        break
    else:
        print('input error, please retry')


