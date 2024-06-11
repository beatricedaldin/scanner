import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-formats-dialog',
  templateUrl: './formats-dialog.component.html',
  styleUrls: ['./formats-dialog.component.scss'],
})
export class FormatsDialogComponent {
  formatsAvailable = [
    BarcodeFormat.AZTEC,
    BarcodeFormat.CODE_39,
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.ITF,
    BarcodeFormat.QR_CODE,
    BarcodeFormat.PDF_417,
    BarcodeFormat.RSS_14,
  ];

  formatsEnabled: BarcodeFormat[];

  readonly formatNames = [
    'Aztec 2D barcode format.',
    'CODABAR 1D format.',
    'Code 39 1D format.',
    'Code 93 1D format.',
    'Code 128 1D format.',
    'Data Matrix 2D barcode format.',
    'EAN-8 1D format.',
    'EAN-13 1D format.',
    'ITF (Interleaved Two of Five) 1D format.',
    'MaxiCode 2D barcode format.',
    'PDF417 format.',
    'QR Code 2D barcode format.',
    'RSS 14',
    'RSS EXPANDED',
    'UPC-A 1D format.',
    'UPC-E 1D format.',
    'UPC/EAN extension format. Not a stand-alone format.',
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: any,
    private readonly _dialogRef: MatDialogRef<FormatsDialogComponent>
  ) {
    this.formatsEnabled = data.formatsEnabled || [];
  }

  close() {
    this._dialogRef.close(this.formatsEnabled);
  }

  isEnabled(format: BarcodeFormat) {
    return this.formatsEnabled.find((x) => x === format);
  }

  onSelectionChange(event: MatSelectionListChange) {
    this.formatsEnabled = event.source.selectedOptions.selected.map(
      (selected) => selected.value
    );
  }
}
