import * as fs from 'node:fs'
import * as url from 'node:url'
import * as module from 'node:module'
// @ts-expect-error
import * as babel from '@babel/core'

const solidOptions = {
    moduleName: '@lightningtv/solid',
    generate: 'universal',
    builtIns: [],
}

module.registerHooks({
    resolve(specifier, ctx, next) {
        return next(specifier, ctx)
    },
    load(filename, ctx, next) {

        if (filename.endsWith('.jsx') || filename.endsWith('.tsx')) {
            try {
                let filepath = url.fileURLToPath(filename)
                let source = fs.readFileSync(filepath, 'utf8');
                let result = babel.transform(source, {
                    presets: [
                        ['babel-preset-solid', solidOptions],
                        ['@babel/preset-typescript', {}]
                    ],
                    filename: filepath,
                    sourceMaps: 'inline',
                });
                if (result?.code == null) {
                    throw new Error('No result was provided from Babel')
                }
                return {
                    format: 'module',
                    source: result.code,
                    shortCircuit: true,
                }
            } catch (error) {
                console.error('Error transforming JSX/TSX file:', error)
            }
        }

        return next(filename, ctx)
    }
})

