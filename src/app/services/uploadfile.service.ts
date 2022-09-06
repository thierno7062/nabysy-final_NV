/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ApiUploadResult {
	url: string;
}

export class UploadResult {
	name: string;
	type: string;
	size: number;
	url: string;
  reponse: any;
}

@Injectable({
  providedIn: 'root'
})
export class UploadfileService {
  public InfoUpload: UploadResult;
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }
  public async uploadFile( file: Blob , apiUrl: string): Promise<UploadResult> {
    //console.log(apiUrl);
    //console.log(file);
    this.InfoUpload=new UploadResult();
    this.InfoUpload.name='FichierEnvoyé';
    this.InfoUpload.reponse='' ;
    this.InfoUpload.size=file.size ;
    this.InfoUpload.url=apiUrl ;

		const result = await this.httpClient
			.post<ApiUploadResult>(
				apiUrl,
				file, // Send the File Blob as the POST body.
				{
					// NOTE: Because we are posting a Blob (File is a specialized Blob
					// object) as the POST body, we have to include the Content-Type
					// header. If we don't, the server will try to parse the body as
					// plain text.
					headers: {
						'Content-Type': file.type
					},
					params: {
						clientFilename: 'Fichier',
						mimeType: file.type
					}
				}
			)
			.toPromise().then(data => {
        this.InfoUpload.name='FichierEnvoyé';
        this.InfoUpload.reponse=data ;
        this.InfoUpload.size=file.size ;
        this.InfoUpload.url=apiUrl ;
        },(err)=>{
        console.log(err);
      });

		return this.InfoUpload;

	}

}
