// 4. 실행컨텍스트, 클로저 

//4.1 실행컨텍스트

const x = 1;

function foo() {
    const y = 2;

    function bar() {
        const z = 3;
        console.log(x + y + z);
    }
    bar();
}

foo(); // 6



var x = 1;
const y = 2;

function foo(a) {
    var x = 3;
    const y = 4;

    function bar(b) {
        const z = 5;
        console.log(a + b + x + y + z);
    }
    bar(10);
}

foo(20); // ← 호출 직전


//4.2 클로저
const x = 1;

// ①
function outer() {
    const x = 10;
    const inner = function () { console.log(x); }; // ②
    return inner;
}

// outer 함수를 호출하면 중첩 함수 inner를 반환한다.
// 그리고 outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 팝되어 제거된다.
const innerFunc = outer(); // ③
innerFunc(); // ④ 10

function foo() {
    const x = 1;
    const y = 2;

    // 일반적으로 클로저라고 하지 않는다.
    function bar() {
        const z = 3;

        // 상위 스코프의 식별자를 참조하지 않는다.
        console.log(z);
    }

    return bar;
}

const bar = foo();

function foo() {
    const x = 1;

    // 일반적으로 클로저라고 하지 않는다.
    // bar 함수는 클로저였지만 곧바로 소멸한다.
    function bar() {
        // 상위 스코프의 식별자를 참조한다.
        console.log(x);
    }
    bar();
}

foo();


// 4.3 클로저의 활용

// 카운트 상태 변경 함수
const increase = function () {
    // 카운트 상태 변수
    let num = 0;

    // 카운트 상태를 1만큼 증가 시킨다.
    return ++num;
};

// 이전 상태를 유지하지 못한다.
console.log(increase()); // 1
console.log(increase()); // 1
console.log(increase()); // 1


// 카운트 상태 변경 함수
const increase = (function () {
    // 카운트 상태 변수
    let num = 0;

    // 클로저
    return function () {
        // 카운트 상태를 1만큼 증가 시킨다.
        return ++num;
    };
}());

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3

// 상태가 의도치 않게 변경되지 않도록 은닉
// 특정함수에게만 상태 변경을 허용함 


// 다른 예시 

const Counter = (function () {
    // ① 카운트 상태 변수
    let num = 0;

    function Counter() {
        // this.num = 0; // ② 프로퍼티는 public하므로 은닉되지 않는다.
    }

    Counter.prototype.increase = function () {
        return ++num;
    };

    Counter.prototype.decrease = function () {
        return num > 0 ? --num : 0;
    };

    return Counter;
}());

const counter = new Counter();

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2

console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0



// 함수를 반환하는 고차 함수
// 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환한다.
const counter = (function () {
    // 카운트 상태를 유지하기 위한 자유 변수
    let counter = 0;

    // 함수를 인수로 전달받는 클로저를 반환
    return function (aux) {
        // 인수로 전달 받은 보조 함수에 상태 변경을 위임한다.
        counter = aux(counter);
        return counter;
    };
}());

// 보조 함수
function increase(n) {
    return ++n;
}

// 보조 함수
function decrease(n) {
    return --n;
}

// 보조 함수를 전달하여 호출
console.log(counter(increase)); // 1
console.log(counter(increase)); // 2

// 자유 변수를 공유한다.
console.log(counter(decrease)); // 1
console.log(counter(decrease)); // 0

