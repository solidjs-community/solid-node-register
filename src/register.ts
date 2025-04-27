import * as module from 'node:module'

module.register('./hooks.js', import.meta.url)
