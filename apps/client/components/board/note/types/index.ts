import type { BoardResponse, NoteUpdate } from '~/services/api/generated'

export interface Emoji {
  name: NoteUpdate['reactions']
  value: string
}

export interface NoteInject {
  data: Ref<BoardResponse['notes'][0]>
}

export const NOTE_KEY: InjectionKey<NoteInject> = Symbol('note')
