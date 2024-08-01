<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { onClickOutside, useFocus } from '@vueuse/core'
import { useBoard } from '@/components/board/composables'

interface Props {
  noteId?: string
  index?: number
  edit?: boolean
  text?: string
  focusDelay?: number
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const textareaRef = ref()
const formRef = ref()

const isPending = ref(false)

const { focused } = useFocus(textareaRef)
const { addNote, updateNote } = useBoard()

const formSchema = toTypedSchema(
  z.object({
    text: z.string(),
  }),
)

interface Emits {
  (e: 'close'): void
}

const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema: formSchema,
})

if (props.text && props.edit) {
  setValues({ text: props.text })
}

const onSubmit = handleSubmit(async (values) => {
  try {
    isPending.value = true

    if (!props.edit && props.index) {
      await addNote(values.text, props.index)
      resetForm()
      nextTick(() => focused.value = true)
    }
    else {
      if (!props.noteId)
        return
      await updateNote(props.noteId, {
        content: values.text,
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
if (props.focusDelay) {
  setTimeout(() => focused.value = true, props.focusDelay)
}
else {
  nextTick(() => focused.value = true)
}

onClickOutside(formRef, () => emit('close'))
</script>

<template>
  <form
    ref="formRef"
    class="space-y-4 text-foreground sticky bottom-0"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      name="text"
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
      <div class="flex gap-2">
        <Button
          type="submit"
          size="sm"
          class="w-full"
          :disabled="isPending"
        >
          {{ edit ? 'Update' : 'Add Note' }}
        </Button>
        <Button
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
