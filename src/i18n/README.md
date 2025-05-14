# Internationalization (i18n) Guide

This project uses [react-i18next](https://react.i18next.com/) for internationalization. 

## Available Languages

The application currently supports three languages:
- English (en)
- Filipino (fil)
- Urdu (ur)

## How It Works

The translation system uses:
- `i18next` as the core internationalization framework
- `react-i18next` for React bindings
- `i18next-browser-languagedetector` to detect user language preferences

## How to Use Translations in Components

1. Import the `useTranslation` hook:
```tsx
import { useTranslation } from 'react-i18next';
```

2. Initialize the hook in your component:
```tsx
const { t, i18n } = useTranslation();
```

3. Use the `t` function to translate strings:
```tsx
// Simple translation
<h1>{t('dashboard.title')}</h1>

// With variables
<p>{t('greeting', { name: 'John' })}</p>
```

4. Change language programmatically (if needed):
```tsx
// Switch to Filipino
i18n.changeLanguage('fil');
```

## Adding New Translations

1. Create translation keys in the JSON files:
   - `src/i18n/locales/en/translation.json` (English)
   - `src/i18n/locales/fil/translation.json` (Filipino)
   - `src/i18n/locales/ur/translation.json` (Urdu)

2. Organize keys in a nested structure:
```json
{
  "section": {
    "subsection": {
      "key": "Translation value"
    }
  }
}
```

3. Access nested keys with dots:
```tsx
t('section.subsection.key')
```

## Adding a New Language

1. Create a new folder in `src/i18n/locales/` with the language code (e.g., `fr` for French)

2. Create a `translation.json` file inside this folder with all the translations

3. Update `src/i18n/index.ts` to include the new language:
```tsx
// Import the new translation
import translationFR from './locales/fr/translation.json';

// Add it to the resources
const resources = {
  // existing languages...
  fr: {
    translation: translationFR
  }
};
```

4. Add the language to the `LanguageSelector` component:
```tsx
const languages = [
  // existing languages...
  { code: "fr", name: t("language_selector.french") }
];
```

5. Don't forget to add the new language name to all existing translation files:
```json
"language_selector": {
  "french": "French" // in English file
  "french": "Pranses" // in Filipino file
  "french": "فرانسیسی" // in Urdu file
}
```

## Best Practices

1. Use a consistent naming convention for translation keys
2. Group related translations in logical nested structures
3. Use placeholders for dynamic content
4. Keep translations concise and clear
5. Test all languages after making changes

## Notes

- The language selector is located in the navbar
- Language preference is saved in localStorage
- The default language is English 