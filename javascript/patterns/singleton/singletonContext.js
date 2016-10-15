
var SingletonContext = (function () {
    var instance;

    function createInstance() {
        var object = new Context();
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
