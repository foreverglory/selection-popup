/* 
 * This file is part of the current project.
 * 
 * (c) ForeverGlory <http://foreverglory.me/>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
function query(word, type) {
  let options = type.options;
  switch (type.methed) {
    case 'load':
      return fetch(type.uri.replace('{word}', word)).then((response) => {
        return response.text();
      }).then((html) => {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var result = [];
        doc.querySelectorAll(options.container).forEach((node) => {
          try {
            var item = {
              title: node.querySelector(options.query.title).innerText,
              content: node.querySelector(options.query.content).innerHTML
            }
            let link = options.query.link ? node.querySelector(options.query.link) : null;
            if (link && link.nodeName == 'A') {
              item.link = link.href;
            }
            let image = options.query.image ? node.querySelector(options.query.image) : null;
            if (image && image.nodeName == 'IMG') {
              item.image = image.src;
            }
            let source = options.query.source ? node.querySelector(options.query.source) : null;
            if (source) {
              item.source = source.innerText;
            }
            result.push(item);
          } catch (error) {
            //some querySelector error, It doesn't matter if you lose an item.
          }
        });
        return result;
      });
      break;
    case 'json':
      return fetch(type.uri.replace('{word}', word)).then((response) => {
        return response.json();
      }).catch((error) => {
        console.log(error);
      });
      break;
    case 'xml':
      //todo: api xml
      break;
    default:
  }
  return 
}
export default query;