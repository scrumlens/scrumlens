/* eslint-disable no-console */
/* eslint-disable node/prefer-global/process */
import { styleText } from 'node:util'
import child_process from 'node:child_process'
import 'dotenv/config'

const url = `http://localhost:${process.env.API_PORT}/swagger/json`

async function generateApi() {
  try {
    console.log(styleText('blue', 'Generating API...'))
    child_process.execSync(
      `npx swagger-typescript-api -p ${url} -o ./apps/client/services/api/generated -n index.ts`,
    )
    console.log(styleText('green', 'API is successfully generated'))
  }
  catch (err) {
    console.log(styleText('red', 'Error generating API'))
    console.log(err)
  }
}

generateApi()
