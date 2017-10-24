/* 
 * This file is part of the current project.
 * 
 * (c) ForeverGlory <http://foreverglory.me/>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
export function json(data) {
  if (data === null) {
    return '{}';
  }
  if (typeof data === 'object') {
    return JSON.stringify(data, null, 2);
  }
  return data;
}

export function resource(path) {
  return browser.extension.getURL(path);
}