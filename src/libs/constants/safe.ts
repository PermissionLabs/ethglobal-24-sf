export const SAFE_SERVICE_BASE_SEPOLIA = 'https://safe-transaction-base-sepolia.safe.global/';

export const SAFE_SERVICE_API = {
  allTransactions: (address: string) => `${SAFE_SERVICE_BASE_SEPOLIA}v1/safes/${address}/all-transactions/`,
};
