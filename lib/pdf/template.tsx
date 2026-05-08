import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 48,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 32,
    paddingBottom: 20,
    borderBottom: "1 solid #e5e7eb",
  },
  brand: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#6366f1",
    marginBottom: 4,
  },
  headerSub: {
    fontSize: 9,
    color: "#9ca3af",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginBottom: 6,
    marginTop: 28,
  },
  clientName: {
    fontSize: 14,
    color: "#6366f1",
    marginBottom: 4,
  },
  date: {
    fontSize: 9,
    color: "#9ca3af",
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#374151",
    marginBottom: 6,
    marginTop: 20,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  text: {
    fontSize: 11,
    color: "#4b5563",
    lineHeight: 1.7,
    marginBottom: 10,
  },
  priceBox: {
    backgroundColor: "#f5f3ff",
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 16,
    borderLeft: "3 solid #6366f1",
  },
  priceLabel: {
    fontSize: 9,
    color: "#7c3aed",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#1f2937",
  },
  footer: {
    position: "absolute",
    bottom: 36,
    left: 48,
    right: 48,
    borderTop: "1 solid #e5e7eb",
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 9,
    color: "#9ca3af",
  },
});

interface Block {
  id: string;
  type: "text" | "price" | "list";
  label: string;
  value: string;
}

interface ProposalPDFProps {
  clientName: string;
  blocks: Block[];
  templateName: string;
}

export function ProposalPDF({ clientName, blocks, templateName }: ProposalPDFProps) {
  const date = new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brand}>MFT</Text>
          <Text style={styles.headerSub}>Moscow Factory Tech</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Коммерческое предложение</Text>
        <Text style={styles.clientName}>Для: {clientName}</Text>
        <Text style={styles.date}>{date} · {templateName}</Text>

        {/* Blocks */}
        {blocks.map((block) => (
          <View key={block.id}>
            {block.type === "price" ? (
              <View style={styles.priceBox}>
                <Text style={styles.priceLabel}>{block.label}</Text>
                <Text style={styles.priceValue}>{block.value || "—"}</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.sectionTitle}>{block.label}</Text>
                <Text style={styles.text}>{block.value || "—"}</Text>
              </View>
            )}
          </View>
        ))}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Moscow Factory Tech</Text>
          <Text style={styles.footerText}>hello@mft.ru</Text>
        </View>
      </Page>
    </Document>
  );
}
