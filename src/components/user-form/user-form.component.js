import { app } from '../../app.module';

import template from './user-form.component.html';
import './user-form.component.scss';

class UserFormController {
  static get $inject() {
    return ['$scope', '$element', '$http'];
  }

  constructor($scope, $element, $http) {
    Object.assign(this, {
      $: $element[0],
      $scope,
      $http,
    });

    this.user = null;
  }

  handleSearchButton() {
    const username = this.$.querySelector('#username').value;

    this.$http({
      method: 'GET',
      url: `https://api.github.com/users/${username}`,
    }).then(
      response => {
        this.user = response.data;
      },
      err => {
        // eslint-disable-next-line no-console
        console.log(err);
      },
    );
  }
}

class UserForm {
  constructor() {
    this.template = template;
    this.controller = UserFormController;
  }
}

app.component('userForm', new UserForm());
