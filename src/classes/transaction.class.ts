export class Transaction {
  constructor(
    public timestamp,
    public payerAddr,
    public payeeAddr,
    public amount: number = 0
  ) {}
}
