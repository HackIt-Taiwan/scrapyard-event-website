const locales = Object.values(
  import.meta.glob<{ default: Locale }>("./locales/*.ts", { eager: true }),
);
const news = Object.values(
  import.meta.glob<{ default: News }>("./news/*.ts", { eager: true }),
);

const faq = Object.values(
  import.meta.glob<{ default: Faq }>("./faq/*.ts", { eager: true }),
);

export interface Locale {
  locale: string;

  strings: {
    [keys: string]: string;
  };
}

export interface News {
  locale: string;

  news: {
    title: string;
    date: string;
    content: string;
  }[];
}

export interface Faq {
  locale: string;

  faq: {
    title: string;
    answer: string;
  }[];
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

export function getNews(locale: string): News {
  return (
    news.find((i) => i.default.locale === locale)?.default ??
    (() => {
      throw new Error(`Locale ${locale} not found in news`);
    })()
  );
}

export function getFaq(locale: string): Faq {
  return (
    faq.find((i) => i.default.locale === locale)?.default ??
    (() => {
      throw new Error(`Locale ${locale} not found in Faq`);
    })()
  );
}
