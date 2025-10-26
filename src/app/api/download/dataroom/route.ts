import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data room content - in a real app, this would generate actual files
    const dataRoomContent = {
      files: [
        {
          name: 'Financial_Statements_2024.xlsx',
          type: 'financial',
          size: '2.3 MB',
          description: 'P&L, Balance Sheet, Cash Flow statements'
        },
        {
          name: 'Business_Overview.pdf',
          type: 'overview',
          size: '1.8 MB',
          description: 'Company summary, metrics, and key highlights'
        },
        {
          name: 'SOPs_Operations_Manual.pdf',
          type: 'operations',
          size: '3.1 MB',
          description: 'Standard Operating Procedures and workflows'
        },
        {
          name: 'Customer_Analysis_Report.pdf',
          type: 'analysis',
          size: '1.2 MB',
          description: 'Customer concentration and retention analysis'
        },
        {
          name: 'Tax_Returns_2022_2023.pdf',
          type: 'compliance',
          size: '4.5 MB',
          description: 'Tax returns and compliance documentation'
        }
      ],
      totalSize: '12.9 MB',
      generatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Data room generated successfully',
      downloadUrl: '/api/download/dataroom/zip', // Mock download URL
      ...dataRoomContent
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate data room' },
      { status: 500 }
    );
  }
}
