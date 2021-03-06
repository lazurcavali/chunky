import config from 'chunky.json'
import * as appChunks from 'chunks/index.web'
import strings from 'assets/strings.json'
import web from 'web/index.json'

config.chunks = appChunks
config.id = config.id || 'chunky'
config.strings = strings
config.platform = 'web'
config.web = web

export default config
