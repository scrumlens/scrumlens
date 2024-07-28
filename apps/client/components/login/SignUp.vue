<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { NuxtLink } from '#components'

const formSchema = toTypedSchema(
  z
    .object({
      email: z.string().email(),
      password: z.string().min(5),
      passwordConfirm: z.string(),
    })
    .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
      message: 'Passwords do not match',
      path: ['passwordConfirm'],
    }),
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async () => {
  // TODO добавить позже
})
</script>

<template>
  <UiHeading>
    Sign Up
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
    >
      Sign Up
    </Button>
    <div>
      <UiText>
        Already a member?
        <Button
          size="link"
          variant="link"
          :as="NuxtLink"
          to="/login"
        >
          Sign In
        </Button>
      </UiText>
    </div>
  </form>
</template>
