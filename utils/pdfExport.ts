import jsPDF from 'jspdf';
import { ReflectionEntry } from '../types';

// Utility to detect mobile devices
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (window.innerWidth <= 768 && window.innerHeight <= 1024);
};

// Utility to detect if we're in a WebView
export const isWebView = (): boolean => {
  const userAgent = navigator.userAgent;
  return /wv|WebView/i.test(userAgent) ||
         (window.webkit && window.webkit.messageHandlers) ||
         !window.navigator.standalone;
};

// Utility to check if the Web Share API is supported and has file sharing
export const supportsFileSharing = (): boolean => {
  return !!(navigator.share && navigator.canShare);
};

// Utility to check if clipboard API is available
export const supportsClipboard = (): boolean => {
  return !!(navigator.clipboard && navigator.clipboard.writeText);
};

export interface PDFExportFilters {
  startDate?: Date;
  endDate?: Date;
  onlyPositives?: boolean;
  onlyDrains?: boolean;
}

export class ReflectionPDFExporter {
  private pdf: jsPDF;
  private pageWidth: number;
  private pageHeight: number;
  private margin: number;
  private currentY: number;
  private lineHeight: number;

  constructor() {
    this.pdf = new jsPDF();
    this.pageWidth = this.pdf.internal.pageSize.getWidth();
    this.pageHeight = this.pdf.internal.pageSize.getHeight();
    this.margin = 20;
    this.currentY = this.margin;
    this.lineHeight = 7;
  }

  private addPageIfNeeded(heightNeeded: number): void {
    if (this.currentY + heightNeeded > this.pageHeight - this.margin) {
      this.pdf.addPage();
      this.currentY = this.margin;
    }
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  private formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  private addText(text: string, x: number, fontSize: number = 11, fontWeight: 'normal' | 'bold' = 'normal'): void {
    this.pdf.setFontSize(fontSize);
    this.pdf.setFont('helvetica', fontWeight);
    this.pdf.text(text, x, this.currentY);
  }

  private addWrappedText(text: string, x: number, maxWidth: number, fontSize: number = 11): number {
    this.pdf.setFontSize(fontSize);
    this.pdf.setFont('helvetica', 'normal');

    const lines = this.pdf.splitTextToSize(text, maxWidth);
    let linesAdded = 0;

    for (const line of lines) {
      this.addPageIfNeeded(this.lineHeight);
      this.pdf.text(line, x, this.currentY);
      this.currentY += this.lineHeight;
      linesAdded++;
    }

    return linesAdded;
  }

  private addEntry(entry: ReflectionEntry): void {
    // Add date header
    this.addPageIfNeeded(this.lineHeight * 3);
    this.addText(this.formatDate(entry.date), this.margin, 14, 'bold');
    this.currentY += this.lineHeight * 1.5;

    // Add time if available (though we don't store time currently, keeping for future)
    // this.addText(`Time: ${this.formatTime(entry.date)}`, this.margin, 10);
    // this.currentY += this.lineHeight;

    // Add positive reflection if exists
    if (entry.goodFeeling) {
      this.addPageIfNeeded(this.lineHeight * 2);
      const positiveText = entry.goodFeeling.startsWith('+ ')
        ? entry.goodFeeling
        : `+ ${entry.goodFeeling}`;
      this.addWrappedText(positiveText, this.margin + 10, this.pageWidth - this.margin * 2 - 10);
      this.currentY += this.lineHeight * 0.5;
    }

    // Add negative reflection if exists
    if (entry.drainedEnergy) {
      this.addPageIfNeeded(this.lineHeight * 2);
      const negativeText = entry.drainedEnergy.startsWith('- ')
        ? entry.drainedEnergy
        : `- ${entry.drainedEnergy}`;
      this.addWrappedText(negativeText, this.margin + 10, this.pageWidth - this.margin * 2 - 10);
      this.currentY += this.lineHeight * 0.5;
    }

    // Add spacing between entries
    this.currentY += this.lineHeight;
  }

  public generatePDF(
    reflections: Record<string, ReflectionEntry>,
    filters: PDFExportFilters = {},
    appTitle: string = 'Mood Period Tracker'
  ): Promise<Blob> {
    return new Promise((resolve) => {
      // Reset PDF
      this.pdf = new jsPDF();
      this.currentY = this.margin;

      // Add title
      this.addText(`${appTitle} - Reflection History`, this.margin, 18, 'bold');
      this.currentY += this.lineHeight * 2;

      // Add export date
      this.addText(`Exported on ${new Date().toLocaleDateString()}`, this.margin, 10);
      this.currentY += this.lineHeight * 2;

      // Filter and sort entries
      let filteredEntries = Object.values(reflections);

      // Apply date filters
      if (filters.startDate) {
        filteredEntries = filteredEntries.filter(entry =>
          new Date(entry.date) >= filters.startDate!
        );
      }
      if (filters.endDate) {
        filteredEntries = filteredEntries.filter(entry =>
          new Date(entry.date) <= filters.endDate!
        );
      }

      // Apply content filters
      if (filters.onlyPositives) {
        filteredEntries = filteredEntries.filter(entry => entry.goodFeeling);
      }
      if (filters.onlyDrains) {
        filteredEntries = filteredEntries.filter(entry => entry.drainedEnergy);
      }

      // If both filters are applied but an entry has both, include it
      // The above logic handles this correctly

      // Sort by date (newest first, but we'll reverse for chronological in PDF)
      filteredEntries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      if (filteredEntries.length === 0) {
        this.addText('No reflections found matching your filters.', this.margin, 12);
      } else {
        // Add entry count
        this.addText(`Total entries: ${filteredEntries.length}`, this.margin, 10);
        this.currentY += this.lineHeight * 1.5;

        // Add each entry
        for (const entry of filteredEntries) {
          this.addEntry(entry);
        }
      }

      // Generate blob
      const pdfBlob = this.pdf.output('blob');
      resolve(pdfBlob);
    });
  }

  public downloadPDF(
    reflections: Record<string, ReflectionEntry>,
    filters: PDFExportFilters = {},
    filename: string = 'reflection-history.pdf',
    appTitle?: string
  ): Promise<{ blob: Blob; url: string; filename: string }> {
    return this.generatePDF(reflections, filters, appTitle).then(blob => {
      const url = URL.createObjectURL(blob);
      return { blob, url, filename };
    });
  }

  public async exportPDF(
    reflections: Record<string, ReflectionEntry>,
    filters: PDFExportFilters = {},
    filename: string = 'reflection-history.pdf',
    appTitle?: string
  ): Promise<{ blob: Blob; url: string; filename: string; isMobile: boolean; isWebView: boolean }> {
    const { blob, url, filename: finalFilename } = await this.downloadPDF(reflections, filters, filename, appTitle);

    return {
      blob,
      url,
      filename: finalFilename,
      isMobile: isMobileDevice(),
      isWebView: isWebView()
    };
  }
}

// Singleton instance for easy use
export const reflectionPDFExporter = new ReflectionPDFExporter();