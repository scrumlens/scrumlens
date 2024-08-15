<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { api, getErrorData } from '~/services/api'
import { useToast } from '@/components/ui/shadcn/toast/use-toast'

interface Props {
  boardId: string
}

interface Emits {
  (e: 'close'): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const { toast } = useToast()

const isPending = ref(false)

const formSchema = toTypedSchema(
  z.object({
    email: z.string().min(1, 'Required'),
  }),
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  try {
    isPending.value = true
    await api.boards.postBoardsByIdInvite(props.boardId, {
      email: values.email,
    })
    emit('close')
  }
  catch (err) {
    console.error(err)
    const { message } = await getErrorData(err)
    toast({
      title: 'Something went wrong',
      description: message,
      variant: 'destructive',
    })
  }
  finally {
    isPending.value = false
  }
})
</script>

<template>
  <form
    class="space-y-4 text-foreground"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      name="email"
      :validate-on-model-update="false"
      :validate-on-blur="false"
    >
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Textarea
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription>Type email address separated by comma</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button
      type="submit"
      size="sm"
      class="w-full"
      :disabled="isPending"
    >
      Send Invite
    </Button>
  </form>
</template>
