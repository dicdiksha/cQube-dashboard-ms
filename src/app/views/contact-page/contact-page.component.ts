import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

 url:string = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.9497659892027!2d77.18913067374815!3d28.54122958822413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1df782972747%3A0x7aaf3441a298471c!2sNational%20Council%20of%20Educational%20Research%20and%20Training!5e0!3m2!1sen!2sin!4v1710402248432!5m2!1sen!2sin';
 urlSafe: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer,) { }

  ngOnInit(): void {
	this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
