import { Injectable, isDevMode } from '@angular/core';
import jsPDF from 'jspdf';
import { ConfigService } from '../environment/config.service';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(
    private configService: ConfigService
  ) { }

  async generateCertificatePdf(content: string, fileName: string, imageFile: File): Promise<Blob> {
    let width = 2000
    let height = 1414
    let imageUrl = URL.createObjectURL(imageFile);

    let pdf = new jsPDF(
      'l', 
      'px', 
      [width, height]
    );

    pdf.addFileToVFS('THSarabun.ttf', this.configService.getConfigValue('fontPath'));
    pdf.addFont(this.configService.getConfigValue('fontPath'), 'Pridi-Regular', 'normal');
    pdf.setFont('Pridi-Regular');
    pdf.setFontSize(100);
    pdf.setTextColor(54, 77, 101);

    let text = content;
    let textDimensions = pdf.getTextDimensions(text);

    let textX = (width - textDimensions.w) / 2;
    let textY = height / 2 + 15;

    pdf.addImage(imageUrl, 'JPEG', 0, 0, width, height);
    let test = this.thaiText(pdf, text, textX, textY)
    pdf.text(test, textX, textY);

    let pdfData = pdf.output('arraybuffer');
    let pdfBlob = new Blob([pdfData], {type: 'application/pdf'});
    return pdfBlob;
  }

  private thaiText(doc: jsPDF, str: string, x: number, y: number) {
    var sara = ['่','้','๊','๋','์'];
    var pushers = ['ิ','ี','ึ', 'ื', 'ำ', 'ั'];
    var base = '';

    var dim = doc.getTextDimensions(str);
    for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (sara.indexOf(c) < 0) {
            base += c;
        } else {
            var pusher = base.charAt(base.length - 1);
            if (pushers.indexOf(pusher) < 0) {
                if (str.charAt(i+1) != '' && str.charAt(i+1) == "ำ") {
                    var len = doc.getTextWidth(base + "ำ");
                    doc.text(c, x + len - 25, y-(dim.h/4));
                } else {
                    base += c;
                }
            } else {
                var len = doc.getTextWidth(base);
                doc.text(c, x + len + 3, y-(dim.h/4));
            }
        }
    }

    return base
  }
}
