interface Order {
    id: string;
    traderAddress: string;
    amount: number;
    price: number;
    orderType: "buy" | "sell";
  }
  
  class OrderBook {
    private buyOrders: Order[] = [];
    private sellOrders: Order[] = [];
  
 
    public addOrder(order: Order): void {
      if (order.orderType === "buy") {
        this.buyOrders.push(order);
        this.buyOrders.sort((a, b) => b.price - a.price); 
      } else {
        this.sellOrders.push(order);
        this.sellOrders.sort((a, b) => a.price - b.price); 
      }
    }
  
   
    public removeOrder(orderId: string): void {
      this.buyOrders = this.buyOrders.filter((order) => order.id !== orderId);
      this.sellOrders = this.sellOrders.filter((order) => order.id !== orderId);
    }
  
 
    public getBuyOrders(): Order[] {
      return this.buyOrders;
    }
  
   
    public getSellOrders(): Order[] {
      return this.sellOrders;
    }
  
  
    public matchOrders(): void {
      while (
        this.buyOrders.length > 0 &&
        this.sellOrders.length > 0 &&
        this.buyOrders[0].price >= this.sellOrders[0].price
      ) {
        const buyOrder = this.buyOrders.shift()!;
        const sellOrder = this.sellOrders.shift()!;
        console.log(Matching ${buyOrder.amount} at price ${sellOrder.price});
     
      }
    }
  }
  
 
  const orderBook = new OrderBook();
  orderBook.addOrder({
    id: "1",
    traderAddress: "0x123...",
    amount: 100,
    price: 50,
    orderType: "buy",
  });
  orderBook.addOrder({
    id: "2",
    traderAddress: "0xabc...",
    amount: 50,
    price: 45,
    orderType: "sell",
  });
  
  console.log("Buy Orders:", orderBook.getBuyOrders());
  console.log("Sell Orders:", orderBook.getSellOrders());
  
  export default orderBook;
