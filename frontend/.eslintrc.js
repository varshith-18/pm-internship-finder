module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    // Disable unused vars warning for variables that start with underscore
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
    'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
    
    // Or completely disable unused vars warnings (not recommended)
    // 'no-unused-vars': 'off',
    // '@typescript-eslint/no-unused-vars': 'off',
  }
};