import { type ConcurrentlyCommandInput, concurrently } from 'concurrently'

const commands: ConcurrentlyCommandInput[] = [
  {
    command: 'cd apps/server && bun dev',
    name: 'server',
  },
  {
    command: 'cd apps/client && bun dev',
    name: 'client',
  },
]

concurrently(commands, {
  raw: true,
})
