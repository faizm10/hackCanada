"use client";
import React from "react";
import { Document, Page, Text, StyleSheet, Font, Image } from "@react-pdf/renderer";

// Registering the Roboto font
Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5Q.ttf",
});

// **Legal Document Generator**
const LegalDocumentPDF = ({ formData }: { formData: any }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>~ Legal Document Generated ~</Text>

        {/* Title */}
        <Text style={styles.title}>{formData.documentType}</Text>

        {/* Party Details */}
        <Text style={styles.subtitle}>Landlord Information</Text>
        <Text style={styles.text}>Name: {formData.landlordName}</Text>
        <Text style={styles.text}>Address: {formData.landlordAddress}</Text>
        <Text style={styles.text}>Email: {formData.landlordEmail}</Text>

        <Text style={styles.subtitle}>Tenant Information</Text>
        <Text style={styles.text}>Name: {formData.tenantName}</Text>
        <Text style={styles.text}>Address: {formData.tenantAddress}</Text>

        {/* Case Details */}
        <Text style={styles.subtitle}>Case Details</Text>
        <Text style={styles.text}>{formData.caseDetails}</Text>

        {/* Footer */}
        <Text style={styles.footer}>Generated on: {new Date().toLocaleDateString()}</Text>
      </Page>
    </Document>
  );
};

// **Styling for the PDF**
const styles = StyleSheet.create({
  body: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 50,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    fontFamily: "Roboto",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    fontFamily: "Roboto",
    textAlign: "justify",
    lineHeight: 2, // Double-spaced
    marginBottom: 10,
  },
  header: {
    fontSize: 10,
    textAlign: "center",
    color: "grey",
    marginBottom: 20,
  },
  footer: {
    fontSize: 10,
    textAlign: "center",
    color: "grey",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
});

export default LegalDocumentPDF;
