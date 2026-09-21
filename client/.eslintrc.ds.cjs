/**
 * Isolated design-system lint config.
 * Run with --no-eslintrc so this never inherits the existing 1,879-error lint run.
 *
 * Existing style={{}} and @mui imports are grandfathered via overrides so this
 * command passes on today's codebase. New files get the bans immediately.
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
        'src/components/Charts/InterviewsChart.jsx',
        'src/components/Charts/ScoreChart.jsx',
        'src/components/Charts/ScreeningChart.jsx',
        'src/components/Dropdowns/CustomDropdown.jsx',
        'src/components/Dropdowns/GlobalDropDown.jsx',
        'src/components/Filters/FilterForDataTable.jsx',
        'src/components/Filters/ReviewsFilter.jsx',
        'src/components/Filters/ScoreFilter.jsx',
        'src/components/Form/ContactUs.jsx',
        'src/components/Loaders/Loader.jsx',
        'src/components/QuestionUtilities/AdditionalQuestions.jsx',
        'src/components/Staging/GlobalStaging.jsx',
        'src/components/Tooltip/CustomToolTip.jsx',
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
    {
      // Grandfathered: files that already import @mui. Same rule — shrink this list, never grow it.
      files: [
        'src/App.jsx',
        'src/auth/CandidateLayout.jsx',
        'src/components/AdminLayout.jsx',
        'src/components/Dropdowns/GlobalDropDown.jsx',
        'src/components/Inputs/LocationInputField.jsx',
        'src/components/MUIUtilities/**/*.js',
        'src/components/MUIUtilities/**/*.jsx',
        'src/components/Register/AddMembers.jsx',
        'src/components/Staging/ApplicationStaging.jsx',
        'src/components/Staging/PortfolioStage.jsx',
        'src/components/Staging/StageProgressBar.jsx',
        'src/components/Tooltip/CustomToolTip.jsx',
        'src/components/tableUtilities/BudgetMenu.jsx',
        'src/components/tableUtilities/GetColumns.jsx',
        'src/components/tableUtilities/Table.jsx',
        'src/components/ui/ThreeDots.jsx',
        'src/pages/Admin/AdminDashboard.jsx',
        'src/pages/DesignReviewer/Reviews.jsx',
      ],
      rules: {
        'no-restricted-imports': 'off',
      },
    },
  ],
};
