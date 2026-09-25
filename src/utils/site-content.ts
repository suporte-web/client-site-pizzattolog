export type SiteContent =
  Record<string, unknown> | null | undefined;

export function getContentValue(
  content: SiteContent,
  path: string,
): unknown {
  if (!content) {
    return undefined;
  }

  return path
    .split('.')
    .reduce<unknown>((current, part) => {
      if (
        current === null ||
        current === undefined
      ) {
        return undefined;
      }

      if (Array.isArray(current)) {
        return current[Number(part)];
      }

      if (typeof current !== 'object') {
        return undefined;
      }

      return (
        current as Record<string, unknown>
      )[part];
    }, content);
}

export function getContentString(
  content: SiteContent,
  path: string,
  fallback: string,
): string {
  const value = getContentValue(
    content,
    path,
  );

  return typeof value === 'string' &&
    value.trim()
    ? value
    : fallback;
}

export function getContentArray<T>(
  content: SiteContent,
  path: string,
): T[] | undefined {
  const value = getContentValue(
    content,
    path,
  );

  return Array.isArray(value)
    ? (value as T[])
    : undefined;
}

export function mergeTextItems<
  TItem extends Record<string, unknown>,
>(
  fallback: readonly TItem[],
  content: SiteContent,
  path: string,
  keys: Array<keyof TItem>,
): TItem[] {
  const items =
    getContentArray<
      Record<string, unknown>
    >(content, path);

  if (!items?.length) {
    return [...fallback];
  }

  return fallback.map((item, index) => {
    const editableItem =
      items[index];

    if (!editableItem) {
      return item;
    }

    return keys.reduce<TItem>(
      (current, key) => {
        const value =
          editableItem[
            key as string
          ];

        if (
          typeof value !== 'string' ||
          !value.trim()
        ) {
          return current;
        }

        return {
          ...current,
          [key]: value,
        };
      },
      item,
    );
  });
}

export function mergeStringItems(
  fallback: string[],
  content: SiteContent,
  path: string,
): string[] {
  const items =
    getContentArray<unknown>(
      content,
      path,
    );

  if (!items?.length) {
    return fallback;
  }

  return fallback.map(
    (item, index) => {
      const value = items[index];

      return typeof value === 'string' &&
        value.trim()
        ? value
        : item;
    },
  );
}
