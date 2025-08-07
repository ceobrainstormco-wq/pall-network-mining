import Web3 from 'web3';

// BNB Smart Chain Configuration
export const BSC_MAINNET_CONFIG = {
  chainId: '0x38', // 56 in decimal
  chainName: 'BNB Smart Chain',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: ['https://bsc-dataseed1.binance.org/'],
  blockExplorerUrls: ['https://bscscan.com/'],
};

// USDT BEP-20 Contract Address on BSC
export const USDT_CONTRACT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955';

// USDT Contract ABI (minimal required functions)
export const USDT_ABI = [
  {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {"name": "_to", "type": "address"},
      {"name": "_value", "type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"name": "", "type": "bool"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint8"}],
    "type": "function"
  }
];

// Securely stored recipient wallet address (not exposed in UI)
const RECIPIENT_WALLET = '0xAaE232DeFc1a7951C6b8a00EC46C6d451f605cCF';

export class Web3Service {
  private web3: Web3 | null = null;
  private account: string | null = null;

  async connectWallet(): Promise<string> {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please connect your MetaMask wallet.');
      }

      this.web3 = new Web3(window.ethereum);
      this.account = accounts[0];

      // Check if user is on BSC network
      await this.ensureBSCNetwork();

      return this.account;
    } catch (error: any) {
      console.error('Wallet connection error:', error);
      throw new Error(`Failed to connect wallet: ${error.message}`);
    }
  }

  private async ensureBSCNetwork(): Promise<void> {
    if (!window.ethereum) return;

    try {
      // Try to switch to BSC network
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: BSC_MAINNET_CONFIG.chainId }],
      });
    } catch (switchError: any) {
      // Network doesn't exist, add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [BSC_MAINNET_CONFIG],
          });
        } catch (addError) {
          throw new Error('Failed to add BSC network to MetaMask');
        }
      } else {
        throw new Error('Failed to switch to BSC network');
      }
    }
  }

  async getUSDTBalance(): Promise<string> {
    if (!this.web3 || !this.account) {
      throw new Error('Wallet not connected');
    }

    try {
      const contract = new this.web3.eth.Contract(USDT_ABI as any, USDT_CONTRACT_ADDRESS);
      const balance = await contract.methods.balanceOf(this.account).call();
      const decimals = await contract.methods.decimals().call();
      
      // Convert from wei to USDT (6 decimals for USDT)
      const balanceInUSDT = parseFloat(balance) / Math.pow(10, parseInt(decimals));
      return balanceInUSDT.toFixed(2);
    } catch (error) {
      console.error('Error getting USDT balance:', error);
      throw new Error('Failed to get USDT balance');
    }
  }

  async sendUSDTPayment(amountUSDT: number): Promise<string> {
    if (!this.web3 || !this.account) {
      throw new Error('Wallet not connected');
    }

    try {
      const contract = new this.web3.eth.Contract(USDT_ABI as any, USDT_CONTRACT_ADDRESS);
      
      // Convert USDT amount to wei (USDT has 18 decimals on BSC)
      const decimals = await contract.methods.decimals().call();
      const amountInWei = this.web3.utils.toBN(amountUSDT).mul(
        this.web3.utils.toBN(10).pow(this.web3.utils.toBN(decimals))
      );

      // Estimate gas
      const gasEstimate = await contract.methods
        .transfer(RECIPIENT_WALLET, amountInWei.toString())
        .estimateGas({ from: this.account });

      // Send transaction
      const transaction = await contract.methods
        .transfer(RECIPIENT_WALLET, amountInWei.toString())
        .send({
          from: this.account,
          gas: Math.floor(gasEstimate * 1.2), // Add 20% buffer
        });

      return transaction.transactionHash;
    } catch (error: any) {
      console.error('Payment error:', error);
      if (error.message.includes('insufficient funds')) {
        throw new Error('Insufficient USDT balance for this transaction');
      }
      throw new Error(`Payment failed: ${error.message}`);
    }
  }

  async verifyTransaction(txHash: string, expectedAmount: number): Promise<boolean> {
    if (!this.web3) {
      throw new Error('Web3 not initialized');
    }

    try {
      const receipt = await this.web3.eth.getTransactionReceipt(txHash);
      if (!receipt || !receipt.status) {
        return false;
      }

      // Additional verification could be added here
      // For now, we trust that the transaction was successful if it has a receipt
      return true;
    } catch (error) {
      console.error('Transaction verification error:', error);
      return false;
    }
  }

  getAccount(): string | null {
    return this.account;
  }

  isConnected(): boolean {
    return this.web3 !== null && this.account !== null;
  }
}

// Global Web3 service instance
export const web3Service = new Web3Service();

// Type definitions for MetaMask
declare global {
  interface Window {
    ethereum?: any;
  }
}