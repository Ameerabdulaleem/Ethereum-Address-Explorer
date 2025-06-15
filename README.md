# Ethereum Address Explorer CLI

A Node.js command-line tool to fetch Ethereum wallet balances and transaction history using Alchemy's API.

## Features
- ✅ Real-time ETH balance lookup
- ✅ Last 5 transactions with details
- ✅ Handles both external and internal transactions
- ✅ Error handling for invalid addresses

## How It Works
1. Uses Alchemy's `getAssetTransfers` API (since Ethers.js v6 removed `getHistory`)
2. Converts wei to ETH with safe decimal handling
3. Displays formatted transaction data

## Setup
1. Get free API key from [Alchemy](https://dashboard.alchemy.com/)
2. Clone repo:
   ```bash
   git clone https://github.com/your-username/ethereum-address-explorer.git

   - install dependencies (npm install)
   - create .env file : ALCHEMY_API_KEY=your_key_here
   after everything , run index.js 0x0....... (random wallet address)

   ```
   ## Challenges Solved
- Migrated from deprecated Ethers.js methods to Alchemy API
- Implemented safe BigInt conversion for wei values
- Handled edge cases (pending transactions, contract creations)
   
   
