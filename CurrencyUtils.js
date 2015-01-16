/**
 * Input: 1: Currency (USD, Yen, TWD...etc)
 *        2: format ( 123.456 ...etc integers...etc)
 *        3: dollar (in double)
 * output:  $123456.789   (320.45),  
 *
 * Use: 
 *      CurrencyUtils.format(12345.678);
 * 
 *  Change the precision or change the type
 *      CurrencyUtils.updateSetting({"formatter" : TWFormatter });
 *      CurrencyUtils.updateSetting({"precision" : 2, "formatter":CurrencyUtils.USFormatter });
 *      CurrencyUtils.updateSetting({"precision" : 2, "formatter":CurrencyUtils.TWFormatter, "separateSign": "" });
 *      
 * Write the new format
 * Currency.SGFormatter = function(money){...};
 * CurrencyUtils.updateSetting({"precision" : 4, "separateSign" : "#"});
 * CurrencyUtils.updateSetting({"formatter" : SGFormatter });
 */
if (typeof(CurrencyUtils) == 'undefined') {
    CurrencyUtils = {};
}

(function () {
    /**
     * Add different Country of currency change
     */
    CurrencyUtils.USFormatter = function (money) {
        if (money.indexOf('-') == 0) { //negative
            return "($" + money.substring(1) + ")";
        }
        return "$" + money;
    };
    CurrencyUtils.TWFormatter = function (money) {
        if (money.indexOf('-') == 0) { //negative
            return "-NT$" + money.substring(1) + "";
        }
        return "NT$" + money;
    };
    //TODO: Add other countries here

    CurrencyUtils.setting = {
        "precision": 3,
        "separateSign": ",",
        "formatter": CurrencyUtils.USFormatter
    };

    CurrencyUtils.updateSetting = function (obj) {
        for (var name in obj) {
            if (!obj.hasOwnProperty(name)) {
                continue;
            }
            if (name == "precision") {
                var precision = obj[name];
                if (precision % 1 === 0 && precision > -1) {
                    CurrencyUtils.setting[name] = precision;
                }
            } else {
                CurrencyUtils.setting[name] = obj[name];
            }
        }
    };

    CurrencyUtils.format = function (money, setting) {
        setting = (setting == undefined ? CurrencyUtils.setting : setting);
        var ret = formatMoney(money, setting.precision, setting.separateSign);
        return setting.formatter(ret);
    };

    //http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
    //formatMoney(123456789.12345, 2,  ',')  => 123,456,789.12
    //formatMoney(-123456789.12345, 2, ',')  => -123,456,789.12
    /**
     * formatMoney will change the pure double  to the correct format of the currency (negative + comma and fixed number)
     * (optional) c means precision
     * (optional) t means separate (separate every 3 digits), default is comma (,)
     */
    function formatMoney(money, c, t) {
        var n = money,
            c = isNaN(c = Math.abs(c)) ? 2 : c;
        var d = ".";
        t = t == undefined ? "," : t;
        s = n < 0 ? "-" : "";
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "";
        j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };
})();
