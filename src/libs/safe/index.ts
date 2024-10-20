import SafeApiKit from '@safe-global/api-kit';
import {} from '@safe-global/types-kit';
import { SAFE_SERVICE_BASE_URL } from '../constants/safe';

export class Safe {
  baseUrl: string;
  chainId: number;
  apiKit: SafeApiKit;
  constructor(chainId: number) {
    this.chainId = chainId;
    this.baseUrl = SAFE_SERVICE_BASE_URL[chainId] as string;
    this.apiKit = new SafeApiKit({ chainId: BigInt(chainId) });
  }

  async getTransactions(address: string) {
    if (!this.baseUrl) throw new Error('un supported safe chain');
    return await this.apiKit.getAllTransactions(address);
  }
}
