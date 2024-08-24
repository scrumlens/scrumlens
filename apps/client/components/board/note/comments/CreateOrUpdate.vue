<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { onClickOutside, useFocus, useMagicKeys } from '@vueuse/core'
import { useBoard } from '@/components/board/composables'
import { NOTE_KEY } from '@/components/board/note/types'

interface Props {
  commentId?: string
  edit?: boolean
  content?: string
  focusDelay?: number
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

interface Emits {
  (e: 'close'): void
}

const note = inject(NOTE_KEY)

const formRef = ref<HTMLFormElement>()
const textareaRef = ref()

const isPending = ref(false)

const formSchema = toTypedSchema(
  z.object({
    content: z.string(),
  }),
)

const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema: formSchema,
})

if (props.content && props.edit) {
  setValues({ content: props.content })
}

const { addComment, updateComment } = useBoard()
const { focused } = useFocus(textareaRef)
const { escape } = useMagicKeys()

const onSubmit = handleSubmit(async (values) => {
  if (!note?.data)
    return

  try {
    isPending.value = true

    if (!props.edit) {
      await addComment({
        content: values.content.trim(),
        noteId: note.data.value._id,
      })
      resetForm()
      nextTick(() => focused.value = true)
    }
    else {
      await updateComment(props.commentId!, {
        content: values.content.trim(),
      })
      emit('close')
    }
  }
  catch (err) {
    console.error(err)
  }
  finally {
    isPending.value = false
  }
})

// Компонент может быть создан при открытии из popper (dropdown menu).
// Поскольку radix использует focus guard c установкой aria-hidden="true",
// который снимается после окончания анимации, то в этом случае необходимо
// задать фокус на элементе через задержку, чтобы избежать ошибки в браузере.
// TODO найти решение не такое костыльное
if (props.edit) {
  setTimeout(() => focused.value = true, props.focusDelay)
}

onClickOutside(formRef, () => emit('close'))

watchEffect(() => {
  if (escape.value) {
    emit('close')
  }
})
</script>

<template>
  <form
    ref="formRef"
    class="space-y-4 text-foreground"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      name="content"
      :validate-on-model-update="false"
      :validate-on-blur="false"
    >
      <FormItem>
        <FormControl>
          <Textarea
            ref="textareaRef"
            type="textarea"
            class="h-20"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormItem>
      <div class="flex ite gap-2">
        <Button
          type="submit"
          size="sm"
          class="w-full "
          :disabled="isPending"
        >
          {{ edit ? 'Update' : 'Add Comment' }}
        </Button>
        <Button
          v-if="edit"
          type="submit"
          size="sm"
          variant="outline"
          class="w-full"
          @click="emit('close')"
        >
          Cancel
        </Button>
      </div>
    </FormItem>
  </form>
</template>
