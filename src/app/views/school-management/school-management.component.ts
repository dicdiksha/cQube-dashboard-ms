import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-school-management',
  templateUrl: './school-management.component.html',
  styleUrls: ['./school-management.component.scss']
})
export class SchoolManagementComponent implements OnInit {
  rbacDetails: any;
  programName: any = 'schoolManagement';
  
  constructor() {    
      
  }

  ngOnInit(): void {
    window.open('https://edomsmizoram.in', '_blank');
  }

  ngAfterViewInit(): void {
   
  }

  
}
