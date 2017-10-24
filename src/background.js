/* 
 * This file is part of the current project.
 * 
 * (c) ForeverGlory <http://foreverglory.me/>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import defaultTypes from './data/types.json';
import storage from './js/storage.js';

function notify(message) {

}
chrome.runtime.onMessage.addListener(notify);

chrome.runtime.onInstalled.addListener((details) => {
  switch (details.reason) {
    case 'install':
    case 'update':
      storage.getTypes().then((types) => {
        if (types.length == 0) {
          storage.saveTypes(defaultTypes);
        }
      });
      break;
    default:
  }
});