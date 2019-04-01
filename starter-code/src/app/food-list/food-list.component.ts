import { Component, OnInit } from '@angular/core';
import foods from '../foods';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  foods: any[] = foods;
  foodName: string;
  foodCalories: number;
  foodImageUrl: string;
  foodQuantity: number;
  inputValue: string;
  quantity: number = foods.length;
  addBtnText: string = 'Add Food'
  showForm: boolean = false;
  showWarning: boolean = false;
  todayList: any[] = [];
  calCounter: number = 0;
  isAnimated = false;


  constructor() { }

  ngOnInit() {
  }

  activateSubmitBtn() {
    console.log('click')
    
  }

  addItem(): void {
    this.showWarning = false;
    if(!this.showForm) {
      setTimeout(()=> this.isAnimated = !this.isAnimated, 1);
      this.showForm = !this.showForm;
      this.addBtnText = 'Submit';
    } else {
      if(this.foodName&&this.foodCalories&&this.foodImageUrl&&this.foodQuantity) {

        this.foods.unshift({name: this.foodName , calories: this.foodCalories, image: this.foodImageUrl, quantity: this.foodQuantity});
        this.foodName = null;
        this.foodCalories = null;
        this.foodImageUrl = null;
        this.foodQuantity = null;
        this.quantity = this.foods.length;
        this.addBtnText = 'Add Food';
        setTimeout(() => this.showForm = !this.showForm, 300)
        this.isAnimated = !this.isAnimated
      }else {
        this.showWarning = !this.showWarning
      }
    }
  }

  handleAddToListBtn(item) {
    let exist: boolean = false;
    if(!this.todayList.length) {
      console.log('no item')
      
      item.timesInList = 1;
      this.todayList.push(item);

    }else {
      this.todayList.forEach(elem => {
        if(item.name === elem.name) {
          exist = true
        }
      });
      if(exist) {
        item.timesInList++
      }else {
        item.timesInList = 1;
        this.todayList.push(item)
      }
    }
    this.calCounter = this.getTotalCalories()
  }

  getTotalCalories() {
    let count: number = 0;
    this.todayList.forEach(item => {
      let totalCal: number = item.calories * item.timesInList;
      count += totalCal;
    })
    return count;
  }

}
