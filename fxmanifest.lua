fx_version 'cerulean'
games { 'gta5' }
lua54 'yes'

author 'Juser'
description 'Timbas Spawn Management'
version '1.0.0'

ui_page 'web/build/index.html'
client_scripts {
    'client/**/*',
    'config.lua'
}
server_script 'server/**/*'

files {
    'web/build/index.html',
    'web/build/**/*',
}


resource_type 'gametype' { name = 'roleplay' }