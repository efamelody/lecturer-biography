import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9wmtzmvr',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
  deployment: {
    appId: 'je7ygys45x0jn9dfrlc32czj',
  },
})
