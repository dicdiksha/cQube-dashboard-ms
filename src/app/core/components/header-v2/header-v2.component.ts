import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import * as Title from '../../../../assets/config/ui_config.json'
import { stateNames } from '../../config/StateCodes';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { RbacService } from '../../services/rbac-service.service';
import { ActivatedRouteSnapshot, Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-header-v2',
  templateUrl: './header-v2.component.html',
  styleUrls: ['./header-v2.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HeaderV2Component implements OnInit {

	stateName: any;
	config: string = environment.config
	NVSK: boolean = true;
  
	faBars = faBars;
	sequence: string[] = ['State', 'District', 'Block', 'Cluster', 'School', 'Grade'];
	drop: boolean = false;
	withinTime: boolean = false;
	dropdown: boolean = false;
	environment = environment;
	title: any;
	rbacDetails: any;
	newData: any;
	hideDiv: boolean = true;
  
	constructor(private router: Router, private _rbacService: RbacService) {
  
	  this.title = Title
  
	}
  
  
	ngOnInit(): void {
	  if (this.config === 'VSK') {
		this.NVSK = false
		let names: any = stateNames;
		names.every((state: any) => {
		  if (state.stateCode == environment.stateCode) {
			this.stateName = state.stateName.toUpperCase();
			return false;
		  }
		  return true;
		});
  
	  }
	  else {
		this.stateName = 'India'
	  }
	  this.router.events.subscribe((event) => {
		this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
		  this.rbacDetails = rbacDetails
		})
  
		let result = {
		  "State": this.rbacDetails?.state_name,
		  "District": this.rbacDetails[this.rbacDetails["district"]],
		  "Block": this.rbacDetails[this.rbacDetails["block"]],
		  "Cluster": this.rbacDetails[this.rbacDetails["cluster"]],
		  "School": this.rbacDetails[this.rbacDetails["school"]],
		  "Grade": this.rbacDetails[this.rbacDetails["grade"]],
		}
		this.newData = result;
		if (event instanceof NavigationStart) {
		  const currentRoute = event.url;
		  if (currentRoute === '/home' || currentRoute === '/rbac') {
			this.hideDiv = true;
		  } else {
			this.hideDiv = false;
		  }
		}
	  });
	  
	}
  
  
	onMouseOver() {
	  this.withinTime = true;
	  this.dropdown = true;
	}
  
	onMouseOut() {
	  this.withinTime = false;
	  setTimeout(() => {
		if (!this.withinTime) {
		  this.dropdown = false;
		}
	  }, 3000)
	}
  

}
