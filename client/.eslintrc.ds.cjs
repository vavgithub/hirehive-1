/**
 * Isolated design-system lint config.
 * Run with --no-eslintrc so this never inherits the existing 1,879-error lint run.
 *
 * Existing style={{}} attributes are grandfathered via overrides.
 * @mui imports are banned in every file. New files get both bans immediately.
 * Whole-tree counts (including grandfathered files) are enforced by ds-audit.mjs.
 */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  ignorePatterns: ['dist', 'node_modules', 'scripts'],
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector: "JSXAttribute[name.name='style']",
        message:
          'Inline style is banned. Use a design-token class. The only allowed exception is setting a CSS custom property for a continuous runtime value (the two progress bars in Assessment.jsx).',
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@mui/*', '@mui/*/*'],
            message:
              '@mui is confined to the allowlisted files in this config until it is removed. Do not add new imports.',
          },
        ],
      },
    ],
  },
  overrides: [
    {
      // Grandfathered: files that already have a JSX style attribute.
      // Remove a path from this list when that file is converted. Do not add new ones.
      files: [
        'src/auth/CandidateLayout.jsx',
        'src/components/Charts/ScoreChart.jsx',
        'src/components/Charts/ScreeningChart.jsx',
        'src/components/Dropdowns/CustomDropdown.jsx',
        'src/components/Filters/FilterForDataTable.jsx',
        'src/components/Filters/ReviewsFilter.jsx',
        'src/components/Filters/ScoreFilter.jsx',
        'src/components/Form/ContactUs.jsx',
        'src/components/Loaders/Loader.jsx',
        'src/components/QuestionUtilities/AdditionalQuestions.jsx',
        'src/components/Staging/GlobalStaging.jsx',
        'src/components/tableUtilities/GetColumns.jsx',
        'src/components/ui/AssessmentBanner.jsx',
        'src/components/ui/StatsGrid.jsx',
        'src/components/utility/Stepper.jsx',
        'src/main.jsx',
        'src/pages/Admin/Jobs.jsx',
        'src/pages/Candidate/AllJobs.jsx',
        'src/pages/Candidate/Assessment.jsx',
        'src/pages/DesignReviewer/Guide.jsx',
        'src/svg/Icons/TelegramIcon.jsx',
      ],
      rules: {
        'no-restricted-syntax': 'off',
      },
    },
  ],
};
