import create from './utils/create.js';
import Key from './Key.js';
import {letters} from './layouts/data.js'

const main = create('main', ['main'], [
    create('h1', ['heading'], 'Virtural Keyboard'),
    create('h3', ['subtitle'], 'created in Windows 10'),
    create('p', ['hint'], 'press <kbd>Ctrl</kbd> + <kbd>Alt</kbd> to change language')]);

 
export default class Keyboard {

  constructor () {
    this.caps = false;
    this.shiftKey = false;
    this.arr = [];
  }

    init(langCode) {
    this.output = create(
      'textarea',
      ['textarea'],
      null,
      main,
      ['placeholder', 'Your text goes here...'],
      ['rows', 50],
      ['cols', 50],
      ['spellcheck', false],
      ['autocorrect', 'off']
    );
    this.container = create('div', ['keyboard'], null, main, ['language', langCode]);
    document.body.prepend(main);
    return this;
  }

  generateLayout() {
    this.keys = [];

    letters.forEach((arr) => {
      let key = new Key(arr[0], arr[1]);
      
      this.keys.push(key.div);
      this.container.append(key.div);
    })


    document.addEventListener('keydown', this.handleEvent);
    document.addEventListener('keyup', this.handleEvent);

    this.keys.forEach(key => {
      key.addEventListener('mousedown', this.handleMouseEvent);
    })

    
  }

  handleMouseEvent = (e) => {
    // const { code, type } = e;


    this.startPosition = this.output.selectionStart;
    this.endPosition = this.output.selectionEnd;
    

    if (e.target.parentElement.innerText.match(/Shift/)) this.shiftKey = !this.shiftKey;


    switch(e.target.parentElement.innerText) {
      case '':
        this.output.value += ' ';
        break;
      case 'Tab':
        this.output.value += '    ';
        break;
      case 'Backspace':
        this.output.value = this.output.value.slice(0, this.output.value.length - 1)
      case 'Del':
        break;
      case '←':
        break;
      case '→':
        break;
      case '↑':
        break;
      case '↓':
        break;
      case 'Shift':
        this.handleShift(e)
        break;
      case 'Shift':
        this.handleShift(e);
        break;
      case 'CapsLock':
        this.handleCaps();
        this.caps = !this.caps;
        break;
      case 'Enter':
        this.output.value += '\n';
        this.arr.push(this.output.value.split('\n'))         
        break
      case 'Win':
        break;
      case 'Alt':
        break;
      case 'Ctrl':
        break;
      default:
        this.output.value +=e.target.parentElement.innerText;
    }

  }
  
  handleEvent = (e) => {

    const { code, type } = e;
    const keyObj = this.keys.find((key) => key.dataset.code === code);
    if (!keyObj) return;
    this.output.focus();

    if (type.match(/keydown|mousedown/)) {

      if (type.match(/key/)) e.preventDefault()


        keyObj.classList.add('active');


        if (code.match(/Control/)) this.ctrlKey = true;
        if (code.match(/Alt/)) this.altKey = true;

        if (code.match(/Control/) && this.altKey) this.switchLanguage();
        if (code.match(/Alt/) && this.ctrlKey) this.switchLanguage();
 
        
        if (code.match(/Shift/)) this.shiftKey = !this.shiftKey;
        
        
        if (this.shiftKey) this.handleShift(e);


        this.startPosition = this.output.selectionStart;
        this.endPosition = this.output.selectionEnd;

        switch(code) {
        case 'Space':
          this.output.value += ' ';
          break;
        case 'Tab':
          this.output.value += '    ';
          break;
        case 'Backspace':
          this.output.value = this.output.value.slice(0, this.output.value.length - 1)
        case 'MetaLeft':
          break;
        case 'AltLeft':
          break;
        case 'AltRight':
          break;
        case 'ControlLeft':
          break;
        case 'ControlRight':
          break;
        case 'Delete':
          this.output.value = this.output.value.slice(0, this.endPosition) + this.output.value.slice(this.endPosition + 1);
          this.output.selectionEnd = this.endPosition;
          break;
        case 'ArrowLeft':
          if (this.output.selectionEnd >= 1) {
            this.output.selectionEnd = this.endPosition - 1;
          } else if (this.output.selectionEnd < 1) {
            return
          }
          break;
        case 'ArrowRight':
          this.output.selectionStart = this.startPosition + 1;
          this.output.selectionEnd = this.endPosition + 1;
          break;
        case 'ArrowUp':
          break;
        case 'ArrowUp':
          break;
        case 'ShiftLeft':
          break;
        case 'ShiftRight':
          break;
        case 'CapsLock':
          this.handleCaps();
          this.caps = !this.caps;
          break;
        case 'Enter':
          this.output.value += '\n';
          this.arr.push(this.output.value.split('\n'))         
          break
        default:
          if (type.match(/mouse/)) {
            console.log('e.target')
          }
          this.output.value += keyObj.innerText;
      }


    } else if (type.match(/keyup|mouseup/)) {


      keyObj.classList.remove('active');

      if (code.match(/Control/)) this.ctrlKey = false;
      if (code.match(/Alt/)) this.altKey = false;      


      if (code.match(/Shift/)) {
        this.shiftKey = false;
        this.handleShift(e)
      }

      this.keys.forEach(key=>{
        if (!this.shiftKey && this.caps) {
          key.childNodes[0].childNodes[0].classList.add('hidden');
          key.childNodes[0].childNodes[1].classList.add('hidden');
          key.childNodes[0].childNodes[2].classList.remove('hidden');
          key.childNodes[0].childNodes[3].classList.add('hidden');
  
          key.childNodes[1].childNodes[0].classList.add('hidden');
          key.childNodes[1].childNodes[1].classList.add('hidden');
          key.childNodes[1].childNodes[2].classList.remove('hidden');
          key.childNodes[1].childNodes[3].classList.add('hidden');
      }
      })
      
     
    }
  };

