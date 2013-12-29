# coding: utf8
# try something like
def index(): return dict(message="hello from video_search.py")

import datetime
from time import mktime
import decimal 
import os

def searchVideos():
    import json
    import MySQLdb
    from datetime import datetime
    
    credentials = open(os.path.join(request.folder, 'private', 'mysql_credentials.json'))    
    credentials = json.load(credentials)
    db = MySQLdb.connect(
        host=credentials['host'],
        user= credentials['user'],
        passwd= credentials['password'],
        db=credentials['db']
    )
                      
    cur = db.cursor()     

    data = request.vars

    rawDateMin = datetime.strptime(data.rawDateMin, '%m/%d/%Y')
    rawDateMin = rawDateMin.strftime('%Y-%m-%d')

    rawDateMax = datetime.strptime(data.rawDateMax, '%m/%d/%Y')
    rawDateMax = rawDateMax.strftime('%Y-%m-%d')

    #cur.execute("SELECT * FROM memory WHERE artist = %s AND title = %s;" , (request.vars.artist, request.vars.title))
    cur.execute("SELECT * FROM memory WHERE artist = %s AND title = %s AND memoryDateShare >= %s AND memoryDateShare <= %s;" , (data.artist, data.title, rawDateMin, rawDateMax))

    rows = cur.fetchall()

    fieldNames = [i[0] for i in cur.description]
    obj = []
    
    for i in range(len(rows)):
        row = rows[i]
        objRow = {}
        for j in range(len(row)):
            item = row[j]
            if isinstance(item, decimal.Decimal):
                add = float(item)
            else:
                add = str(item)
                
            objRow[fieldNames[j]] = add
             
        obj.append(objRow)
        
    return json.dumps(obj)
