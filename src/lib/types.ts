export interface CustomerType {
    _id: string;
    name: string;
    address: string;
    mobile: string;
    gstNumber: string;
    currentReading: number;
  }
  export interface InvoiceType {
    invoiceNo: string;
    date: Date;
    _id:string;
    gstAmount:string
    customerName:string
    customer: CustomerType | string;
    previousReading: number;
    currentReading: number;
    rentAmount: number;
    freeCopies: number;
    ratePerReading: number;
    gstType: string;
    totalAmount: number;
  }
  