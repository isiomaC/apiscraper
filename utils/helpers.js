
const stringifyCircularReference = (object) => {
    var simpleObject = {};

    for (var prop in object ){
        if (!object.hasOwnProperty(prop)){
            continue;
        }
        if (typeof(object[prop]) == 'object'){
            continue;
        }
        if (typeof(object[prop]) == 'function'){
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject); // returns cleaned up JSON
};

// $.prototype.logHtml = function () {
//     console.log(this.html());
//   };

function eachNode(rootNode, callback) {
    if (!callback) {
      const nodes = [];
      eachNode(rootNode, (node) => {
        nodes.push(node);
      })
      return nodes;
    }
  
    if (callback(rootNode) === false) {
      return false;
    }
  
    if (rootNode.hasChildNodes()) {
      for (const node of rootNode.childNodes) {
        if (eachNode(node, callback) === false) {
          return;
        }
      }
    }
}

module.exports = {
    stringifyCircularReference,
    eachNode
}