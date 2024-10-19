export const SAFE_SERVICE_BASE_SEPOLIA = 'https://safe-transaction-base-sepolia.safe.global/api';

export const SAFE_SERVICE_API = {
  allTransactions: (address: string) => `/v1/safes/${address}/all-transactions/`,
};

export const SAFE_SERVICE_BASE_URL: Record<number, string> = {
  [84532]: SAFE_SERVICE_BASE_SEPOLIA,
};

export const JUNGWOO_TEST_ADDRESS = '0x5234aE468E2281192FC6ED7C02275C5b7BF62d44';
