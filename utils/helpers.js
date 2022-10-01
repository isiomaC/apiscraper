const xpath = require('xpath')
const Dom = require('xmldom').DOMParser

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

    let a = JSON.stringify(simpleObject)

    let ab = JSON.parse(a)

    return simpleObject // returns cleaned up JSON
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


const generateSelector = (htmlSource, elementToSearch, text) => {
  
  const tag = elementToSearch ? elementToSearch : "*"

  // let xPathString = `//${elementToSearch ? elementToSearch : all}[contains(text(), '${text}')]`
  let xPathString = `//${tag}[contains(translate(text(), "${text.toUpperCase()}", "${text.toLowerCase()}"), "${text}")]`

  // contains(translate(., 'EST', 'est'), 'test')

  const document = new Dom().parseFromString(htmlSource)

  const nodes = xpath.select(xPathString, document)

  if (nodes.length === 0) {
    return null
  }

  let objReturn = {}

  let index = 1

  let filteredNodes = nodes.filter((n) => n.localName !== "script")

  for (let node of filteredNodes){
    
    // let currentXpath = `//${node.localName}[text()="${node.firstChild.data}"]`

    let currentXpath = `//${node.localName}[text()="${node.firstChild.data}"]`

    let isUnique = confirmUniqueXpath(currentXpath, htmlSource)

    if (isUnique.unique == false ){
      continue;
    }

    let currentResult = {
      node: isUnique.unique ? isUnique.nodes[0] : "unique node not found",
      xpath: isUnique.unique ? currentXpath : "xpath not unique"
    }

    objReturn["elementsFound"] = index

    objReturn["result"] = objReturn.result
        ? [...objReturn.result, currentResult] 
        : [ currentResult ]

    index++
  }

  return objReturn
}

const confirmUniqueXpath = (xPath, htmlSource) => {
  let returnBool = { 
    unique: false, 
    nodesFound: 0, 
    nodes : null
  }

  const document = new Dom().parseFromString(htmlSource)

  const nodes = xpath.select(xPath, document)

  if (nodes.length > 0) {
    if (nodes.length == 1){

      returnBool.unique = true
      returnBool.nodesFound = 1
      returnBool.nodes = [nodes[0].toString()]

    }else{
      returnBool.unique = false
      returnBool.nodesFound = nodes.length
      returnBool.nodes = [...new Set(nodes.map((n)=> n.toString()))]

      if (returnBool.nodes.length == 1){
        returnBool.unique = true
        returnBool.nodesFound = returnBool.nodes.length
      }

    }
  }

  return returnBool
}



module.exports = {
    stringifyCircularReference,
    eachNode,
    generateSelector
}