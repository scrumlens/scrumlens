<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useFocus, useMagicKeys } from '@vueuse/core'
import { Paperclip } from 'lucide-vue-next'
import { vOnClickOutside } from '@vueuse/components'
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
const ignoreElRef = ref()

const gif = ref()

const isPending = ref(false)
const isOpenGifPopper = ref(false)

const { focused } = useFocus(textareaRef)
const { addNote, updateNote } = useBoard()

const { meta_enter, ctrl_enter, escape } = useMagicKeys()

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

const shortcutText = computed(() => {
  const keys = navigator.userAgent.includes('Mac') ? '⌘+Enter' : 'Ctrl+Enter'

  return props.edit ? `${keys} for update` : `${keys} for add note`
})

function onAddGif(url: string) {
  gif.value = url
  isOpenGifPopper.value = false
}

const onSubmit = handleSubmit(async (values) => {
  try {
    isPending.value = true

    if (!props.edit && props.index !== undefined) {
      await addNote({
        content: values.text.trim(),
        gif: gif.value,
        columnIndex: String(props.index),
      })
      resetForm()
      gif.value = ''
      nextTick(() => focused.value = true)
    }
    else {
      if (!props.noteId)
        return
      await updateNote(props.noteId, {
        content: values.text.trim(),
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

const onClickOutsideHandler = [
  () => emit('close'),
  { ignore: [ignoreElRef] },
]

watchEffect(() => {
  if (meta_enter.value || ctrl_enter.value) {
    onSubmit()
  }
})

watchEffect(() => {
  if (escape.value) {
    emit('close')
  }
})
</script>

<template>
  <!-- @vue-ignore -->
  <form
    v-on-click-outside="onClickOutsideHandler"
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
        <img
          v-if="gif"
          class="rounded-md"
          :src="gif"
        >
      </FormItem>
    </FormField>
    <FormItem>
      <div class="flex items-center justify-between">
        <UiText
          size="sm"
          class="text-muted-foreground"
        >
          {{ shortcutText }}
        </UiText>
        <div class="flex justify-end text-muted-foreground">
          <Popover v-model:open="isOpenGifPopper">
            <PopoverTrigger as-child>
              <div class="flex items-center">
                <Button
                  variant="ghost"
                  size="xs"
                  @click.prevent
                >
                  <Paperclip class="w-4 h-4" />
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent
              ref="ignoreElRef"
              class="w-[300px] p-2"
            >
              <BoardNoteGifSearch
                ref="ignoreElRef"
                @add="onAddGif"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
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
