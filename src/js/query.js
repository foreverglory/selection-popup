/* 
 * This file is part of the current project.
 * 
 * (c) ForeverGlory <http://foreverglory.me/>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import _ from 'lodash';
import URI from 'urijs';

function replaceWord(data, word) {
  switch (typeof data) {
    case 'string':
      data = data.replace('{word}', word);
      break;
    case 'object':
      if (Array.isArray(data)) {
        data = data.map((item) => {
          return replaceWord(item, word);
        });
      } else {
        let newData = {};
        for (let [key, value] of Object.entries(data)) {
          newData[key] = replaceWord(value, word);
        }
        data = newData;
      }
      break;
  }
  return data;
}

function query(word, type) {
  var contentTypes = {
    json: 'application/json',
    jsonp: 'application/jsonp',
    xml: 'text/xml'
  };

  let input = replaceWord(type.request.uri, word);
  let headers = new Headers(replaceWord(type.request.headers, word));
  if (!headers.has('Content-Type') && _.has(contentTypes, type.response.type)) {
    headers.append('Content-Type', contentTypes[type.response.type]);
  }
  let method = type.request.method.toUpperCase();
  let init = {
    method: method,
    headers: headers,
    cache: 'default'
  }
  if (method === 'GET') {
    input = URI(input).addQuery(replaceWord(type.request.data, word)).href();
  } else {
    init.body = JSON.stringify(replaceWord(type.request.data, word))
  }
  let request = new Request(input, init);
  switch (type.response.type) {
    case 'json':
      return fetch(request).then((response) => {
        return response.json();
      }).then((json) => {
        console.debug('response', 'json', json);
        return json;
      });
    case 'xml':
    default:
      return fetch(request).then((response) => {
        return response.text();
      }).then((html) => {
        var mappings = type.response.mappings;
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var result = [];
        doc.querySelectorAll(mappings.container).forEach((node) => {
          try {
            var item = {
              title: node.querySelector(mappings.title).innerText,
              content: node.querySelector(mappings.content).innerHTML
            }
            let link = mappings.link ? node.querySelector(mappings.link) : null;
            if (link && link.nodeName == 'A') {
              item.link = URI(link.href).absoluteTo(input);
            }
            let image = mappings.image ? node.querySelector(mappings.image) : null;
            if (image && image.nodeName == 'IMG') {
              item.image = image.src;
            }
            let source = mappings.source ? node.querySelector(mappings.source) : null;
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
  }
}
export default query;