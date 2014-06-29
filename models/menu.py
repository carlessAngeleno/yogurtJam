# -*- coding: utf-8 -*-
# this file is released under public domain and you can use without limitations

#########################################################################
## Customize your APP title, subtitle and menus here
#########################################################################

response.logo = A(XML("&nbsp"), 'yogurtJam',
                  _class="brand",_href=URL('../..') + '/#/')
response.title = 'yogurtJam'
response.subtitle = ''

## read more at http://dev.w3.org/html5/markup/meta.name.html
response.meta.author = 'carlessAngeleno'
response.meta.description = 'songs, memories, places'
response.meta.keywords = ''
response.meta.generator = ''

## your http://google.com/analytics id
response.google_analytics_id = None

#########################################################################
## this is the main application menu add/remove items as required
#########################################################################

response.menu = [
    # (T('Home'), False, URL('default', 'index'), [])
]

DEVELOPMENT_MENU = False

#########################################################################
## provide shortcuts for development. remove in production
#########################################################################


# if "auth" in locals(): auth.wikimenu() 
