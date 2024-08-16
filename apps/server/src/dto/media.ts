import Elysia, { t } from 'elysia'

export const mediaDTO = new Elysia().model({
  gifRequest: t.Object({
    q: t.String(),
  }),
  gifResponse: t.Object({
    results: t.Array(
      t.Object({
        id: t.String(),
        title: t.String(),
        media_formats: t.Object({
          tinygif: t.Object({
            url: t.String(),
            duration: t.Number(),
            preview: t.String(),
            dims: t.Array(t.Number()),
            size: t.Number(),
          }),
          gif: t.Object({
            url: t.String(),
            duration: t.Number(),
            preview: t.String(),
            dims: t.Array(t.Number()),
            size: t.Number(),
          }),
        }),
        created: t.Number(),
        content_description: t.String(),
        itemurl: t.String(),
        url: t.String(),
        tags: t.Array(t.String()),
        flags: t.Array(t.String()),
        hasaudio: t.Boolean(),
        content_description_source: t.String(),
      }),
    ),
    next: t.String(),
  }),
})
