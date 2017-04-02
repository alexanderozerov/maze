var svg = getNode('svg');
document.body.appendChild(svg);

function getNode(node, attr) {
  var result = document.createElementNS('http://www.w3.org/2000/svg', node);
  for (var prop in attr) {
    result.setAttributeNS(null, prop, attr[prop]);
  }
  return result;
}
