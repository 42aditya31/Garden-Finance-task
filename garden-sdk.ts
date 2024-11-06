import {
    BitcoinNetwork,
    BitcoinProvider,
    BitcoinWallet,
    EVMWallet,
  } from '@catalogfi/wallets';
  import { JsonRpcProvider, Wallet, BrowserProvider } from 'ethers';
  import { Orderbook, Chains, Assets, Actions, parseStatus } from '@gardenfi/orderbook';
  import { GardenJS } from '@gardenfi/core';
  

  declare global {
    interface Window {
      ethereum: any;
    }
  }
  
  
  const createBitcoinWallet = async () => {
    const bitcoinProvider = new BitcoinProvider(BitcoinNetwork.Mainnet);
    const signer = await new BrowserProvider(window.ethereum).getSigner();
    const bitcoinWalletOpts = {
      provider: bitcoinProvider,
      privateKey: 'your-bitcoin-private-key', 
    };
    const bitcoinOTA = new BitcoinWallet(bitcoinWalletOpts);
    return bitcoinOTA;
  };
  
  
  const createEVMWallet = () => {
    const ethereumPk = '';
    const ethereumProvider = new JsonRpcProvider('https://rpc.ankr.com/eth');
    const signer = new Wallet(ethereumPk, ethereumProvider);
    return new EVMWallet(signer);
  };
  
 
  (async () => {
    try {
      const bitcoinWallet = await createBitcoinWallet();
      const evmWallet = createEVMWallet();
  
      const orderbook = await Orderbook.init({
        signer: evmWallet.getSigner(), 
      });
  
      const wallets = {
        [Chains.bitcoin]: bitcoinWallet,
        [Chains.ethereum]: evmWallet,
      };
  
      const garden = new GardenJS(orderbook, wallets);
  
      const sendAmount = 0.0001 * 1e8;
      const receiveAmount = (1 - 0.3 / 100) * sendAmount;
  
      const orderId = await garden.swap(
        Assets.bitcoin.BTC,
        Assets.ethereum.WBTC,
        sendAmount,
        receiveAmount
      );
  
      console.log('Swap request created with order ID:', orderId);

        
      garden.subscribeOrders(await evmWallet.getAddress(), async (orders) => {
        const order = orders.filter((order) => order.ID === orderId)[0];
        if (!order) return;
  
        const action = parseStatus(order);
  
        if (action === Actions.UserCanInitiate || action === Actions.UserCanRedeem) {
          const swapper = garden.getSwap(order);
          const performedAction = await swapper.next();
          console.log(
            Completed Action ${performedAction.action} with transaction hash: ${performedAction.output}
          );
        }
      });
    } catch (error) {
      console.error('Error in Garden SDK integration:', error);
    }
  })();
