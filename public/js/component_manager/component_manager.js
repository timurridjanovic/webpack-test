

console.log("THIS IS COMPONENT MANAGER");

router = "component_manager";

require.ensure([], function(require) {
    var x = require("./public/js/components/component_one/component_one.js");
    console.log("still in component_manager");
    console.log(x);
});

