//1. 변수 

// 변수는 하나의 값을 저장하기 위한 수단이다.
var userId = 1;
var userName = 'Lee';

// 객체나 배열 같은 자료구조를 사용하면 여러 개의 값을 하나로 그룹화해서 하나의 값처럼 사용할 수 있다.
var user = { id: 1, name: 'Lee' };

var users = [
    { id: 1, name: 'Lee' },
    { id: 2, name: 'Kim' }
];


var score;  // 변수 선언 -> 여기서 var 키워드는 선언자, score은 식별자라고 한다.
score = 80; // 값의 할당 -> 식별자는 메모리 주소를 담고있으며, 값이 할당되면 80이라는 값이 메모리에 할당된다.

//2. 호이스팅

console.log(score); // undefined -> 자바스크립트 엔진은 런타임이전에 var키워드로 선언된 변수는 선언과 초기화를 동시에 진행

var score;  // ① 변수 선언 -> 선언전에도 변수에 접근 할 수 있다. 
score = 80; // ② 값의 할당

console.log(score); // 80

// 3. var의 문제점

// 3-1. 함수레벨 스코프만 지원(블록레벨스코프 지원 x) , 중복선언가능

var x = 1;

if (true) {
    // x는 전역 변수다. 이미 선언된 전역 변수 x가 있으므로 x 변수는 중복 선언된다.
    // 이는 의도치 않게 변수값이 변경되는 부작용을 발생시킨다.
    var x = 10;
}

console.log(x); // 10


var i = 10;

// for문에서 선언한 i는 전역 변수이다. 이미 선언된 전역 변수 i가 있으므로 중복 선언된다.
for (var i = 0; i < 5; i++) {
    console.log(i); // 0 1 2 3 4
}

// 의도치 않게 i 변수의 값이 변경되었다.
console.log(i); // 5

// 3-2. 변수 호이스팅

// 이 시점에는 변수 호이스팅에 의해 이미 foo 변수가 선언되었다(1. 선언 단계)
// 변수 foo는 undefined로 초기화된다. (2. 초기화 단계)
console.log(foo); // undefined

// 변수에 값을 할당(3. 할당 단계)
foo = 123;

console.log(foo); // 123

// 변수 선언은 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 실행된다.
var foo;


// 4. var을 보완한 let, const

// 4-1. 블록레벨 스코프 지원

let foo = 1; // 전역 변수

{
    let foo = 2; // 지역 변수
    let bar = 3; // 지역 변수
}

console.log(foo); // 1
console.log(bar); // ReferenceError: bar is not defined

// 4.2 선언문 이전에 변수접근 불가능

// 런타임 이전에 선언 단계가 실행된다. 아직 변수가 초기화되지 않았다.
// 초기화 이전의 일시적 사각 지대에서는 변수를 참조할 수 없다.
// TDZ (Temperial Dead Zone) : 스코프의 시작 지점부터 초기화 시작 지점까지 변수를 참조 할 수 없는 구간임.
console.log(foo); // ReferenceError: foo is not defined

let foo; // 변수 선언문에서 초기화 단계가 실행된다.
console.log(foo); // undefined

foo = 1; // 할당문에서 할당 단계가 실행된다.
console.log(foo); // 1


// 객체 -> 참조해서 직접 값을 변경함. 
const person = {
    name: 'Lee'
};

// 객체는 변경 가능한 값이다. 따라서 재할당없이 변경이 가능하다.
person.name = 'Kim';

console.log(person); // {name: "Kim"}