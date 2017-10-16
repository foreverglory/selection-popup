/* 
 * This file is part of the current project.
 * 
 * (c) ForeverGlory <http://foreverglory.me/>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
function query(word, type) {
  switch (type.methed) {
    case "load":
      return fetch(type.uri.replace("{word}", word)).then((response) => {
        return response.text();
      }).then((html) => {
        var doc = new DOMParser().parseFromString(html, "text/html");
        var result = [];
        doc.querySelectorAll(type.container).forEach((node) => {
          try {
            var item = {
              title: node.querySelector(type.query.title).innerHTML,
              content: node.querySelector(type.query.content).innerHTML
            }
            let link = type.query.link ? node.querySelector(type.query.link) : null;
            if (link && link.nodeName == "A") {
              item.link = link.href;
            }
            let image = type.query.image ? node.querySelector(type.query.image) : null;
            if (image && image.nodeName == "IMG") {
              item.image = image.src;
            }
            let source = type.query.source ? node.querySelector(type.query.source) : null;
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
    case "api":
      break;
    default:
  }
}
export default query;