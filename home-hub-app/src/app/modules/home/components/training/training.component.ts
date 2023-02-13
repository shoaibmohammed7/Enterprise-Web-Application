import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  safeURL:any
  videoList:any = []
  videoURL: string='https://www.youtube.com/embed/85zcdexa7kQ'

  constructor(
    private _sanitizer: DomSanitizer
  ) {
    
  }
  
  ngOnInit(): void {
    this.videoList.push({title:"Woodworking Tools Training For Beginners",url:this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/o4ijHIRaGXc')})
    this.videoList.push({title:"Electrical and Plumbing Training",url:this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/cZRTv-xmVWI')})
    this.videoList.push({title:"Home Maintenance Training",url:this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/KALl7iXgBpo')})
  }

}
