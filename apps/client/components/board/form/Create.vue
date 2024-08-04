<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import type { BoardTemplate } from '~/types'
import { useBoard } from '@/components/board/composables'

interface Emits {
  (e: 'close'): void
}

const emit = defineEmits<Emits>()

const isPending = ref(false)

const { addBoard, getBoards } = useBoard()

const formSchema = toTypedSchema(
  z.object({
    title: z.string(),
    template: z.string(),
    private: z.boolean().optional(),
  }),
)

const { handleSubmit, setValues } = useForm({
  validationSchema: formSchema,
})

setValues({
  private: true,
})

const templateOptions: { label: string, value: BoardTemplate }[] = [
  {
    label: 'Stop Start Continue',
    value: 'start-stop-continue',
  },
  {
    label: 'Glad Sad Mad',
    value: 'glad-sad-mad',
  },
  {
    label: 'Wind Anchors Actions',
    value: 'wind-anchors-actions',
  },
  {
    label: '3 Wants',
    value: '3ws',
  },
]

const onSubmit = handleSubmit(async (values) => {
  isPending.value = true
  await addBoard({
    title: values.title,
    template: values.template as BoardTemplate,
    accessPolicy: values.private ? 'private' : 'public',
  })

  await getBoards()
  isPending.value = false
  emit('close')
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
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      name="template"
    >
      <FormItem>
        <FormLabel>Template</FormLabel>
        <Select v-bind="componentField">
          <SelectTrigger>
            <SelectValue placeholder="Select a template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="i in templateOptions"
              :key="i.value"
              :value="i.value"
            >
              {{ i.label }}
            </SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ value, handleChange }"
      name="private"
    >
      <FormItem class="flex items-center gap-3 space-y-0">
        <FormControl>
          <Switch
            id="private"
            :checked="value"
            @update:checked="handleChange"
          />
          <Label for="private">Private</Label>
        </FormControl>
      </FormItem>
      <FormDescription>
        {{ value ? 'Only invited users can access the board via link' : 'Anyone with the link can access the board, including guests' }}
      </FormDescription>
    </FormField>
    <div class="flex gap-2 !mt-5">
      <Button
        type="submit"
        size="sm"
        class="w-full"
        :disabled="isPending"
      >
        Create
      </Button>
    </div>
  </form>
</template>
