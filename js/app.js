class CalorieTracker {
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    this._displayTotalCalories();
    this._displayDailyCalorieLimit();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
  //  Public Methods

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calorie;
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calorie;
    this._render();
  }

  //   Private Methods
  _displayDailyCalorieLimit() {
    const dailyCalorieLimitEl = document.getElementById("calories-limit");
    dailyCalorieLimitEl.innerHTML = this._calorieLimit;
  }
  _displayTotalCalories() {
    const totalCaloriesEl = document.getElementById("calories-total");
    totalCaloriesEl.innerHTML = this._totalCalories;
  }
  _displayCaloriesConsumed() {
    const caloriesConsumed = document.getElementById("calories-consumed");

    const consumed = this._meals.reduce(
      (total, meal) => total + meal.calorie,
      0
    );

    caloriesConsumed.innerHTML = consumed;
  }
  _displayCaloriesBurned() {
    const caloriesBurned = document.getElementById("calories-burned");

    const burned = this._workouts.reduce(
      (total, workout) => total + workout.calorie,
      0
    );

    caloriesBurned.innerHTML = burned;
  }
  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.getElementById("calories-remaining");

    const remaining = this._calorieLimit - this._totalCalories;

    caloriesRemainingEl.innerHTML = remaining;

    const progressEl = document.getElementById("calorie-progress");

    if (remaining < 1) {
      caloriesRemainingEl.parentElement.parentElement.classList.replace(
        "bg-light",
        "bg-danger"
      );
      progressEl.classList.add("bg-danger");
    } else {
      caloriesRemainingEl.parentElement.parentElement.classList.replace(
        "bg-danger",
        "bg-light"
      );
      progressEl.classList.replace("bg-danger", "bg-success");
    }
  }

  _displayCaloriesProgress() {
    const progressEl = document.getElementById("calorie-progress");
    let percentage = (this._totalCalories / this._calorieLimit) * 100;

    percentage < 0 && (percentage = 0);

    const progressWidth = Math.min(percentage, 100);

    progressEl.style.width = `${progressWidth}%`;
  }

  _render() {
    this._displayTotalCalories();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

class Meal {
  constructor(name, calorie) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calorie = calorie;
  }
}

class Workout {
  constructor(name, calorie) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calorie = calorie;
  }
}

class App {
  constructor() {
    this._tracker = new CalorieTracker();
    document
      .getElementById("meal-form")
      .addEventListener("submit", this._newItem.bind(this, "meal"));
    document
      .getElementById("workout-form")
      .addEventListener("submit", this._newItem.bind(this, "workout"));
  }

  // _newMeal(e) {
  //   e.preventDefault();

  //   const name = document.getElementById("meal-name");
  //   const calories = document.getElementById("meal-calories");

  //   // validate empty  fields
  //   if (name.value === "" || calories.value === "") {
  //     alert("Please fill all fields");
  //     return;
  //   }
  //   const meal = new Meal(name.value, +calories.value);
  //   this._tracker.addMeal(meal);

  //   name.value = "";
  //   calories.value = "";

  //   // collapse ui after submitting
  //   const collapseMeal = document.getElementById("collapse-meal");
  //   const uiCollapse = new bootstrap.Collapse(collapseMeal, { toggle: true });
  // }

  // _newWorkout(e) {
  //   e.preventDefault();

  //   const name = document.getElementById("workout-name");
  //   const calories = document.getElementById("workout-calories");

  //   // validate empty  fields
  //   if (name.value === "" || calories.value === "") {
  //     alert("Please fill all fields");
  //     return;
  //   }
  //   const workout = new Workout(name.value, +calories.value);
  //   this._tracker.addWorkout(workout);

  //   name.value = "";
  //   calories.value = "";

  //   // collapse ui after submitting
  //   const collapseWorkout = document.getElementById("collapse-workout");
  //   const uiCollapse = new bootstrap.Collapse(collapseWorkout, {
  //     toggle: true,
  //   });
  // }

  /***   REfactor newMeal and newWorkout to one item      Method ***/
  _newItem(type, e) {
    e.preventDefault();

    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);

    // validate empty  fields
    if (name.value === "" || calories.value === "") {
      alert("Please fill all fields");
      return;
    }
    if (type === "workout") {
      const workout = new Workout(name.value, +calories.value);
      this._tracker.addWorkout(workout);
    } else {
      const meal = new Meal(name.value, +calories.value);
      this._tracker.addMeal(meal);
    }

    name.value = "";
    calories.value = "";

    // collapse ui after submitting
    const collapseItem = document.getElementById(`collapse-${type}`);
    const uiCollapse = new bootstrap.Collapse(collapseItem, {
      toggle: true,
    });
  }
}

const app = new App();
