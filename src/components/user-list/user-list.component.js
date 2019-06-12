import { app } from '../../app.module';

import template from './user-list.component.html';
import './user-list.component.scss';

class UserListController {
  static get $inject() {
    return ['$scope', '$element', '$ngRedux'];
  }

  constructor($scope, $element, $ngRedux) {
    Object.assign(this, {
      $: $element[0],
      $scope,
      $ngRedux,
    });

    this.__store = $ngRedux.connect(store =>
      Object({
        users: store.users.data,
      }),
    )(this);
  }

  $onDestroy() {
    this.__store();
  }

  handleAddUser() {
    const userform = this.$.querySelector('user-form');
    if (userform) {
      userform.toggle();
    }
  }

  handleSaveUser(user) {
    this.$ngRedux.dispatch({ type: 'ADD_USER', data: user });
  }

  handleDelete(id) {
    this.$ngRedux.dispatch({ type: 'DELETE_USER', data: { id } });
  }
}

class UserList {
  constructor() {
    this.template = template;
    this.controller = UserListController;
  }
}

app.component('userList', new UserList());
