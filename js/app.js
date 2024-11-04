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

    console.log(remaining);
    const progressEl = document.getElementById("calorie-progress");

    remaining <= 0 &&
      (caloriesRemainingEl.parentElement.parentElement.classList.replace(
        "bg-light",
        "bg-danger"
      ),
      progressEl.classList.add("bg-danger")
    )
  }

  _displayCaloriesProgress() {
    const progressEl = document.getElementById("calorie-progress");
    const percentage = (this._totalCalories / this._calorieLimit) * 100;

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

const tracker = new CalorieTracker();

const breakfast = new Meal("breakfast", 400);
const run = new Workout("Morning Run", 300);

const lunch = new Meal("lunch", 1899);

tracker.addMeal(breakfast);
tracker.addWorkout(run);

tracker.addMeal(lunch);
// console.log(tracker._workouts);
