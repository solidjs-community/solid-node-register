import * as jsdom from 'jsdom'

// Setup JSDOM environment
const dom = new jsdom.JSDOM('<!DOCTYPE html><div id="app"></div>')
global.window           = dom.window as any
global.document         = dom.window.document
global.DocumentFragment = dom.window.DocumentFragment
