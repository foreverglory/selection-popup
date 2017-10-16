/* 
 * This file is part of the current project.
 * 
 * (c) ForeverGlory <http://foreverglory.me/>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import defaultTypes from '../data/types.json';

export default {
  getType(name) {

  },
  getTypes() {
    return browser.storage.local.get("types").then((types) => {
      return defaultTypes.concat(types);
    }).catch(() => {
      return defaultTypes;
    });
  },
  addType(type) {

  },
  updateType(type) {
    return this.getTypes().then((types) => {
      types = Array.from(types, (item) => {
        if (item.id == type.id) {
          item = type;
        }
        return item;
      });
      return this.saveTypes(types);
    });
  },
  delType(name) {

  },
  saveTypes(types) {
    return brower.storage.local.set({
      types: types
    }).then(() => {
      brower.storage.sync.set({
        types: types
      });
    });
  }
};
