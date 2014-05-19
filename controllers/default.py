# -*- coding: utf-8 -*-
# this file is released under public domain and you can use without limitations

#########################################################################
## This is a sample controller
## - index is the default action of any application
## - user is required for authentication and authorization
## - download is for downloading files uploaded in the db (does streaming)
## - call exposes all registered services (none by default)
#########################################################################
import pdb
import datetime

response.delimiters = ('<?','?>')
def index():
    """
    example action using the internationalization operator T and flash
    rendered by views/default/index.html or views/generic.html

    if you need a simple wiki simple replace the two lines below with:
    return auth.wiki()
    """
    # return auth.wiki()
    return dict(message=T('Hello World'))

@request.restful()
def api():
    response.view = 'generic.json'
    # def GET(tablename,id):
        # if not tablename=='person': raise HTTP(400)
        # return dict(person = db.person(id))
    def GET(tablename, title, artist):
        results = yj((yj[tablename].title == title) & (yj[tablename].artist == artist)).select()
        return dict(memories = results)        
    # def GET():
    #     return dict(
    #         memories = [
    #             dict(
    #                 id = 1,
    #                 title = 'web2py restful Ember.js',
    #                 isCompleted = True
    #             ),
    #             dict(
    #                 id = 2,
    #                 title = '2.',
    #                 isCompleted = False
    #             ),
    #             dict(
    #                 id = 3,
    #                 title = 'Profit!',
    #                 isCompleted = False
    #             )                
    #         ]
    #     )            
        
    def POST(tablename,**fields):
        # pdb.set_trace()
        # if not tablename=='person': raise HTTP(400)
        # return db.person.validate_and_insert(**fields)
        fields['time_added'] = datetime.datetime.now()
        return yj[tablename].validate_and_insert(**fields)

    return locals()


def user():
    """
    exposes:
    http://..../[app]/default/user/login
    http://..../[app]/default/user/logout
    http://..../[app]/default/user/register
    http://..../[app]/default/user/profile
    http://..../[app]/default/user/retrieve_password
    http://..../[app]/default/user/change_password
    http://..../[app]/default/user/manage_users (requires membership in 
    use @auth.requires_login()
        @auth.requires_membership('group name')
        @auth.requires_permission('read','table name',record_id)
    to decorate functions that need access control
    """
    return dict(form=auth())

@cache.action()
def download():
    """
    allows downloading of uploaded files
    http://..../[app]/default/download/[filename]
    """
    return response.download(request, db)


def call():
    """
    exposes services. for example:
    http://..../[app]/default/call/jsonrpc
    decorate with @services.jsonrpc the functions to expose
    supports xml, json, xmlrpc, jsonrpc, amfrpc, rss, csv
    """
    return service()


@auth.requires_signature()
def data():
    """
    http://..../[app]/default/data/tables
    http://..../[app]/default/data/create/[table]
    http://..../[app]/default/data/read/[table]/[id]
    http://..../[app]/default/data/update/[table]/[id]
    http://..../[app]/default/data/delete/[table]/[id]
    http://..../[app]/default/data/select/[table]
    http://..../[app]/default/data/search/[table]
    but URLs must be signed, i.e. linked with
      A('table',_href=URL('data/tables',user_signature=True))
    or with the signed load operator
      LOAD('default','data.load',args='tables',ajax=True,user_signature=True)
    """
    return dict(form=crud())
