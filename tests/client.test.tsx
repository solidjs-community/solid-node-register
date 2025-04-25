import * as test   from 'node:test'
import * as assert from 'node:assert/strict'
import * as s      from 'solid-js'
import * as sw     from 'solid-js/web'
import * as jsdom  from 'jsdom'

// Setup JSDOM environment
const dom = new jsdom.JSDOM('<!DOCTYPE html><div id="app"></div>')
global.window           = dom.window as any
global.document         = dom.window.document
global.DocumentFragment = dom.window.DocumentFragment

const app = document.getElementById('app')!

test.test('Solid Client-side Rendering', () => {
    
    const [count, setCount] = s.createSignal(0)

    let counter!: HTMLParagraphElement
    
    const dispose = sw.render(() => <>
        <div>
            <h1>Client Test</h1>
            <p ref={counter}>Count: {count()}</p>
        </div>
    </>, app)

    assert.equal(app.querySelector('h1')!.textContent, 'Client Test', 'Should render h1 with correct text')
    
    assert.equal(counter.textContent, 'Count: 0', 'Should render initial count value')
    
    setCount(1)
    
    assert.equal(counter.textContent, 'Count: 1', 'Count should increment after setting count to 1')

    dispose()
})
