import * as s from 'solid-js'

export const TestComponent = (props: { message: string }) => {
    const [count, setCount] = s.createSignal(0)

    return (
        <div>
            <h1>{props.message}</h1>
            <button onClick={() => setCount(count() + 1)}>
                Count: {count()}
            </button>
        </div>
    )
}
