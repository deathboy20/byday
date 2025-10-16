// PDF Report Generator for ByDay Platform
// Note: Requires jsPDF and jspdf-autotable packages
// Install with: npm install jspdf jspdf-autotable --legacy-peer-deps

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ReportData {
  generatedAt: string;
  summary: {
    totalUsers?: number;
    totalWorkers?: number;
    totalClients?: number;
    verifiedUsers?: number;
    totalJobs?: number;
    openJobs?: number;
    completedJobs?: number;
    totalApplications?: number;
  };
  users?: any[];
  jobs?: any[];
  applications?: any[];
  clients?: any[];
}

export const generatePDFReport = (
  reportData: ReportData,
  reportType: 'user' | 'client' = 'user'
) => {
  // Create new PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Add ByDay branding header
  doc.setFillColor(59, 130, 246); // Primary blue color
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  // Add logo/title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('ByDay', 15, 20);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Daily Work Marketplace - Ghana', 15, 30);
  
  // Report title
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  const reportTitle = reportType === 'user' ? 'Platform User Report' : 'Client Activity Report';
  doc.text(reportTitle, 15, 55);
  
  // Generated date
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  const generatedDate = new Date(reportData.generatedAt).toLocaleString();
  doc.text(`Generated: ${generatedDate}`, 15, 62);
  
  let yPosition = 75;
  
  // Summary Section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Summary Statistics', 15, yPosition);
  
  yPosition += 10;
  
  // Create summary table
  const summaryData = [];
  if (reportType === 'user') {
    summaryData.push(
      ['Total Users', reportData.summary.totalUsers?.toString() || '0'],
      ['Workers', reportData.summary.totalWorkers?.toString() || '0'],
      ['Clients', reportData.summary.totalClients?.toString() || '0'],
      ['Verified Users', reportData.summary.verifiedUsers?.toString() || '0'],
      ['Total Jobs', reportData.summary.totalJobs?.toString() || '0'],
      ['Open Jobs', reportData.summary.openJobs?.toString() || '0'],
      ['Completed Jobs', reportData.summary.completedJobs?.toString() || '0'],
      ['Total Applications', reportData.summary.totalApplications?.toString() || '0']
    );
  } else {
    summaryData.push(
      ['Total Clients', reportData.summary.totalClients?.toString() || '0'],
      ['Verified Clients', reportData.summary.verifiedUsers?.toString() || '0'],
      ['Jobs Posted', reportData.summary.totalJobs?.toString() || '0'],
      ['Active Jobs', reportData.summary.openJobs?.toString() || '0']
    );
  }
  
  autoTable(doc, {
    startY: yPosition,
    head: [['Metric', 'Value']],
    body: summaryData,
    theme: 'grid',
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
    margin: { left: 15, right: 15 },
  });
  
  // Get the final Y position after the table
  yPosition = (doc as any).lastAutoTable.finalY + 15;
  
  // User/Client Details Section
  if (reportType === 'user' && reportData.users && reportData.users.length > 0) {
    // Add new page if needed
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('User Details', 15, yPosition);
    yPosition += 5;
    
    const userData = reportData.users.slice(0, 50).map(user => [
      user.full_name || 'N/A',
      user.email || 'N/A',
      user.user_type || 'N/A',
      user.verified ? 'Yes' : 'No',
      user.rating?.toFixed(1) || 'N/A',
    ]);
    
    autoTable(doc, {
      startY: yPosition,
      head: [['Name', 'Email', 'Type', 'Verified', 'Rating']],
      body: userData,
      theme: 'striped',
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      styles: {
        fontSize: 8,
        cellPadding: 3,
      },
      columnStyles: {
        1: { cellWidth: 50 },
      },
      margin: { left: 15, right: 15 },
    });
    
    yPosition = (doc as any).lastAutoTable.finalY + 10;
  }
  
  // Jobs Section
  if (reportData.jobs && reportData.jobs.length > 0) {
    // Add new page if needed
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Recent Jobs', 15, yPosition);
    yPosition += 5;
    
    const jobData = reportData.jobs.slice(0, 30).map(job => [
      job.title || 'N/A',
      job.category || 'N/A',
      job.status || 'N/A',
      `GHS ${job.rate_per_day || 0}`,
      new Date(job.created_at).toLocaleDateString(),
    ]);
    
    autoTable(doc, {
      startY: yPosition,
      head: [['Title', 'Category', 'Status', 'Rate', 'Posted']],
      body: jobData,
      theme: 'striped',
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      styles: {
        fontSize: 8,
        cellPadding: 3,
      },
      margin: { left: 15, right: 15 },
    });
  }
  
  // Add footer to all pages
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `ByDay Platform Report - Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }
  
  // Generate filename
  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `byday-${reportType}-report-${dateStr}.pdf`;
  
  // Save the PDF
  doc.save(filename);
  
  return filename;
};

export const generateClientPDFReport = (reportData: ReportData) => {
  return generatePDFReport(reportData, 'client');
};

export const generateUserPDFReport = (reportData: ReportData) => {
  return generatePDFReport(reportData, 'user');
};
