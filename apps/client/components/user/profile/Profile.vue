<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useToast } from '@/components/ui/shadcn/toast/use-toast'
import { api, getErrorData } from '~/services/api'

const { toast } = useToast()
const { userRaw, getUser } = useUser()

const isPending = ref(false)

const formSchema = toTypedSchema(
  z
    .object({
      name: z.string().min(1),
      email: z.string().email().optional(),
      password: z.string().min(5).optional(),
      passwordConfirm: z.string().optional(),
    })
    .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
      message: 'Passwords do not match',
      path: ['passwordConfirm'],
    }),
)

const { handleSubmit, setValues } = useForm({
  validationSchema: formSchema,
})

setValues({
  name: userRaw.value?.name,
})

const onSubmit = handleSubmit(async (values) => {
  try {
    isPending.value = true
    await api.users.patchUsersMe({
      name: values.name.trim(),
      password: values.password?.trim(),
      email: values.email?.trim(),
    })
    await getUser()
  }
  catch (err) {
    console.error(err)
    const { message } = await getErrorData(err)
    toast({
      title: 'Something went wrong.',
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
      name="name"
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
      v-if="userRaw?.isGuest"
      v-slot="{ componentField }"
      name="email"
    >
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input
            type="email"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
        <FormDescription>
          Make sure your email is correct. This field can only be edited once.
        </FormDescription>
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      name="password"
      :validate-on-model-update="false"
      :validate-on-blur="false"
    >
      <FormItem>
        <FormLabel>New Password</FormLabel>
        <FormControl>
          <Input
            type="password"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      name="passwordConfirm"
      :validate-on-model-update="false"
      :validate-on-blur="false"
    >
      <FormItem>
        <FormLabel>Repeat Password</FormLabel>
        <FormControl>
          <Input
            type="password"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button
      type="submit"
      size="sm"
      class="w-full"
      :disabled="isPending"
    >
      Update
    </Button>
  </form>
</template>
