'use client';

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import { InvoiceType } from '@/lib/types';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 10,
    borderBottom: '1 solid #ccc',
    paddingBottom: 6,
  },
  heading: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
  },
});

const InvoicePDF = ({ invoice }: { invoice: InvoiceType }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>Invoice #{invoice.invoiceNo}</Text>
      <View style={styles.section}>
        <Text><Text style={styles.label}>Date:</Text> {new Date(invoice.date).toLocaleDateString()}</Text>
        <Text><Text style={styles.label}>Customer:</Text> {invoice.customerName}</Text>
        <Text><Text style={styles.label}>Previous Reading:</Text> {invoice.previousReading}</Text>
        <Text><Text style={styles.label}>Current Reading:</Text> {invoice.currentReading}</Text>
        <Text><Text style={styles.label}>Free Copies:</Text> {invoice.freeCopies}</Text>
        <Text><Text style={styles.label}>Rate Per Reading:</Text> ₹{invoice.ratePerReading}</Text>
        <Text><Text style={styles.label}>Rent:</Text> ₹{invoice.rentAmount}</Text>
        <Text><Text style={styles.label}>GST:</Text> {invoice.gstType.toUpperCase()} - ₹{invoice.gstAmount}</Text>
        <Text><Text style={styles.label}>Total Amount:</Text> ₹{invoice.totalAmount}</Text>
      </View>
    </Page>
  </Document>
);

const Download = ({ invoices }: { invoices: InvoiceType[] }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      {invoices.map((invoice) => (
        <PDFDownloadLink
          key={invoice._id}
          document={<InvoicePDF invoice={invoice} />}
          fileName={`Invoice-${invoice.invoiceNo}.pdf`}
          className="text-blue-600 underline hover:text-blue-800"
        >
          {({ loading }) => (loading ? 'Generating...' : 'Download')}
        </PDFDownloadLink>
      ))}
    </div>
  );
};

export default Download;
