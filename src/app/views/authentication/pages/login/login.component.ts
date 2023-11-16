import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StateCodes, stateNames } from 'src/app/core/config/StateCodes';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import * as config from 'src/assets/config/ui_config.json'
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { CommonService } from 'src/app/core/services/common/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoggedIn: boolean = false;
  loginObj: any;
  NVSK: boolean = true;


  otpForm!: FormGroup;
  passwordForm!: FormGroup
  stateName: any

  wrongOtp: boolean = false;
  public passwordMatch: boolean = false;
  tempSecret: string = '';
  error: boolean = false;
  roletype
  preferences: any;

  userStatus = ''
  qrcode
  adminUserId = '';
  otpUrl

  userName = ''
  errorMsg
  LoginForm = new FormGroup({
    userId: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  tempUserId: any;

  constructor(private router: Router, private formBuilder: FormBuilder, private readonly _authenticationService: AuthenticationService, private _rbacService: RbacService, private _commonService: CommonService) {
    // if (this._authenticationService.isUserLoggedIn()) {
    //   this.router.navigate(['/home']);
    // }
    // this.router.navigate(['/home']);
  }

  async ngOnInit(): Promise<void> {
    let uiConfig = config;
    this.loginObj = uiConfig['loginObj'];
    if (this.loginObj?.title === 'State Vidya Samiksha Kendra' && environment.config === 'NVSK') {
      this.loginObj.title = 'NDEAR Vidya Samiksha Kendra'
    }

    let user = localStorage.getItem('user_roles')?.includes('private_user') ? 'private' : 'public'
    if (user === 'public') {
      localStorage.clear()
    }

    this.isLoggedIn = await this._authenticationService.isUserLoggedIn();

    type userRoles = Array<{ id: number, text: string }>

    if (this.isLoggedIn) {
      this.router.navigate(['/summary-statistics'])
    }

    if (environment.config === 'VSK') {
      this.NVSK = false


      let names: any = stateNames;
      names.every((state: any) => {
        if (state.stateCode == environment.stateCode) {
          this.stateName = state.stateName;
          return false;
        }
        return true;
      });


      // this.passwordForm = this.formBuilder.group({
      //   username: ['', Validators.required],
      //   newPassword: ['', Validators.required],
      //   cnfpass: ['', Validators.required]
      // })

    }
    else {
      this.stateName = 'India'
    }

  }

  onSubmit() {
    if (this.LoginForm.valid) {
      let data = {
        username: this.LoginForm.controls.userId.value,
        password: this.LoginForm.controls.password.value
      }
      this._authenticationService.login(data).subscribe(async (res: any) => {
        const token = res.access_token
        const refreshToken = res.refresh_token
        const programAccess = res.program_access
        const userRoles = res.roles
        const userId = res.userId
        localStorage.setItem('user_id', userId)
        localStorage.setItem('user_roles', JSON.stringify(userRoles))
        localStorage.setItem('program_access', JSON.stringify(programAccess))
        localStorage.setItem('token', token)
        localStorage.setItem('refresh_token', refreshToken)
        // localStorage.setItem('userName', res.username)
        // localStorage.setItem('user_id', res.userId)
        this._authenticationService.startRefreshTokenTimer();
        // this.router.navigate(['/home']);

        let results = await this._commonService.getUserAttributes(userId).toPromise();
        let preferences = results?.['details']
        let selectedRole = preferences?.['selectedRole']
        
        if (preferences && preferences['selectedRole'] && (preferences['selectedRole'] == 1 || Object.keys(preferences).includes(String(selectedRole)))) {
          this.preferences = {
            role: preferences['selectedRole'],
            ...preferences?.[selectedRole]
          }
          this.setStateDetails(preferences?.[selectedRole])
          this.router.navigate(['/summary-statistics']);
        } else {
          this.preferences = { role: environment.config === 'VSK' ? 1 : 0, }
          this.setStateDetails(this.preferences)
          this.router.navigate(['/summary-statistics']);
        }
      },
        err => {
          this.error = true;
        })
    }
    else {
      this.error = true
    }


  }

  setStateDetails(details: any) {
    if (environment.config === 'VSK') {
      let state_id, stateName;
      if (environment.stateCode) {
        state_id = StateCodes.indexOf(environment.stateCode)
        this.preferences['state'] = state_id
        let names: any = stateNames;
        names.every((state: any) => {
          if (state.stateCode == environment.stateCode) {
            stateName = state.stateName;
            return false;
          }
          return true;
        });
      }
      this._rbacService.setRbacDetails({
        ...details,
        ...this.preferences,
        state_name: stateName,
      });
    }
    else {
      this._rbacService.setRbacDetails({
        ...details,
        ...this.preferences
      });
    }
  }



}
