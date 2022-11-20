import DomManager from 'Utilities/dom-manager';
import ButtonManager from 'Utilities/button-manager';
import { format } from 'date-fns'

export default class InputManager {
  static createEditText(editTextID, placeHolderText, labelText = null, required = true) {
    const mLabel = labelText ? DomManager.createNodeContent('label', labelText) : null;
    const mInput = DomManager.createNodeID('input', editTextID);
    mInput.setAttribute('type', 'text');
    mInput.setAttribute('placeholder', placeHolderText);
    mInput.required = required;
    /* Set label when node exists */
    if(mLabel) {
      if(required) {
        DomManager.createAddNode('span', mLabel, 'required', null, '*');
      }
      mLabel.htmlFor = editTextID;
      mInput.setAttribute('name', editTextID);
    }
    return { label: mLabel, input: mInput };
  }

  static createDate(dateID, labelText = null, startFromToday = true, required = true) {
    const mLabel = labelText ? DomManager.createNodeContent('label', labelText) : null;
    const mInput = DomManager.createNodeID('input', dateID);
    mInput.setAttribute('type', 'date');
    mInput.required = required;
    /* Set minimum date */
    if(startFromToday) {
      mInput.setAttribute('min', format(new Date(), 'yyyy-MM-dd'));
    }
    /* Set label when node exists */
    if(mLabel) {
      mLabel.htmlFor = dateID;
      mInput.setAttribute('name', dateID);
    }
    return { label: mLabel, input: mInput };
  }

  static createCheckBox(checkBoxID, labelText = null, cbEvent = undefined, isChecked = false, required = false) {
    const mLabel = labelText ? DomManager.createNodeContent('label', labelText) : null;
    const mInput = DomManager.createNodeID('input', checkBoxID);
    mInput.setAttribute('type', 'checkbox');
    mInput.required = required;
    mInput.checked = isChecked;
    /* Set label when node exists */
    if(mLabel) {
      mLabel.htmlFor = checkBoxID;
      mInput.setAttribute('name', checkBoxID);
    }
    /* Add cb event */
    if(cbEvent) {
      mInput.onclick = cbEvent;
    }
    return { label: mLabel, input: mInput };
  }

  static createButton(btnID, btnText = '', svgIconFileName = null, className = null, 
                              cbEvent = undefined, formItem = null, labelText = null, required = false) {
    const mLabel = labelText ? DomManager.createNodeContent('label', labelText) : null;
    const mInput = ButtonManager.createButton(btnText, svgIconFileName, className, (!formItem ? cbEvent : undefined));
    mInput.setAttribute('type', (!formItem ? 'button' : 'submit'));
    mInput.required = required;
    /* Set onsubmit for submit button */
    if((formItem) && (cbEvent)) {
      formItem.onsubmit = cbEvent;
    }
    /* Set label when node exists */
    if(mLabel) {
      mLabel.htmlFor = btnID;
      mInput.setAttribute('name', btnID);
    }
    return { label: mLabel, input: mInput };
  }

  static createImageButton(btnID, svgIconFileName, className = null, cbEvent = undefined, 
                                    formItem = null, labelText = null, required = false) {
    return InputManager.createButton(btnID, '', svgIconFileName, className, cbEvent, formItem, labelText, required);
  }

  static createTextButton(btnID, btnText, className = null, cbEvent = undefined, 
                                  formItem = null, labelText = null, required = false) {
    return InputManager.createButton(btnID, btnText, null, className, cbEvent, formItem, labelText, required);
  }

  static createSwitchButton(switchID, isRoundSwitch = false, labelText = null, 
                                    cbEvent = undefined, isChecked = false, required = false) {
    const labelSwitch = DomManager.createNode('label', 'switch');
    const checkBox = InputManager.createCheckBox(switchID, labelText, cbEvent, isChecked, required);
    DomManager.addNodeChild(labelSwitch, checkBox.input);      
    DomManager.createAddNode('span', labelSwitch, (isRoundSwitch ? 'slider round' : 'slider'));
    return { label: checkBox.label, input: labelSwitch, checkbox: checkBox.input };
  }

  static createRadio(radioID, value, labelText = null, cbEvent = undefined, isChecked = false, required = false) {
    const mLabel = labelText ? DomManager.createNodeContent('label', labelText) : null;
    const mInput = DomManager.createNodeID('input', radioID);
    mInput.setAttribute('type', 'radio');
    mInput.setAttribute('value', value);
    mInput.required = required;
    mInput.checked = isChecked;
    /* Set label when node exists */
    if(mLabel) {
      mLabel.htmlFor = radioID;
      mInput.setAttribute('name', radioID);
    }
    /* Add cb event */
    if(cbEvent) {
      mInput.onclick = cbEvent;
    }
    return { label: mLabel, input: mInput };
  }

  static createRadioButton(radioID, value, labelText = null, cbEvent = undefined, isChecked = false, required = false) {
    const mLabel = labelText ? DomManager.createNodeContent('label', labelText) : null;
    const radioBtn = DomManager.createNode('div', 'radio-btn');
    const radio = InputManager.createRadio(radioID, value, value, cbEvent, isChecked, required);
    DomManager.addNodeChild(radioBtn, radio.input);  
    DomManager.addNodeChild(radioBtn, radio.label);  
    /* Set label when node exists */
    if(mLabel) {
      mLabel.htmlFor = radioID;
    }
    return { label: mLabel, input: radioBtn, radio: radio.input };
  }

  static createSelect(selectID, values, selectedValue = null, labelText = null, required = false) {
    const mLabel = labelText ? DomManager.createNodeContent('label', labelText) : null;
    const mInput = DomManager.createNodeID('select', selectID);
    mInput.setAttribute('type', 'radio');
    values.forEach(v => {
      const option = DomManager.createNodeContent('option', v);
      option.setAttribute('value', v);
      if(selectedValue && v === selectedValue) {
        option.setAttribute('selected', true);
      }
      DomManager.addNodeChild(mInput, option);
    });
    mInput.required = required;
    mInput.disabled = !(values.length > 1);
    /* Set label when node exists */
    if(mLabel) {
      mLabel.htmlFor = selectID;
      mInput.setAttribute('name', selectID);
    }
    return { label: mLabel, input: mInput };
  }
}