  switchLanguage() {
    this.keys.forEach(key => {
      const node = key.childNodes;
      node.forEach(el => {
        if (el.classList.contains('hidden')) {
          el.classList.remove('hidden')
        } else if (!el.classList.contains('hidden')) {
          el.classList.add('hidden')
        }

        
      })
    })
  }

  handleShift = (e) => {

    this.keys.forEach((key)=>{

      if (this.shiftKey && !this.caps) {   //!e.repeat && 
        key.childNodes[0].childNodes[0].classList.add('hidden');
        key.childNodes[0].childNodes[1].classList.remove('hidden');
        key.childNodes[0].childNodes[2].classList.add('hidden');

        key.childNodes[1].childNodes[0].classList.add('hidden');
        key.childNodes[1].childNodes[1].classList.remove('hidden');
        key.childNodes[1].childNodes[2].classList.add('hidden');
      } else if (!this.shiftKey && !this.caps) {
        key.childNodes[0].childNodes[0].classList.toggle('hidden');
        key.childNodes[0].childNodes[1].classList.add('hidden');
        key.childNodes[0].childNodes[2].classList.add('hidden');

        key.childNodes[1].childNodes[0].classList.toggle('hidden');
        key.childNodes[1].childNodes[1].classList.add('hidden');
        key.childNodes[1].childNodes[2].classList.add('hidden');
      } else if (this.shiftKey && this.caps) {
        key.childNodes[0].childNodes[0].classList.add('hidden');
        key.childNodes[0].childNodes[1].classList.add('hidden');
        key.childNodes[0].childNodes[2].classList.add('hidden');
        key.childNodes[0].childNodes[3].classList.remove('hidden');

        key.childNodes[1].childNodes[0].classList.add('hidden');
        key.childNodes[1].childNodes[1].classList.add('hidden');
        key.childNodes[1].childNodes[2].classList.add('hidden');
        key.childNodes[1].childNodes[3].classList.remove('hidden');
      }
    })
    
  }

  handleCaps = () => {
    this.keys.forEach((key) => {
      if (!this.caps) {
        key.childNodes[0].childNodes[0].classList.add('hidden');
        key.childNodes[0].childNodes[1].classList.add('hidden');
        key.childNodes[0].childNodes[2].classList.remove('hidden');
  
        key.childNodes[1].childNodes[0].classList.add('hidden');
        key.childNodes[1].childNodes[1].classList.add('hidden');
        key.childNodes[1].childNodes[2].classList.remove('hidden');
        
      } else if (this.caps) {
        key.childNodes[0].childNodes[0].classList.remove('hidden');
        key.childNodes[0].childNodes[1].classList.add('hidden');
        key.childNodes[0].childNodes[2].classList.add('hidden');
  
        key.childNodes[1].childNodes[0].classList.remove('hidden');
        key.childNodes[1].childNodes[1].classList.add('hidden');
        key.childNodes[1].childNodes[2].classList.add('hidden');
      } else if (this.caps && this.shiftKey) {
        key.childNodes[0].childNodes[0].classList.add('hidden');
        key.childNodes[0].childNodes[1].classList.add('hidden');
        key.childNodes[0].childNodes[2].classList.add('hidden');
        key.childNodes[0].childNodes[3].classList.remove('hidden');

        key.childNodes[1].childNodes[0].classList.add('hidden');
        key.childNodes[1].childNodes[1].classList.add('hidden');
        key.childNodes[1].childNodes[2].classList.add('hidden');
        key.childNodes[1].childNodes[3].classList.remove('hidden');
      }
     
   })

}

}
