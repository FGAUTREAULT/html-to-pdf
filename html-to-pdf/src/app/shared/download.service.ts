import { Injectable } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';
import { unparse } from 'papaparse';
import { FileExtensionConstants } from '../constants/app.constants';

export interface IPapaObject {
  [key: string]: any;
}

export const MIME_TYPES = {
  csv: 'text/csv;charset=utf-8;',
  pdf: 'application/pdf',
  xml: 'application/xml'
};

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  static isPdf(extension: string) {
    return extension === FileExtensionConstants.APP_FILE_EXTENSION_PDF;
  }

  static parseToCSV(content: IPapaObject): string {
    return unparse(content as any, { delimiter: ',', quotes: true, newline: '\r\n' });
  }

  constructor(
    private readonly fileSaver: FileSaverService,
  ) { }

  downloadFile(content: any, filename: string, extension: string, parse = false) {

    const fullname = [filename, extension].join('.');

    if (extension === FileExtensionConstants.APP_FILE_EXTENSION_CSV && parse) {
      content = DownloadService.parseToCSV(content);
    }

    if (!DownloadService.isPdf(extension)) {
      const blob = new Blob([content], { type: MIME_TYPES[extension] });
      this.fileSaver.save(blob, fullname);
    } else {
      content.save(fullname);
    }
  }

}
