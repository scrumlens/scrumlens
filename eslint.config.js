import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 1,
      },
    ],
    'vue/no-v-text-v-html-on-component': ['error', { allow: ['ui-text'] }],
    'eslint-comments/no-unlimited-disable': 'off',
  },
  formatters: {
    css: true,
  },
})
