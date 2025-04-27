import * as test   from 'node:test'
import * as assert from 'node:assert/strict'
import * as sw     from 'solid-js/web'

import {TestComponent} from './component.tsx'

test.test('Solid SSR', () => {

    let html = sw.renderToString(() => (
        <TestComponent message="Hello from SSR!" />
    ))

    assert.ok(html.includes('Hello from SSR!'), 'Should contain the message prop')
    assert.ok(html.includes('Count: 0'), 'Should contain the initial signal value')
    assert.ok(html.startsWith('<div>'), 'Should start with opening div tag')
    assert.ok(html.endsWith('</div>'), 'Should end with closing div tag')
})
