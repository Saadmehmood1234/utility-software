export const generateInvoiceNumber = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  return `INV-${date}-${randomNumber}`;
};
