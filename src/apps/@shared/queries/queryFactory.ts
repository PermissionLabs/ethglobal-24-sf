export enum BaseQueryKey {
  EXAMPLE = '@example',
}

export const getBaseQueryKey = (baseQueryKey: keyof typeof BaseQueryKey, ...keys: string[]) => {
  return [BaseQueryKey[baseQueryKey], ...keys].join('/');
};
