// src/services/midnightWallet.ts
// Service layer for Midnight Lace Wallet Connection & Preprod Indexer Communication

export interface WalletState {
  isConnected: boolean;
  walletAddress: string | null;
  network: 'preprod' | 'testnet' | 'mainnet' | null;
  tDustBalance: number;
  isConnecting: boolean;
  error: string | null;
}

export class MidnightWalletService {
  private state: WalletState = {
    isConnected: false,
    walletAddress: null,
    network: null,
    tDustBalance: 0,
    isConnecting: false,
    error: null,
  };

  private listeners: Array<(state: WalletState) => void> = [];

  public subscribe(listener: (state: WalletState) => void): () => void {
    this.listeners.push(listener);
    listener(this.state);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l(this.state));
  }

  public getState(): WalletState {
    return { ...this.state };
  }

  public async connect(): Promise<boolean> {
    this.state.isConnecting = true;
    this.state.error = null;
    this.notify();

    try {
      // Simulate Lace Wallet Midnight Preprod connection delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const mockAddress = 'mn_1q89a3f7c2b5d4e1f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1';
      this.state = {
        isConnected: true,
        walletAddress: mockAddress,
        network: 'preprod',
        tDustBalance: 125000,
        isConnecting: false,
        error: null,
      };
      this.notify();
      return true;
    } catch (err: any) {
      this.state.isConnecting = false;
      this.state.error = err?.message || 'Failed to connect Midnight Lace Wallet';
      this.notify();
      return false;
    }
  }

  public disconnect() {
    this.state = {
      isConnected: false,
      walletAddress: null,
      network: null,
      tDustBalance: 0,
      isConnecting: false,
      error: null,
    };
    this.notify();
  }
}

export const midnightWallet = new MidnightWalletService();
