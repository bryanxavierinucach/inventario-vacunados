import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISocial } from 'app/shared/models/social.model';

@Component({
  selector: 'ngx-social-redirect-uri',
  templateUrl: './social-redirect-uri.component.html',
  styleUrls: ['./social-redirect-uri.component.scss'],
})
export class SocialRedirectUriComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    try {
      const data = this.route.snapshot.queryParams;
      const social: ISocial = { code: data.code, sessionState: data.session_state };
      if (social.code && social.sessionState) {
        localStorage.setItem('social', JSON.stringify(social));
        window.close();
      }
    } catch (error) {
      window.close();
    }
  }

}
