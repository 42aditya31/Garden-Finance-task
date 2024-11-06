import { EVMWallet } from "@catalogfi/wallets";
import { JsonRpcProvider, Wallet } from "ethers";


const provider = new JsonRpcProvider("https://rpc.ankr.com/eth");


const privateKey = "YOUR PRIVATE KEY"; 


const wallet = new Wallet(privateKey, provider);


const evmWallet = new EVMWallet(wallet);

console.log("EVM Wallet Address:", evmWallet.getAddress());
