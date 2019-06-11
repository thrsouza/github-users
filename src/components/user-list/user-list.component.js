import { app } from '../../app.module';

import template from './user-list.component.html';
import './user-list.component.scss';

class UserListController {
  static get $inject() {
    return ['$scope', '$element', '$http'];
  }

  constructor($scope, $element, $http) {
    Object.assign(this, {
      $: $element[0],
      $scope,
      $http,
    });

    this.users = [
      {
        login: 'thiagodesouza',
        id: 6491925,
        html_url: 'https://github.com/thiagodesouza',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6491925?v=4',
        url: 'https://api.github.com/users/thiagodesouza',
        name: 'Thiago de Souza',
        bio:
          'Systems Development Analyst who, in his spare time, besides coding, likes to listen good songs, explore new technologies and spend time with his family. ',
      },
      {
        login: 'thiagodesouza',
        id: 6491925,
        html_url: 'https://github.com/thiagodesouza',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6491925?v=4',
        url: 'https://api.github.com/users/thiagodesouza',
        name: 'Thiago de Souza',
        bio:
          'Systems Development Analyst who, in his spare time, besides coding, likes to listen good songs, explore new technologies and spend time with his family. ',
      },
      {
        login: 'thiagodesouza',
        id: 6491925,
        html_url: 'https://github.com/thiagodesouza',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6491925?v=4',
        url: 'https://api.github.com/users/thiagodesouza',
        name: 'Thiago de Souza',
        bio:
          'Systems Development Analyst who, in his spare time, besides coding, likes to listen good songs, explore new technologies and spend time with his family. ',
      },
    ];
  }

  $onInit() {
    if (this.$.hasAttribute('unresolved')) {
      this.$.removeAttribute('unresolved');
    }
  }

  handleAddUser() {
    const userform = this.$.querySelector('user-form');

    if (userform.hasAttribute('hidden')) {
      userform.removeAttribute('hidden');
    }
  }

  handleRemoveUser(user) {
    // eslint-disable-next-line no-console
    console.log(`Remove user: ${user.id}`);
  }
}

class UserList {
  constructor() {
    this.template = template;
    this.controller = UserListController;
  }
}

app.component('userList', new UserList());
