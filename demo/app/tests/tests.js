var JiguangPush = require("nativescript-jiguang-push").JiguangPush;
var jiguangPush = new JiguangPush();

describe("greet function", function() {
    it("exists", function() {
        expect(jiguangPush.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(jiguangPush.greet()).toEqual("Hello, NS");
    });
});