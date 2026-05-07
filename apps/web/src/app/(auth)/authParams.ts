export type AuthSearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

export async function getAuthMessage(searchParams: AuthSearchParams) {
  const params = await searchParams;

  return {
    error: getFirstParam(params.error),
    message: getFirstParam(params.message),
  };
}

function getFirstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
