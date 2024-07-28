<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { NuxtLink } from '#components'

const { login } = useAuth()
const router = useRouter()

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string(),
  }),
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  const isSuccess = await login(values)

  if (isSuccess) {
    router.push('/')
  }
})
</script>

<template>
  <UiHeading>
    Sign In
  </UiHeading>
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
      name="password"
      :validate-on-model-update="false"
      :validate-on-blur="false"
    >
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input
            type="password"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormItem>
      <Button
        type="submit"
        size="sm"
        class="w-full"
      >
        Sign In
      </Button>
    </FormItem>
    <div>
      <UiText>
        Don't have an account?
        <Button
          :as="NuxtLink"
          to="/login?type=signup"
          size="link"
          variant="link"
        >
          Sign Up
        </Button>
      </UiText>
    </div>
  </form>
</template>
