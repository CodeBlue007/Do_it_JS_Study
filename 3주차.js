// 3.스코프, 함수

//3.1 스코프
function add(x, y) {
    // 매개변수는 함수 몸체 내부에서만 참조할 수 있다.
    // 즉, 매개변수의 스코프(유효범위)는 함수 몸체 내부다.
    console.log(x, y); // 2 5
    return x + y;
}

add(2, 5);

// 매개변수는 함수 몸체 내부에서만 참조할 수 있다.
console.log(x, y); // ReferenceError: x is not defined

// 스코프란? => 식별자가 유효한 범위

var var1 = 1; // 코드의 가장 바깥 영역에서 선언한 변수

if (true) {
    var var2 = 2; // 코드 블록 내에서 선언한 변수
    if (true) {
        var var3 = 3; // 중첩된 코드 블록 내에서 선언한 변수
    }
}

function foo() {
    var var4 = 4; // 함수 내에서 선언한 변수

    function bar() {
        var var5 = 5; // 중첩된 함수 내에서 선언한 변수
    }
}

console.log(var1); // 1
console.log(var2); // 2
console.log(var3); // 3
console.log(var4); // ReferenceError: var4 is not defined
console.log(var5); // ReferenceError: var5 is not defined

// 3.2 스코프 체인

var x = 'global';

function foo() {
    var x = 'local';
    console.log(x); // ①
}

foo();

console.log(x); // ②


// 스코프 내에서 var,let 

function foo() {
    var x = 1;
    // var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
    // 아래 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
    var x = 2;
    console.log(x); // 2
}
foo();


function bar() {
    let x = 1;
    // let이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않는다.
    let x = 2; // SyntaxError: Identifier 'x' has already been declared
}
bar();

// 렉시컬 스코프 -> 함수를 어디서 정의했는지에 따라 상위스코프가 정적으로 결정된다.(상위스코프에 대한 참조값이 있음)

var x = 1;

function foo() {
    var x = 10;
    bar();
}

function bar() {
    console.log(x);
}

foo(); // ?
bar(); // ?


// 3.3 함수의 정의방식

// 1.함수 선언문 

function add(x, y) {
    return x + y;
}

// 함수 참조
// console.dir은 console.log와는 달리 함수 객체의 프로퍼티까지 출력한다.
// 단, Node.js 환경에서는 console.log와 같은 결과가 출력된다.
console.dir(add); // ƒ add(x, y)

// 함수 호출
console.log(add(2, 5)); // 7


// 2. 함수 표현식 

// 함수 선언문은 표현식이 아닌 문이므로 변수에 할당할 수 없다.
// 하지만 함수 선언문이 변수에 할당되는 것처럼 보인다.
var add = function add(x, y) {
    return x + y;
};

// 함수 호출
console.log(add(2, 5)); // 7


// 기명 함수 표현식
var add = function foo(x, y) {
    return x + y;
};

// 함수 객체를 가리키는 식별자로 호출
console.log(add(2, 5)); // 7

// 함수 이름으로 호출하면 ReferenceError가 발생한다.
// 함수 이름은 함수 몸체 내부에서만 유효한 식별자다.
console.log(foo(2, 5)); // ReferenceError: foo is not defined


//3. Funciton 생성자 함수 -> 쓸일 없음 (이런게 있구나)

var add = new Function('x', 'y', 'return x + y');

console.log(add(2, 5)); // 7


//4. 화살표함수(ES6) 람다함수 

const add = (x, y) => x + y

console.log(add(2, 5))


// 3.4 함수는 1급 객체다

// 1. 함수는 무명의 리터럴로 생성할 수 있다.
// 2. 함수는 변수에 저장할 수 있다.
// 런타임(할당 단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당된다.
const increase = function (num) {
    return ++num;
};

const decrease = function (num) {
    return --num;
};

// 2. 함수는 객체에 저장할 수 있다.
const auxs = { increase, decrease };

// 3. 함수의 매개변수에게 전달할 수 있다.
// 4. 함수의 반환값으로 사용할 수 있다.
function makeCounter(aux) {
    let num = 0;

    return function () {
        num = aux(num);
        return num;
    };
}

// 3. 함수는 매개변수에게 함수를 전달할 수 있다.
const increaser = makeCounter(auxs.increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

// 3. 함수는 매개변수에게 함수를 전달할 수 있다.
const decreaser = makeCounter(auxs.decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2

// 3.5 함수 호이스팅, 변수 호이스팅 

console.log(add(1, 5))

function add(x, y) {
    return x + y;
}

console.log(addEx(1, 5)) // undefined

var addEx = function add(x, y) {
    return x + y;
};



