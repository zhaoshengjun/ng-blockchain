export class CD {
  constructor(
    public contractAddress: string,
    public contractAmount: number = 0,
    public payerAddress: string,
    public payeeAddress: string,
    public maturityDate: Date
  ) {}
}
