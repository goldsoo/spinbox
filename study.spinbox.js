/**
 * Component : 확장성 & 범용성
 * Scope 관리
 */

var study = {}; // study namespace

study.Spinbox = function(sTarget) {
    /**
     * 1. input 찾기
     * 2. Button 생성하기 (increase, decrease)
     * 3. 이벤트 할당
     * 4. input에 값 넣기
     */
    this._oModel = new study.Spinbox.Model();
    this._elTarget = document.getElementById(sTarget);
    this._setValue(this._oModel.getValue());
    this._createBtn();
    this._appendBtn();
    this._attachEvent();
}
study.Spinbox.prototype = {
    /** 단일책임원칙 */
    /** 증가 버튼과 감소 버튼을 생성한다. */
    _createBtn : function() {
        this._elIncreaseBtn = document.createElement("button");             
        this._elDecreaseBtn = document.createElement("button");             
        this._elIncreaseBtn.type = "button";
        this._elDecreaseBtn.type = "button";
        this._elIncreaseBtn.innerHTML = "UP";
        this._elDecreaseBtn.innerHTML = "Down";
    },
    _appendBtn : function() {
        document.body.appendChild(this._elIncreaseBtn);
        document.body.appendChild(this._elDecreaseBtn);
    },
    _attachEvent : function() {
        var _oModel = this._oModel,
            _oSelf = this;

        this._elIncreaseBtn.addEventListener("mousedown", function() {
            this._repeat = setInterval(function() {
                _oSelf._setValue(_oModel.increase.call(_oModel));
            }, 100);
        });
        this._elIncreaseBtn.addEventListener("mouseup", function() {
            clearInterval(this._repeat);
        });
        this._elIncreaseBtn.addEventListener("mouseout", function() {
            clearInterval(this._repeat);
        });

        this._elDecreaseBtn.addEventListener("mousedown", function() {
            this._repeat = setInterval(function() {
                _oSelf._setValue(_oModel.decrease.call(_oModel));
            }, 100);
        });
        this._elDecreaseBtn.addEventListener("mouseup", function() {
            clearInterval(this._repeat);
        });
        this._elDecreaseBtn.addEventListener("mouseout", function() {
            clearInterval(this._repeat);
        });

        this._elTarget.addEventListener("blur", function() {
            _oModel.setValue(this.value);
            _oSelf._setValue(_oModel.getValue.call(_oModel));
        });
    },
    _setValue : function(nValue) {
        this._elTarget.value = nValue;
    }
}
