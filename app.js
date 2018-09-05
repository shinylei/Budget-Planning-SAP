var budgetController = (function() {

	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	
	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		}
	}

	return {
		addItem: function(type, des, val) {
			var newItem;
			if (data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}
			
			if (type === 'exp') {
				newItem = new Expense(ID, des, val);
			} else {
				newItem = new Income(ID, des, val);
			}
			data.allItems[type].push(newItem);
			
			return newItem;
		}
	}

})();


var UIController = (function() {

	var DOMstrings = {
		inputType: '.add__type',
		inputDesc: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expenseContainer: '.expenses__list'
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
		},

		addListItem: function(obj, type) {
			var html, newHtml,element;

			//create html string with placeholder text
			if (type == 'inc') {
				element = DOMstrings.incomeContainer;
				html = `<div class="item clearfix" id="income-%id%">
                <div class="item__description">%description%</div>
                    <div class="right clearfix">
                        	<div class="item__value">%value%</div>
                        	<div class="item__delete">
                        	<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    	</div>
                	</div>
            	</div>`
			} else {
				element = DOMstrings.expenseContainer;
				html = `<div class="item clearfix" id="expense-%id%">
                    <div class="item__description">%description%</div>
                        <div class="right clearfix">
                            <div class="item__value">%value%</div>
                            <div class="item__percentage">21%</div>
                            <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    	</div>
                	</div>
            	</div>`
			}

			//replace the placeholder text with actual data
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);
			
			//insert the html into dom
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
		},

		clearFields: function() {
			var fields, fieldsArr;
			fields = document.querySelectorAll(DOMstrings.inputValue + ',' + DOMstrings.inputDesc)
			
			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach(function(cur, index, array) {
				cur.value = "";
			});
			fieldsArr[0].focus();
		},



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
		var input, newItem;
		//1.get input data
		input = UICtrl.getinput();

		//2.Add the item to the budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);

		//3.Add the item to the UI and clear the fields
		UICtrl.addListItem(newItem, input.type);
		UICtrl.clearFields();

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

