<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { NuxtLink } from '#components'
import { api } from '~/services/api'
import { useToast } from '@/components/ui/shadcn/toast/use-toast'

const { toast } = useToast()
const router = useRouter()

const formSchema = toTypedSchema(
  z
    .object({
      name: z.string().min(2),
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

const onSubmit = handleSubmit(async (values) => {
  try {
    await api.auth.postAuthSignup({
      name: values.name,
      email: values.email,
      password: values.password,
    })
    toast({
      title: 'You have successfully signed up!',
      description: 'Now you can sign in.',
    })
    router.push({ name: 'login' })
  }
  catch (err) {
    console.error(err)
    toast({
      title: 'Something went wrong.',
      description: 'Please try again later.',
      variant: 'destructive',
    })
  }
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
