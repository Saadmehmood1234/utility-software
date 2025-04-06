"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { InvoiceType } from "@/lib/types";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 10,
    borderBottom: "1 solid #ccc",
    paddingBottom: 6,
  },
  heading: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "bold",
  },
  label: {
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    marginBottom: 10,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderBottom: "1 solid #ccc",
  },
  tableCell: {
    flex: 1,
    padding: 6,
    borderRight: "1 solid #ccc",
    textAlign: "left",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  },
});

const InvoicePDF = ({ invoice }: { invoice: InvoiceType }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>Invoice #{invoice.invoiceNo}</Text>

      <View style={styles.section}>
        <Text>
          <Text style={styles.label}>Date:</Text>{" "}
          {new Date(invoice.date).toLocaleDateString()}
        </Text>
        <Text>
          <Text style={styles.label}>Customer:</Text> {invoice.customerName}
        </Text>
      </View>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Description</Text>
          <Text style={styles.tableCell}>Amount</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Previous Reading</Text>
          <Text style={styles.tableCell}>{invoice.previousReading}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Current Reading</Text>
          <Text style={styles.tableCell}>{invoice.currentReading}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Free Copies</Text>
          <Text style={styles.tableCell}>{invoice.freeCopies}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Rate Per Reading</Text>
          <Text style={styles.tableCell}>₹{invoice.ratePerReading}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Rent</Text>
          <Text style={styles.tableCell}>₹{invoice.rentAmount}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>GST</Text>
          <Text style={styles.tableCell}>
            {invoice.gstType.toUpperCase()} - ₹
            {Number(invoice.gstAmount).toFixed(2)}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Total Amount</Text>
          <Text style={styles.tableCell}>₹{invoice.totalAmount}</Text>
        </View>
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
          {({ loading }) => (loading ? "Generating..." : "Download")}
        </PDFDownloadLink>
      ))}
    </div>
  );
};

export default Download;
