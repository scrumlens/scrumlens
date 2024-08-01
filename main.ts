import { type ConcurrentlyCommandInput, concurrently } from 'concurrently'

const commands: ConcurrentlyCommandInput[] = [
  {
    command: 'cd apps/server && bun --bun run dev',
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
