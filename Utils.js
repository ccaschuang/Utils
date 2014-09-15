if (typeof (Utils) == 'undefined') {
    Utils = {};
}

    /**
     * Using for check the form are all put the data.
     * Can try this
     * if(Utils.formRequireCheck(formXXX))
     *     form.submit();
     *
     * @param array {selector, type, errorMsg,  defaultValue, customFn}
     * selector: use css selector to get the element
     * type (optional) (if it's "number" than use isNumber to check it)
     *      "number": check that the variable is a number or not.
     *      "hour"  : should be 0~23
     *      "minute": should be 0~59
     *      "customFn"(optional): customized function to check type 
     *
     * errorMsg(optional): will saves the error msg if the format is not valid
     *                     (P.S. if the element is empty, which will show another error message)
     *
     * defaultValue(optional): will put the defaultValue if there's null data or invalid value. //if the data is not match, will use default Value instead
     *                         If you don't want to change the value is value is wront, please use defaultIfEmpty instead
     *
     * defaultIfEmpty(optional)  will put the value if there's null/empty data (but invalid data will not change)
     * 
     * P.S. will show add class "alert" or errorInputClass to each input column... so you can use the css to that
     * @param params (optional)  is using to set up something that we really need to do
     *     we can 1: put the error function here
     *     params.errorFn(errors)  can put the error msg here so that 
     *     params.errorInputClass  can put the class inside the 
     * Trying to remove the return value to function call so that we can use it.
     * 
     *  typeFunction Example:
     *  typeFunction = function(value){
     *     if(value.equals...)
     *         return true;
     *     return false;
     *  }
     *  
     */
    Utils.formRequireCheck = function(array, params){

        if(typeof $j !=='undefined'){
            $ = $j;
        }
        var currentElem;
        var value;
        var oErrors="";
        var customFn;
        var firstErrorElem;
        var allTrue= true;
        var elem;

        var oSetting = new Object();
        var oParams = new Object();
        //load the settings
        for (var attName in Utils._dParam) {
            oParams[attName] = (params && params[attName] && typeof params[attName] === typeof Utils._dParam[attName]) ? params[attName]: Utils._dParam[attName];
        }

        for(var key in array) {
            elem = array[key];
            //load the settings
            for (var attName in Utils._dSetting) {
                oSetting[attName] = elem[attName];
            }

            //Setting for the name want to show
            if(!oSetting.name){
                oSetting.name = oSetting.selector;
            }

            $( oSetting.selector ).each(function( index ) {
                currentElem = $(this);
                checkField(currentElem);
            });
        }

        //finish the form check, return the result and show error 
        if(allTrue){
            return true;
        }else{
            oParams.errorFn(oErrors, firstErrorElem);
        }

        //inner function
        //Check the currentElem is match for the type or not
        function checkField(currentElem){
            value = currentElem.val();
            currentElem.removeClass(oParams.errorInputCssClass);
            if(!value){
                //check if it's empty
                handleEmtpyValue(oSetting.name +" is empty.\n");
            }else{
                if(oSetting.type ==="number"){
                    numberCheck(value, oSetting.name);
                }else if(oSetting.type ==="hour"){
                    hourCheck(value, oSetting.name);
                }else if(oSetting.type ==="minute"){
                    minuteCheck(value, oSetting.name);
                }else if(oSetting.type ==="customFn"){
                    customCheck(value, oSetting.name);
                }
            }

        }
        /*inner function*/
        /**
         * defaultMsg: will use if the oSetting.errorMsg is not exist.
         */
        function handleEmtpyValue(defaultMsg){
            if(oSetting.defaultIfEmpty && !currentElem.val()){
                currentElem.val(oSetting.defaultIfEmpty);
                return;
            }

            //set default value if it exist
            if(oSetting.defaultValue){
                currentElem.val(oSetting.defaultValue);
                return;
            }

            currentElem.addClass(oParams.errorInputCssClass);

            if(!oSetting.errorMsg){
                oSetting.errorMsg= defaultMsg;
            }
            oErrors=oErrors+(oSetting.errorMsg);
            allTrue=false;
            if(!firstErrorElem){
                firstErrorElem = oSetting.selector;
            }
        }
        /* inner function : type check*/
        function numberCheck(value, valueName){
            if(!Utils.isNumber(value) ){
                handleEmtpyValue(valueName +" is not a number.\n");
            }
        };

        function hourCheck(value, valueName){
            if(!Utils.isNumber(value) || !Utils.isInt(value) ){
                handleEmtpyValue(valueName +" is not a Integer.\n");
            }

            var a = parseInt(value);
            if(a<0 || a>23){
                handleEmtpyValue(valueName +" Should be in 0~23.\n");
            };
        };

        function minuteCheck(value, valueName){
            if(!Utils.isNumber(value) || !Utils.isInt(value) ){
                handleEmtpyValue(valueName +" is not a Integer.\n");
            }

            var a = parseInt(value);
            if(a<0 || a>59){
                handleEmtpyValue(valueName +" Should be in 0~59.\n");
            };
        }

        function customCheck(value, valueName){
            if(!oSetting.customFn(value)){
                handleEmtpyValue(valueName +" is not match the type.\n");
            }
        };
    };

    //Form Check Default Settings, do not use
    //default settings
    Utils._dSetting = { 
        errorMsg :      "", // using for show msg if the error occurs
        selector :      null,
        type :          "", //number, minute, hour, customFn (others will only check that filled-in or not )
        name :          "", //shows if no errorMsg, will use the name directly to let the user know wha'ts wrong with that
        customFn:       null, 
        defaultValue:   "",
        defaultIfEmpty: ""
    };
    Utils._dParam = {
        errorInputClass : "alert",
        errorFn : function (errors, elem){  //if the formcheck is not totally match the requirement set ,then it will do this
            alert(errors);
            if(elem)
                      $(document).scrollTop($(elem).offset().top);
                  }
    };
    
