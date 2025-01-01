export const fetchItems = async ({ queryKey }) => {
  const [_key, { category, price_lt, page, pageSize }] = queryKey;

  const queryParams = new URLSearchParams({
    ...(category && { category }),
    ...(price_lt && { price_lt }),
    page: page || 1,
    pageSize: pageSize || 10,
  });

  const response = await fetch(`/api/items?${queryParams.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }

  return response.json();
};
