import create from './utils/create.js';

export default class Key {
  constructor( eng ,  rus ) {
    this.eng = eng;
    this.rus = rus;

    this.eDown = eng.down;
    this.eShift = eng.shift;
    this.eCaps = eng.caps;
    this.eShiftCaps = eng.shiftCaps;
    this.eIsFn = eng.isFn;
    this.eCode = eng.code;

    this.rDown = rus.down;
    this.rShift = rus.shift;
    this.rCaps = rus.caps;
    this.rShiftCaps = rus.shiftCaps;
    this.rIsFn = rus.isFn;
    this.rCode = rus.code;

    this.engCaseDown = create('div', ['caseDown'], this.eDown);
    this.engCaseUp = create('div', ['shift', 'hidden'], this.eShift);
    this.engCaps = create('div', ['caps', 'hidden'], this.eCaps);
    this.engShiftCaps = create('div', ['shiftCaps', 'hidden'], this.eShiftCaps);

    this.rusCaseDown = create('div', ['caseDown'], this.rDown)
    this.rusCaseUp = create('div', ['shift','hidden'], this.rShift)
    this.rusCaps = create('div', ['caps', 'hidden'], this.rCaps);
    this.rusShiftCaps = create('div', ['shiftCaps', 'hidden'], this.rShiftCaps);

    this.eng = create('div', ['eng'], [this.engCaseDown, this.engCaseUp, this.engCaps, this.engShiftCaps]);

    this.rus = create('div', ['rus', 'hidden'], [this.rusCaseDown, this.rusCaseUp, this.rusCaps, this.rusShiftCaps]);

    this.div = create('div', ['key'], [this.eng, this.rus], null, ['code', `${eng.code}`])
    

  }

}
