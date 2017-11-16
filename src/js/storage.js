/* 
 * This file is part of the current project.
 * 
 * (c) ForeverGlory <http://foreverglory.me/>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import _ from 'lodash';
import defaultTypes from '../data/types.json';

export default {
  getActivate() {
    return browser.storage.local.get('activate').then((items) => {
      if (_.has(items, 'activate')) {
        return items['activate'];
      } else {
        return {
          key: '0',
          mouse: '1'
        }
      }
    });
  },
  setActivate(activate) {
    return browser.storage.local.set({
      activate: activate
    })
  },
  getTypes() {
    return browser.storage.local.get('types').then((items) => {
      if (_.has(items, 'types')) {
        return items['types'];
      } else {
        return [];
      }
    }).catch(() => {
      return [];
    });
  },
  saveTypes(types) {
    return browser.storage.local.set({
      types: types
    }).then(() => {
//      todo: sync
//      browser.storage.sync.set({
//        types: types
//      });
      return this.getTypes();
    });
  }
};
