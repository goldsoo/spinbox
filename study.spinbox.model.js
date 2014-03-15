study.Spinbox.Model = function() {
      this._nValue = this._nDefault; 
}

study.Spinbox.Model.prototype = {
    _nDefault  : 200,
    _nMaxValue : 300,
    _nMinValue : 100,
    increase   : function() {
        this.setValue(this.getValue()+1);
        return this.getValue();
    },
    decrease   : function() {
        this.setValue(this.getValue()-1);
        return this.getValue();
    },
    setValue   : function(nValue) {this._nValue = this._getLimitValue(nValue)},
    getValue   : function() { return this._nValue; },
    _filteringNumber : function(sValue) {
        var regExp = /[^0-9-]/g; 
        if(typeof sValue === "string") {
            sValue = sValue.replace(regExp, "");
            if(sValue === "") {
                sValue = this.getValue();
            }
        }
        return parseInt(sValue, 10);
    },
    _checkMaxValue  : function(nValue) {
        if(nValue > this._nMaxValue) { return false } else { return true }
    },
    _checkMinValue  : function(nValue) {
        if(nValue < this._nMinValue) { return false } else { return true }
    },
    _getLimitValue  : function(nValue) {
        nValue = this._filteringNumber(nValue);
        if(this._checkMinValue(nValue) === false) {nValue = this._nMinValue;} 
        if(this._checkMaxValue(nValue) === false) {nValue = this._nMaxValue;}
        return nValue;
    }
}
/** 접근 지정자(public, private, protected) */
/** int x = 10; */
/**
 * MVC
 * Model : Data
 * View : View <HTML>
 * Controller : VIEW - DATA (Input & Output); <HTML - Model>
 */

/**
 * SpinBox Component 조건
 * 1. 기본값 : 200
 * 2. 최대값 : 300
 * 3. 최소값 : 100
 * 4. Input에 바로 값을 넣을 수 있다.
 * 5. 숫자가 아닌 문자가 들어갔을 경우 문자를 제외한다. (a12b3c9 -> 1239)
 * 6. 최대값과 최소값 이외의 수가 들어갔을 경우, Input에서 Focus-out(Blur)이 발생했을 경우,
 *    그 값을 최대값과 최소값으로 만든다. (1239 -> 300)
 * 7. 버튼을 누르고 있으면, 0.1초에 1씩 숫자가 증가한다
 */
