import { CD } from "./cd.class";
export class Transaction {
  constructor(
    public timestamp,
    public payerAddr: string,
    public payeeAddr: string,
    public amount: number = 0,
    public smartContract: CD = null
  ) {}
}
