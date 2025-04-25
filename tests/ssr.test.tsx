import * as test   from 'node:test'
import * as assert from 'node:assert/strict'
import * as s      from 'solid-js'
import * as sw     from 'solid-js/web'

test.test('Solid SSR', () => {
    
    const TestComponent = (props: { message: string }) => {
        const [count] = s.createSignal(0)

        return (
            <div>
                <h1>SSR Test</h1>
                <p>{props.message}</p>
                <button>
                    Count: {count()}
                </button>
            </div>
        )
    }

    let html = sw.renderToString(() => (
        <TestComponent message="Hello from SSR!" />
    ))

    assert.ok(html.includes('SSR Test'), 'Should contain the component title')
    assert.ok(html.includes('Hello from SSR!'), 'Should contain the message prop')
    assert.ok(html.includes('Count: 0'), 'Should contain the initial signal value')
    assert.ok(html.startsWith('<div>'), 'Should start with opening div tag')
    assert.ok(html.endsWith('</div>'), 'Should end with closing div tag')
})
