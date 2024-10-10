import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Base64Service {
  constructor(private http: HttpClient) {}

  fromBuffer(buffer: BlobPart): Observable<string> {
    return new Observable((s) => {
      const reader = new FileReader();
      reader.onload = () => s.next(reader.result as string);
      reader.readAsDataURL(new Blob([buffer]));
    });
  }

  toBuffer(base64: string): Observable<ArrayBuffer> {
    return this.http.get(base64, { responseType: 'arraybuffer' });
  }
}
