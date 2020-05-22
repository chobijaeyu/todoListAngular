import { Component, OnInit } from '@angular/core';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'ws101';

  ngOnInit() {
    ReactiveFormConfig.set({
      "validationMessage":
      {
        "required": "必須です",
        "minLength": "パスワードは最低 8 文字以上必要です。",
        "numeric": "半角数字で入力下さい"
      }
    });
  }
}
