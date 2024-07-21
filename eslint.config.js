import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 1,
      },
    ],
    'eslint-comments/no-unlimited-disable': 'off',
  },
  formatters: {
    css: true,
  },
})
