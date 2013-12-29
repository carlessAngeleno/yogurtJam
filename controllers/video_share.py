# coding: utf8
# try something like
def index(): return dict(message="hello from video_share.py")

import datetime
from time import mktime
import decimal 
import os

def shareVideos():
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

    data = request.vars

    memoryDateShare = datetime.strptime(data.memoryDateShare, '%m/%d/%Y')
    memoryDateShare = memoryDateShare.strftime('%Y-%m-%d')
                      
    cur = db.cursor()     

    cur.execute("INSERT INTO memory (title, artist, time_added, video_id, lat, lng, g_place, story, tag1, memoryDateShare) VALUES (%s, %s, NOW(), %s, %s, %s, %s, %s, %s, %s);",
        (data.title.lower(), data.artist.lower(), data.video_id, data.lat, data.lng, data.g_place, data.story, data.tag1, memoryDateShare) 
    ) 

    db.commit()

    cur.execute("SELECT * FROM memory WHERE artist = %s AND title = %s;" , (data.artist, data.title))

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