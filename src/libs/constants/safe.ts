export const SAFE_SERVICE_BASE_SEPOLIA = 'https://safe-transaction-base-sepolia.safe.global/api';

export const SAFE_SERVICE_API = {
  allTransactions: (address: string) => `/v1/safes/${address}/all-transactions/`,
};

export const SAFE_SERVICE_BASE_URL: Record<number, string> = {
  [84532]: SAFE_SERVICE_BASE_SEPOLIA,
};

export const JUNGWOO_TEST_ADDRESS = '0x5234aE468E2281192FC6ED7C02275C5b7BF62d44';

export const SAFE_CREATE_CALL_CONTRACTS: Record<number, string> = {
  [1]: '0x7cbB62EaA69F79e6873cD1ecB2392971036cFAa4', // mainnet
  [11155111]: '0x7cbB62EaA69F79e6873cD1ecB2392971036cFAa4', //sepolia
  [84532]: '0x7cbB62EaA69F79e6873cD1ecB2392971036cFAa4', // base sepolia
};
