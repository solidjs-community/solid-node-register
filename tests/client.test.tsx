import * as test   from 'node:test'
import * as assert from 'node:assert/strict'
import * as sw     from 'solid-js/web'

import {TestComponent} from './component.tsx'

const app = document.getElementById('app')!

test.test('Solid Client-side Rendering', () => {
    
    const dispose = sw.render(() => <TestComponent message='Hello Client!'/>, app)

    assert.equal(app.querySelector('h1')!.textContent, 'Hello Client!', 'Should render h1 with correct text')
    
    const counter = app.querySelector('button')!;
    assert.equal(counter.textContent, 'Count: 0', 'Should render initial count value')
    
    counter.click();
    
    assert.equal(counter.textContent, 'Count: 1', 'Count should increment after button click')

    dispose()
})
