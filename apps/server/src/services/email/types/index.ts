export interface EmailTemplateOptions {
  email: string
  userId: string
  data: Record<string, string>
}

export interface InviteEmailOptions extends EmailTemplateOptions {
  boardId: string
}
