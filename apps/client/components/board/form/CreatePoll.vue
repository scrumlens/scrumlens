<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import Draggable from 'vuedraggable'
import { AlignJustify, Trash2 } from 'lucide-vue-next'
import { api } from '~/services/api'
import { useBoard } from '@/components/board/composables'

interface Emits {
  (e: 'close'): void
}

const emit = defineEmits<Emits>()

const isPending = ref(false)

const { boardRaw } = useBoard()

// TODO разобраться как сделать динамические поля для валидации
const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(1),
  }),
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const options = ref([
  {
    title: 'Option 1',
    id: '1',
  },
  {
    title: 'Option 2',
    id: '2',
  },
])

function addOption() {
  const id = Math.random().toString(36).substring(2, 12)

  options.value.push({
    title: '',
    id,
  })

  nextTick(() => {
    document.getElementById(id)?.focus()
  })
}

function removeOption(index: number) {
  options.value.splice(index, 1)
}

const onSubmit = handleSubmit(async (values) => {
  try {
    isPending.value = true
    await api.polls.postPolls({
      boardId: boardRaw.value!._id,
      title: values.title,
      options: options.value.map(i => ({ title: i.title })),
    })
    emit('close')
  }
  catch (err) {
    console.error(err)
  }
  finally {
    isPending.value = false
  }

  isPending.value = false
})
</script>

<template>
  <form
    class="space-y-4 text-foreground"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      name="title"
      :validate-on-model-update="false"
      :validate-on-blur="false"
    >
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input
            type="text"
            v-bind="componentField"
            @keydown.enter.prevent.stop
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField name="options">
      <FormItem>
        <FormLabel>Options</FormLabel>
      </FormItem>
    </FormField>
    <Draggable
      :list="options"
      item-key="id"
      class="flex flex-col gap-2"
      handle=".handle"
    >
      <template #item="{ element, index }">
        <div class="flex items-center gap-1">
          <AlignJustify class="w-3.5 h-3.5 rotate-90 handle hover:cursor-grab" />
          <Input
            :id="element.id"
            v-model="element.title"
            placeholder="Option"
            @keydown.enter.prevent="addOption"
          />
          <Button
            size="xs"
            variant="ghost"
            tabindex="-1"
            @click.prevent="removeOption(index)"
          >
            <Trash2 class="w-3.5 h-3.5" />
          </Button>
        </div>
      </template>
    </Draggable>
    <div class="flex flex-col gap-2">
      <div class="flex justify-end">
        <Button
          variant="secondary"
          @click.prevent="addOption"
        >
          Add option
        </Button>
      </div>
      <div>
        <Button
          type="submit"
          :disabled="isPending"
        >
          Create
        </Button>
      </div>
    </div>
  </form>
</template>
