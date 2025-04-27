import * as fs     from 'node:fs'
import * as url    from 'node:url'
import * as path   from 'node:path'
import * as module from 'node:module'
import * as babel  from '@babel/core'

// @ts-expect-error
import solid from 'babel-preset-solid'
// @ts-expect-error
import ts    from '@babel/preset-typescript'

function is_jsx_file(fileurl: string): boolean {
    let ext = path.extname(fileurl)
    return ext === '.jsx' || ext === '.tsx'
}

let solid_options_env = JSON.parse(process.env['SOLID'] ?? '{}')

export const initialize: module.InitializeHook = (data) => {
    if (data != null) {
        solid_options_env = data
    }
}

export const resolve: module.ResolveHook = async (specifier, ctx, next) => {

    // Set solid generate option based on import conditions
    
    let result = await next(specifier, ctx)
    let url = new URL(result.url)
    
    if (url.protocol === 'file:' &&
        is_jsx_file(url.pathname) &&
        !ctx.conditions.includes('browser') &&
        (result.importAttributes == null || result.importAttributes['solid'] == null)
    ) {
        return {
            ...result,
            importAttributes: {
                ...result.importAttributes,
                solid: '{"generate": "ssr"}',
            }
        }
    }

    return result
}

export const load: module.LoadHook = (fileurl, ctx, next) => {

    if (is_jsx_file(fileurl)) {

        let solid_options = solid_options_env
        if (ctx.importAttributes['solid'] != null) {
            solid_options = {
                ...solid_options,
                ...JSON.parse(ctx.importAttributes['solid']),
            }
        }

        let filepath = url.fileURLToPath(fileurl)
        let source = fs.readFileSync(filepath, 'utf8')
        let result = babel.transform(source, {
            presets: [
                [solid, solid_options],
                [ts, {}],
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

    return next(fileurl, ctx)
}
