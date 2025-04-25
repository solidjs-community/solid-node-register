import * as fs     from 'node:fs'
import * as url    from 'node:url'
import * as module from 'node:module'
import * as babel  from '@babel/core'

// @ts-expect-error
import solid from 'babel-preset-solid'
// @ts-expect-error
import ts    from '@babel/preset-typescript'

let solid_options = JSON.parse(process.env['SOLID'] ?? '{}')

export const initialize: module.InitializeHook = (data) => {
    if (data != null) {
        solid_options = data
    }
}

export const resolve: module.ResolveHook = (specifier, context, next) => {
    return next(specifier, context)
}

export const load: module.LoadHook = (fileurl, context, next) => {

    if (fileurl.endsWith('.jsx') || fileurl.endsWith('.tsx')) {
        let filepath = url.fileURLToPath(fileurl)
        let source = fs.readFileSync(filepath, 'utf8')
        let result = babel.transform(source, {
            presets: [
                [solid, solid_options],
                [ts, {}]
            ],
            filename: filepath,
            sourceMaps: 'inline',
        })
        if (result?.code == null) {
            throw new Error('No result was provided from Babel')
        }
        return {
            format: 'module',
            source: result.code,
            shortCircuit: true,
        }
    }

    return next(fileurl, context)
}
