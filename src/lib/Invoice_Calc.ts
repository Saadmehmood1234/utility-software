interface CalculateInvoiceType {
  currentReading: number;
  previousReading: number;
  rentAmount: number;
  freeCopies: number;
  ratePerReading: number;
  gstType: string;
}
export const calculateInvoice = ({
  currentReading,
  previousReading,
  rentAmount,
  freeCopies,
  ratePerReading,
  gstType,
}: CalculateInvoiceType) => {
  console.log(
    currentReading,
    previousReading,
    rentAmount,
    freeCopies,
    ratePerReading,
    gstType
  );
  const netPayableReading = currentReading - previousReading - freeCopies;
  const totalT1 = netPayableReading * ratePerReading + rentAmount;
  let gstAmount = 0;
  if (gstType === "cgst") {
    gstAmount = totalT1 * 0.09 * 2;
  } else if (gstType === "igst") {
    gstAmount = totalT1 * 0.18;
  }
  const finalTotal = totalT1 + gstAmount;
  return { netPayableReading, totalT1, gstAmount, finalTotal };
};
