// el - string
// classes - array of strings

export default function create(el, classes, child, parent, ...dataAttr) {
    let element = document.createElement(el);

    element.classList.add(...classes);

    if (child && Array.isArray(child)) {
        child.forEach((childElement) => childElement && element.appendChild(childElement));
      } else if (child && typeof child === 'object') {
        element.appendChild(child);
      } else if (child && typeof child === 'string') {
        element.innerHTML = child;
      }
    
      if (parent) {
        parent.appendChild(element);
      }
    
      if (dataAttr.length) {
        dataAttr.forEach(([attrName, attrValue]) => {
          if (attrValue === '') {
            element.setAttribute(attrName, '');
          }
          if (attrName.match(/value|id|placeholder|cols|rows|autocorrect|spellcheck/)) {
            element.setAttribute(attrName, attrValue);
          } else {
            element.dataset[attrName] = attrValue;
          }
        });
      }
    
    return element;
}