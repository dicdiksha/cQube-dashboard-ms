import { Component, HostListener } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { AppConfig } from './app.config';
import { HttpClient } from '@angular/common/http';
import { PageTrackerService } from './core/services/page-tracker.service';
declare const gtag: Function; // <------------Important: the declartion for gtag is required!
declare var dataLayer: Array<any>;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cQube National';
  loadingDataImg: boolean = false;
  constructor(private titleService: Title,
    private router: Router, private activatedRoute: ActivatedRoute, public config: AppConfig, private http: HttpClient, private pageTrackerService: PageTrackerService) {
    // translate.setDefaultLang('en');
    // translate.use('en');
    /** START : Code to Track Page View using gtag.js */

    // this.http.get('assets/config/globalconfig.json').pipe(
    //   map(data => ({
    //     ...data,
    //     track: environment.google_analytics_tracking_id
    //   }))
    // ).subscribe(async (data) => {
    //   await this.grabTheTrackIds(data)
    // });
    
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe((event: NavigationEnd) => {
    //   gtag('event', 'page_view', {
    //     page_path: event.urlAfterRedirects
    //   })
    // })

    //Add dynamic title for selected pages - Start
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url !== '/login') {
          //this.pageTrackerService.onPageChange(event);
        }
      }
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  // collect that title data properties from all child routes
  getTitle(state, parent) {
    var data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: any): void {

    //Triggered When the navigation starts
    if (event instanceof NavigationStart) {
      this.loadingDataImg = true;
    }
    //Triggered When the navigation ends
    if (event instanceof NavigationEnd) {
      this.loadingDataImg = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loadingDataImg = false;
    }
    //Triggered When the error occurrs while navigation
    if (event instanceof NavigationError) {
      this.loadingDataImg = false;
    }
  }

  async grabTheTrackIds(trackIds) {
    for (const [key, value] of Object.entries(trackIds)) {
      const gaTrackId = value;
      let customGtagScriptEle = document.createElement('script');
      customGtagScriptEle.async = true;
      customGtagScriptEle.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaTrackId;
      document.head.prepend(customGtagScriptEle);
  
      customGtagScriptEle.onload = () => {
        window['gtag'] = function() {
          dataLayer.push(arguments);
        };
        window['dataLayer'] = window['dataLayer'] || [];
        gtag('js', new Date());
        gtag('config', gaTrackId, { send_page_view: false });
      }
    }
  }
  
  @HostListener('window:beforeunload', ['$event'])
  handleUnload(event: Event): void {
    if (this.router.url !== '/login') {
      //this.pageTrackerService.onPageChange(event);
    }
  }
}
