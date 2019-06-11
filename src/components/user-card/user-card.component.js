import { app } from '../../app.module';

import template from './user-card.component.html';
import './user-card.component.scss';

class UserCardController {
  static get $inject() {
    return ['$scope', '$element'];
  }

  constructor($scope, $element) {
    Object.assign(this, {
      $: $element[0],
      $scope,
    });
  }

  $onInit() {}
}

class UserCard {
  constructor() {
    this.bindings = { user: '=' };
    this.template = template;
    this.controller = UserCardController;
  }
}

app.component('userCard', new UserCard());
