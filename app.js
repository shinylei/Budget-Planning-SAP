var budgetController = (function() {




})();


var UIController = (function() {

	var DOMstrings = {
		inputType: '.add__type',
		inputDesc: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn'
	};

	return {
		getinput: function() {
			return {
				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.inputDesc).value,
				value: document.querySelector(DOMstrings.inputValue).value,
			}
		},

		getDOMStrings: function() {
			return DOMstrings;
		}
	}


})();



//connect the other two
var controller = (function(budgetCtrl, UICtrl) {
	
	var setupEventListeners = function() {
		var DOM = UICtrl.getDOMStrings();
		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
		document.addEventListener('keypress', function(event) {
			if (event.keyCode === 13) {
				ctrlAddItem();
			}
		});

	}

	var ctrlAddItem = function() {
		//1.get input data
		var input = UICtrl.getinput();

		//2.Add the item to the budget controller

		//3.Add the item to the UI

		//4. Calculate the budget

		//5. Display the budget on the UI
	}

	return {
		init: function() {
			console.log("Application has started!");
			setupEventListeners();
		}
	}

	

})(budgetController, UIController);

controller.init();

