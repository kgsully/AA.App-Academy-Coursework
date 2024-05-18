class Test {

    myTest() {
        console.log("this works");
    }

    runMyTest() {
        let that = this;
        const resetCooldown = function() {
            that.myTest();
        }
        setTimeout(resetCooldown, 1000);
    }


}

const test = new Test();
test.runMyTest();
