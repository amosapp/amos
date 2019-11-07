require (`dotenv-flow`).config()
const fs = require (`fs`)
const R = require (`ramda`)

/**
 * @description Outputs an array of env variables that begin with `CUSTOM`
 */
const customEnvs = R.filter (R.startsWith (`CUSTOM`)) (R.keys (process.env))
const envVars = R.pick (customEnvs) (process.env)
console.log (`envVars`, envVars)
fs.writeFileSync (`./public/env-config.js`, `window._env_ = ${JSON.stringify(envVars)}`)

