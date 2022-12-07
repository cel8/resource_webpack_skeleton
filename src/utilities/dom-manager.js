
const imagePath = './images/';

export default class DomManager {
  // Returns true if it is a DOM element
  static #isElement(o) {
    return (
      typeof HTMLElement === "object" ? o instanceof HTMLElement : // DOM2
      o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    );
  }

  static createNode(type, className = null, id = null, content = null, children = null) {
    const elem = document.createElement(type);
    // Add class name or ID
    if(className) elem.className = className;
    if(id) elem.id = id;
    // Add text content
    if(content) elem.textContent = content;
    // Eventually add child or children
    DomManager.addNodeChild(elem, children);
    return elem;
  }

  static createNodeContent(type, content, className = null, id = null) {
    return DomManager.createNode(type, className, id, content, null);
  }

  static createNodeClass(type, className, id = null, content = null) {
    return DomManager.createNode(type, className, id, content, null);
  }

  static createNodeID(type, id, className = null, content = null) {
    return DomManager.createNode(type, className, id, content, null);
  }

  static createNodeImg(imgFileName, alt, className = null, id = null, local = true) {
    const fileFullPath = local ? imagePath + imgFileName : imgFileName; // local path or url
    const node = DomManager.createNode('img', className, id, null, null);
    node.setAttribute('src', fileFullPath);
    node.setAttribute('alt', alt);
    return node;
  }

  static createNodeImgClass(imgFileName, alt, className, id = null, local = true) {
    return DomManager.createNodeImg(imgFileName, alt, className, id, local);
  }

  static createNodeImgID(imgFileName, alt, id, className = null, local = true) {
    return DomManager.createNodeImg(imgFileName, alt, className, id, local);
  }

  static createNodeLink(link, className = null, id = null, content = null, children = null) {
    const node = DomManager.createNode('a', className, id, content, children);
    node.setAttribute('href', link);
    node.setAttribute('target', '_blank');
    return node;
  }

  static addNodeChild(father, children) {
    if(children) {
      if(Array.isArray(children)) { // Contains more than one child in Array
        children.forEach(child => {
          father.appendChild(child);
        });
      } else if(DomManager.#isElement(children)) { // Contains just one child
        father.appendChild(children);
      }
    }
  }

  static createAddNode(type, father, className = null, id = null, content = null, children = null) {
    // Append the new node in father
    const node = DomManager.createNode(type, className, id, content, children);
    father.appendChild(node);
    return node;
  }

  static createAddNodeImg(imgFileName, alt, father, className = null, id = null, local = true) {
    // Append the new node in father
    const node = DomManager.createNodeImg(imgFileName, alt, className, id, local);
    father.appendChild(node);
    return node;
  }

  static updateNodeImgBySelector(imgFileName, father, selector, local = true) {
    const imgNode = father.querySelector(selector);
    const url = local ? imagePath + imgFileName : imgFileName;
    if(imgNode) imgNode.setAttribute('src', url);
  }

  static updateNodeImg(imgFileName, imgNode, local = true) {
    const url = local ? imagePath + imgFileName : imgFileName;
    if(imgNode) imgNode.setAttribute('src', url);
  }

  static removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  static isNodeHide(node) {
    return node.style.display === 'none';
  }

  static toggleDisplayByNode(node, nextDisplay = undefined) {
    if(node) {
      if(node.dataset.prevDisplay === undefined) {
        node.dataset.prevDisplay = nextDisplay || node.style.display;
      }
      const prevDisplay = node.style.display;
      node.style.display = (node.style.display !== 'none') ? 'none' 
                                                          : node.dataset.prevDisplay;
      node.dataset.prevDisplay = prevDisplay;
    }
  }

  static toggleDisplay(nodeName, nextDisplay = undefined) {
    const node = document.querySelector(nodeName);
    DomManager.toggleDisplayByNode(node, nextDisplay);
  }
}
