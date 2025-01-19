const locales = Object.values(
  import.meta.glob<{ default: Locale }>("./locales/*.ts", { eager: true }),
);

export interface Locale {
  locale: string;

  strings: {
    [keys: string]: string;
  };
}

export function listLocales(): string[] {
  return locales.map((i) => i.default.locale);
}

export function getLocale(target: string): Locale {
  return (
    locales.find((i) => i.default.locale === target)?.default ??
    (() => {
      throw new Error(`Locale ${target} not found`);
    })()
  );
}

export function getString(locale: string): (t: string) => string {
  return function (t) {
    return (
      locales.find((i) => i.default.locale === locale)?.default.strings[t] ??
      (() => {
        throw new Error(`String ${t} not found in locale ${locale}`);
      })()
    );
  };
}
