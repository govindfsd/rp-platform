import type { Decorator, Preview } from '@storybook/angular';

const withTheme: Decorator = (story, context) => {
  const theme = (context.globals['theme'] as string) ?? 'light';
  document.documentElement.setAttribute('data-theme', theme);
  return story();
};

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    layout: 'centered',
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
  },
  globalTypes: {
    theme: {
      description: 'Design system theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
