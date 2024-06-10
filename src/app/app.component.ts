import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent;

  barcodeValue;

  types = [
    "ean",
    "code_128"
  ]

  ngAfterViewInit() {
    this.barcodeScanner.start();
  }

  onValueChanges(result) {
    this.barcodeValue = result.codeResult.code + " - " + result.codeResult.format;
  }

  onStarted(started) {
    console.log(started);
  }
}
