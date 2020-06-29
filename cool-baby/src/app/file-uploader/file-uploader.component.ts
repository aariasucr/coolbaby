import {Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireStorage} from '@angular/fire/storage';
import Chance from 'chance';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
  @ViewChild('filePicker', {static: false}) filePickerRef: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<string>();
  @Input() owner = '';
  @Input() hidePreview = false;
  uploadTask: firebase.storage.UploadTask;
  fileUrl = '';
  uploadStatus = '';
  tipoArchivo = '';

  constructor(
    private firebaseStorage: AngularFireStorage) {}

  ngOnInit() {}

  onUploadImage() {
    // Forzar un click en el campo input para mostrar el dialogo del S.O. para subir archivos
    this.filePickerRef.nativeElement.click();
    return;
  }

  onFileChosen(event) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];

      this.tipoArchivo = fileList[0].type.split('/').pop();
      const fileName = `products/${this.owner}/${this.generateRandomName()}.${this.tipoArchivo}`;

      const storageRef = this.firebaseStorage.storage.ref();
      this.uploadTask = storageRef.child(fileName).put(file);

      this.uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          this.uploadStatus =
            ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toString() + '%';
        },
        error => {
          console.log(error);
        },
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
            this.uploadStatus = '';
            this.fileUrl = downloadUrl;
            this.imagePick.emit(downloadUrl);
          });
        }
      );
    }
  }

  generateRandomName() {
    const chance = new Chance();
    const text = chance.string({length: 8, casing: 'upper', alpha: true, numeric: true});

    return text;
  }
}
