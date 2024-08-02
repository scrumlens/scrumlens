<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import Draggable from 'vuedraggable'
import { useBoard } from '@/components/board/composables'
import type { BoardResponse } from '~/services/api/generated'
import { Colors } from '~/types'

interface Emits {
  (e: 'close'): void
}

const emit = defineEmits<Emits>()

const { editBoardRaw, updateBoard, editId, getBoards } = useBoard()

const boardLocal = ref(JSON.parse(JSON.stringify(editBoardRaw.value)) as BoardResponse)

const isPending = ref(false)

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(3),
    private: z.boolean().optional(),
    isLocked: z.boolean().optional(),
  }),
)

const { handleSubmit, setValues } = useForm({
  validationSchema: formSchema,
})

setValues({
  title: editBoardRaw.value?.title,
  private: editBoardRaw.value?.accessPolicy === 'private',
  isLocked: editBoardRaw.value?.isLocked,
})

const onSubmit = handleSubmit(async (values) => {
  isPending.value = true
  await updateBoard(editId.value, {
    ...values,
    title: values.title.trim(),
    columns: boardLocal.value.columns,
  })
  isPending.value = false

  await getBoards()
  emit('close')
})

const colorOptions = [
  {
    label: 'Red',
    value: Colors.Red,
  },
  {
    label: 'Orange',
    value: Colors.Orange,
  },
  {
    label: 'Yellow',
    value: Colors.Yellow,
  },
  {
    label: 'Green',
    value: Colors.Green,
  },
  {
    label: 'Blue',
    value: Colors.Blue,
  },
  {
    label: 'Purple',
    value: Colors.Purple,
  },
]
</script>

<template>
  <div data-board-edit>
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
        v-slot="{ value, handleChange }"
        name="private"
      >
        <FormItem>
          <FormControl>
            <div class="flex items-center gap-3 space-y-0">
              <Switch
                id="private"
                :checked="value"
                @update:checked="handleChange"
              />
              <Label for="private">Private</Label>
            </div>
          </FormControl>
          <FormDescription>
            {{ value ? 'Only invited users can access the board via link' : 'Anyone with the link can access the board, including guests' }}
          </FormDescription>
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ value, handleChange }"
        name="isLocked"
      >
        <FormItem>
          <FormControl>
            <div class="flex items-center gap-3 space-y-0">
              <Switch
                id="locked"
                :checked="value"
                @update:checked="handleChange"
              />
              <Label for="locked">Locked</Label>
            </div>
          </FormControl>

          <FormDescription class="!mb-4">
            {{ value ? 'Retrospective is complete, participants can\'t add notes, etc.' : 'Participants can add notes, etc.' }}
          </FormDescription>
        </FormItem>
      </FormField>
      <Draggable
        :list="boardLocal.columns"
        item-key="_id"
        class="flex gap-2"
        handle=".handle"
      >
        <template #item="{ element }">
          <div class="border rounded p-2 text-sm space-y-2 _flex items-center gap-1 w-full bg-primary-foreground">
            <div class="flex items-center gap-1">
              <Icon
                name="lucide:align-justify"
                class="rotate-90 handle hover:cursor-grab"
              />
              <Input
                v-model="element.title"
              />
            </div>
            <Input
              v-model="element.description"
            />
            <Select v-model:model-value="element.color">
              <SelectTrigger>
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="i in colorOptions"
                  :key="i.value"
                  :value="i.value"
                >
                  {{ i.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </template>
      </Draggable>
      <Button
        type="submit"
        :disabled="isPending"
      >
        Update Board
      </Button>
    </form>
  </div>
</template>
