require('dotenv').config();
const {ethers} = require("ethers");
const fetch = require('node-fetch');

//debug line
console.log("\n API key:", process.env.ALCHEMY_API_KEY);



const provider = new ethers.JsonRpcProvider(
    `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);

    async function explorerAddress(address) {
        try{ 
       //validate ETH address
      if(!ethers.isAddress(address)) {
            throw new Error("invalid Ethereum address!");
        }
    }
     catch (error){
        console.error("Error:", error.message);
     }

       //Fetch balance and transactions
       const balance = await provider.getBalance(address);
       

       //Display results
       console.log(`\n Exploring Address: ${address}`);
       console.log(`Balance : ${ethers.formatEther(balance)} ETH`);
       
       //In Ethers.js V6 this provider.getHistory() was removed
       //const txHistory = await provider.getHistory(address);
       //console.log (`Transaction Count: ${txHistory.length}`);

       //Using Alchemy API as alternative
       const alchemyUrl = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;

       const response = await fetch(alchemyUrl,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify({
        jsonrpc: "2.0",
        id : 1,
        method: "alchemy_getAssetTransfers",
        params: [{
          fromBlock: "0x0",
          fromAddress: address,
          category: ["external" , "internal"] 
           }]
         })
       });

       const data = await response.json();
       const transactions = data.result?.transfers || [];

       console.log(`transactions Count: ${transactions.length}`);

       //Show latest 5 transactions
      console.log("\n Latest 5 Transaction:");
      transactions.slice(0, 5).forEach((tx, i) => {
        
        //Safe conversion
        let valueEth;
        if (typeof tx.value === 'number') {
          //if value is a number like (0.5), assume it's already ETH
          valueEth = tx.value;
        } else {
        
        // Otherwise treat as wei string (hex or decimal) converting wei to ETH 
        const valueWei = BigInt(tx.value || 0);
        valueEth = Number(valueWei) / 1e18; }

        console.log(
          `\n${i + 1}. Hash: ${tx.hash || 'N/A'}\n` +
           `Block: ${tx.blockNum || 'Pending'}\n` +
           `Value: ${valueEth.toFixed(8)} ETH\n`+
           `To : ${tx.to || 'Contract Creation'}\n`+
           `Timestamp: ${new Date(parseInt(tx.metadata?.blockTimestamp || 0) * 1000)}`
        );
      });
    }

    
   // Get address from command line 
   const address = process.argv[2];
   if(!address) {
      console.log("Usage: node index.js <ETH_ADDRESS>");
   } else {
     explorerAddress(address);
   }