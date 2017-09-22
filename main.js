var numbers = document.querySelectorAll('.number');
var	operations = document.querySelectorAll('.operation');
var	decimalBtn = document.getElementById('decimal');
var clearBtns = document.querySelectorAll('.clear-btn')
var	resultBtn = document.getElementById('result');
var display = document.getElementById('display');
var MemoryCurrentNumber = 0;
var MemoryNewNumber = false;
var MemoryPendingOperation = '';


for (var i=0; i<numbers.length; i++) { 
	var number = numbers[i];
	number.addEventListener('click', function (e) {
		numberPress(e.target.textContent);
	});
};

for (var i=0; i<operations.length; i++) { 
	var operationBtn = operations[i];
	operationBtn.addEventListener('click', function (e) {
		operation(e.target.textContent);
		console.log (e);
	});
}


for (var i=0; i<clearBtns.length; i++) { 
	var clearBtn = clearBtns[i];
	clearBtn.addEventListener('click', function (e) {
		clear(e.srcElement.id)
	});
};

resultBtn.addEventListener('click', result);

decimalBtn.addEventListener('click', decimal);

/*
console.log(numbers);
console.log(operations);
console.log(decimal);
console.log(ce);
console.log(c);
console.log(result);
*/

function numberPress(number) {
	if (MemoryNewNumber) {
		display.value = number;
		MemoryNewNumber = false;
	} else {
		if (display.value === '0') {
			display.value = number;
		} else {
			display.value += number;
		};	
	};
};

function operation(op) {
	var localOperationMemory = display.value;

	if (MemoryNewNumber && MemoryPendingOperation !== '=') {
		display.value = MemoryCurrentNumber;
	} else {
		MemoryNewNumber = true;
		if (MemoryPendingOperation === '+') {
			MemoryCurrentNumber += parseFloat(localOperationMemory);
		} else if (MemoryPendingOperation === '-') {
			MemoryCurrentNumber -= parseFloat(localOperationMemory);
		} else if (MemoryPendingOperation === '*') {
			MemoryCurrentNumber *= parseFloat(localOperationMemory);
		} else if (MemoryPendingOperation === '/') {
			MemoryCurrentNumber /= parseFloat(localOperationMemory);
		} else {
			MemoryCurrentNumber = parseFloat(localOperationMemory);
		};

		display.value = MemoryCurrentNumber; 
		MemoryPendingOperation = op;
	};
	console.log('Клик по кнопке с операцией ' +  op);
};

function clear(id) {
	if (id === 'ce') {
		display.value = '0';
		MemoryNewNumber = true;
	} else if (id === 'c') {
		display.value = '0';
		MemoryNewNumber = true;
		MemoryCurrentNumber = 0;
		MemoryPendingOperation = '';
	}


	console.log('Клик по кнопке ' + id);
};

function decimal() {
	var localDecimalMemory = display.value;

	if (MemoryNewNumber) {
		localDecimalMemory = '0.';
		MemoryNewNumber = false;		
	} else {
		if (localDecimalMemory.indexOf('.') === -1  ) {
			localDecimalMemory += '.';
		};	
	};

	display.value = localDecimalMemory;

	console.log('Клик по кнопке decimal');
};
