export const SAFE_SERVICE_BASE_SEPOLIA = 'https://safe-transaction-base-sepolia.safe.global/api';

export const SAFE_SERVICE_API = {
  allTransactions: (address: string) => `/v1/safes/${address}/all-transactions/`,
};

export const SAFE_SERVICE_BASE_URL: Record<number, string> = {
  [84532]: SAFE_SERVICE_BASE_SEPOLIA,
};
