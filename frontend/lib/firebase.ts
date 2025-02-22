// Mock Firebase setup - Replace with actual Firebase configuration

interface LegalDocument {
    id: string
    title: string
    content: string
    province: string
    category: string
    lastUpdated: Date
  }
  
  const mockLegalDocuments: LegalDocument[] = [
    {
      id: "1",
      title: "Ontario Residential Tenancies Act",
      content: "This act sets out the rights and responsibilities of landlords and tenants...",
      province: "Ontario",
      category: "Residential",
      lastUpdated: new Date("2024-01-01"),
    },
    {
      id: "2",
      title: "British Columbia Residential Tenancy Act",
      content: "The Residential Tenancy Act applies to tenancy agreements, rental units...",
      province: "British Columbia",
      category: "Residential",
      lastUpdated: new Date("2024-01-01"),
    },
  ]
  
  export async function getLegalDocuments(province: string): Promise<LegalDocument[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return mockLegalDocuments.filter((doc) => doc.province === province)
  }
  
  export async function searchLegalDocuments(query: string, province: string): Promise<LegalDocument[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return mockLegalDocuments.filter(
      (doc) =>
        doc.province === province &&
        (doc.content.toLowerCase().includes(query.toLowerCase()) ||
          doc.title.toLowerCase().includes(query.toLowerCase())),
    )
  }
  
  