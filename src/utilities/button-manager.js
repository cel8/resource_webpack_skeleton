import DomManager from 'Utilities/dom-manager';

export default class ButtonManager {
  static createButton(btnText = '', svgIconFileName = null, className = null, cbEvent = undefined) {
    const btn = DomManager.createNodeClass('button', className || 'navButton');
    // Insert icon when exist
    if(svgIconFileName) {
      DomManager.createAddNodeImg(svgIconFileName, btnText, btn, 'icon');
    }
    // Add text when contains something
    if(btnText.length > 0) {
      DomManager.createAddNode('p', btn, null, null, btnText);
    }
    // Add button event
    btn.onclick = cbEvent;
    return btn;  
  }

  static editButtonText(btn, text = '') {
    const btnText = btn.querySelector('p');
    if(btnText) {
      /* Remove or edit text */
      if(text === '') {
        btnText.remove();
      } else {
        btnText.textContent = text;
      }
    } else if(text.length > 0) { /* Create node */
      DomManager.createAddNode('p', btn, null, null, text);
    }
  }

  static editButtonImage(btn, svgIconFileName = null) {
    const btnText    = btn.querySelector('p');
    const btnImgNode = btn.querySelector('.icon');
    if(btnImgNode) {
      if(!svgIconFileName) {
        btnImgNode.remove();
      } else {
        DomManager.updateNodeImg(svgIconFileName, btnImgNode);
      }
    } else if(svgIconFileName) { // Insert icon when exist
      const altText = btnText ? btnText.textContent : '';
      DomManager.createAddNodeImg(svgIconFileName, altText, btn, 'icon');
    }
  }

  static createImageButton(svgIconFileName, className = null, cbEvent = undefined) {
    return ButtonManager.createButton('', svgIconFileName, className, cbEvent)
  }

  static createTextButton(btnText, className = null, cbEvent = undefined) {
    return ButtonManager.createButton(btnText, null, className, cbEvent)
  }

  static createImageLinkButton(link, svgIconFileName) {
    const node = DomManager.createNodeLink(link, null, null, null, 
      DomManager.createNodeImg(svgIconFileName, 'imageLink', 'icon-link')
    );
    return node;
  }
}
