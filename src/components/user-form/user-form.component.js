import { app } from '../../app.module';

import template from './user-form.component.html';
import './user-form.component.scss';

class UserFormController {
  static get $inject() {
    return ['$scope', '$element'];
  }

  constructor($scope, $element) {
    Object.assign(this, {
      $: $element[0],
      $scope,
    });
  }
}

class UserForm {
  constructor() {
    this.template = template;
    this.controller = UserFormController;
  }
}

app.component('userForm', new UserForm());
