import { Injectable } from '@angular/core';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { PdfService } from './pdf.service';
import { LoadingService } from '../service/loading.service';

@Injectable({
  providedIn: 'root'
})
export class ZipService {

  constructor(
    private pdfService: PdfService,
    private loadingService: LoadingService
  ) { }

  async zipCertificateFile(content: string[], imageFile: File): Promise<void> {
    let zip = new JSZip();

    for (let i = 0; i < content.length; i++) {
      const pdfData = await this.pdfService.generateCertificatePdf(content[i], content[i], imageFile);
      zip.file(`${content[i]}.pdf`, pdfData);
    }

    zip.generateAsync({type:"blob"}).then((zipContent) => {
      saveAs(zipContent, "certificate.zip");
      this.loadingService.hide();
    });
  }
}
