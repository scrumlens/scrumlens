import { t } from 'elysia'

export const noteItem = t.Object({
  _id: t.String(),
  content: t.String(),
  userId: t.String(),
  voteUp: t.Array(t.String()),
  voteDown: t.Array(t.String()),
  reactions: t.Array(
    t.Object({
      userId: t.String(),
      emoji: t.Enum({
        thinkingFace: 'thinking-face',
        loudlyCryingFace: 'loudly-crying-face',
        faceWithTearsOfJoy: 'face-with-tears-of-joy',
        fire: 'fire',
        partyPopper: 'party-popper',
        pileOfPoo: 'pile-of-poo',
      }),
    }),
  ),
  comments: t.Array(t.String()),
})
