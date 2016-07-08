// Use
//1: 用chrome 按右鍵 檢查元素
//2: 切換下面的Tab到 "Console" Tab
//3: 到最左下上的地方，有一個 ">" 的地方， 點選一下…這邊可以打指令
//4: 把下面的code copy and paste上去，然後按下enter
//
// (Advanced)
//5: If 跑到一半不想再跑了…請一樣在console裡面輸入clearInterval(scrollInterval); clearInterval(clickInterval);
//6: cancel後又要重跑者：請自行更改 1080 為更高的數字…順便讓它再加上一個大的常數，讓它可以先跑到最下面



// scroll down to the bottom 
var i =1; 
var scrollInterval = setInterval("window.scrollTo(0,(++i) *1080);", 1000); 

// simluate to click the the "older post"
// source: http://stackoverflow.com/questions/6157929/how-to-simulate-mouse-click-using-javascript 
function simulate(element, eventName)
{
    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers)
    {
        if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent)
    {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents')
        {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }
        else
        {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
            options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    }
    else
    {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
}

var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
}



// infinite loop to click 
var clickInterval = setInterval("simulate(document.getElementsByClassName('pam uiBoxLightblue uiMorePagerPrimary')[0], 'click')", 2000); 
//simulate(document.getElementById("node"), "click"); //simulate(document.getElementsByClassName('pam uiBoxLightblue uiMorePagerPrimary')[0], 'click');

