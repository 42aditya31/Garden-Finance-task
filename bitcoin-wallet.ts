import {
    BitcoinWallet,
    BitcoinProvider,
    BitcoinNetwork,
} from "@catalogfi/wallets";

const provider = new BitcoinProvider(BitcoinNetwork.Mainnet);

const bitcoinPk = 'YOUR BITCOIN PRIVATE KEY';
const bitcoinWallet = BitcoinWallet.fromPrivateKey(bitcoinPk, bitcoinProvider);

const wif = 'YOUR WIF KEY'
const bitcoinWallet = BitcoinWallet.fromWIF(wif, bitcoinProvider);
