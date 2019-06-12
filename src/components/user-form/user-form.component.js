import { app } from '../../app.module';

import template from './user-form.component.html';
import './user-form.component.scss';

class UserFormController {
  static get $inject() {
    return ['$scope', '$element', '$http', '$ngRedux'];
  }

  constructor($scope, $element, $http, $ngRedux) {
    Object.assign(this, {
      $: $element[0],
      $scope,
      $http,
      $ngRedux,
    });

    this.__store = $ngRedux.connect(store =>
      Object({
        users: store.users.data,
      }),
    )(this);

    this.open = false;

    this.user = null;
    this.userIsValid = false;
  }

  $onInit() {
    Object.assign(this.$, {
      toggle: this.toggle.bind(this),
    });
  }

  $onDestroy() {
    this.__store();
  }

  toggle() {
    this.open = !this.open;

    if (this.open) {
      this.$.setAttribute('open', '');
    } else {
      this.$.removeAttribute('open');
    }
  }

  clear() {
    this.user = null;
    this.userIsValid = false;
  }

  cancel() {
    if (this.open) {
      this.toggle();
    }
    this.clear();
  }

  save() {
    this.callback({ data: this.user });
    this.cancel();
  }

  _isValidUser() {
    return !!this.user && !this.users.some(item => item.login === this.user.login);
  }

  handleSearchButton() {
    const searchInput = this.$.querySelector('#user-form-content-search-input');
    const searchButton = this.$.querySelector('#user-form-content-search-button');

    if (searchInput.value) {
      searchButton.setAttribute('loading', '');

      this.$http({
        method: 'GET',
        url: `https://api.github.com/users/${searchInput.value}`,
      }).then(
        response => {
          this.user = response.data;

          this.userIsValid =
            !!this.user && !this.users.some(item => item.login === this.user.login);

          this.$.querySelector('#user-form-content-search-input').value = null;
          searchButton.removeAttribute('loading', '');
        },
        err => {
          // eslint-disable-next-line no-console
          console.log(err);
          searchButton.removeAttribute('loading', '');
        },
      );
    }
  }
}

class UserForm {
  constructor() {
    this.template = template;
    this.bindings = {
      callback: '&',
    };
    this.controller = UserFormController;
  }
}

app.component('userForm', new UserForm());
