/**
 * TREE FUNCTIONS
 *
 * **/

export type FilterTree = Record<string, unknown>;

export function buildTree(keys: string[]): Record<string, NestedRecord | null> {
  const tree: Record<string, NestedRecord | null> = {};
  keys.forEach((key) => {
    const parts = key.split(".");
    let current = tree;

    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] = index === parts.length - 1 ? null : {};
      }
      current = current[part] as Record<string, NestedRecord | null>;
    });
  });
  return tree;
}

export const flattenTree = (tree: FilterTree, prefix = ""): string[] => {
  const result: string[] = [];
  for (const key in tree) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (tree[key] !== null && typeof tree[key] === "object") {
      result.push(...flattenTree(tree[key] as FilterTree, fullPath));
    } else {
      result.push(fullPath);
    }
  }
  return result;
};

export const separateTopLevelTree = (filterTree: FilterTree) => {
  const topLevelValues: string[] = [];
  const topLevelNullValues: Record<string, null> = {};
  const valueTree: FilterTree = {};

  Object.entries(filterTree).forEach(([key, value]) => {
    if (value === null) {
      topLevelValues.push(key);
      topLevelNullValues[key as string] = null;
    } else {
      valueTree[key] = value;
    }
  });

  return { topLevelValues, topLevelNullValues, valueTree };
};

/**
 * NESTED FUNCTIONS
 *
 * **/

export type NestedRecord = {
  [key: string]: NestedRecord | null;
};

export const getNestedValue = <T>(obj: T, path: string): unknown => {
  if (!path) {
    return undefined;
  }
  if (!path.includes(".")) {
    return obj[path as keyof T];
  }
  return path.split(".").reduce((acc: unknown, key) => {
    if (typeof acc === "object" && acc !== null && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
};

export const flattenNestedObject = (obj: Record<string, string | number>) => {
  return Object.entries(obj)
    .flatMap(([key, values]) => {
      if (Array.isArray(values)) {
        return values.map((value) => ({ key, value }));
      } else if (typeof values === "object" && values !== null) {
        return Object.entries(values).map(([nestedKey, nestedValue]) => ({
          key: `${key}.${nestedKey}`,
          value: nestedValue,
        }));
      } else {
        return [{ key, value: values }];
      }
    })
    .filter(({ value }) => value !== undefined && value !== null);
};

/**
 * KEY FUNCTIONS
 *
 * **/

export const categorizeKeys = (
  flattenedKeys: string[],
  includeArray: string[]
) => {
  const categorized = {
    included: [] as string[],
    uncategorized: [] as string[],
  };

  flattenedKeys.forEach((key) => {
    if (includeArray.includes(key)) {
      categorized.included.push(key);
    } else {
      categorized.uncategorized.push(key);
    }
  });

  return categorized;
};

export const humanReadableKey = (key: string) => {
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");
};
