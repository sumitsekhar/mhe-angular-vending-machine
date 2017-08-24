import { Component, OnInit } from '@angular/core';

import { ItemService } from '../item/item.service';
import { BalanceService } from '../balance/balance.service';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
   items: any = [];
   message: String = "";
   constructor( private itemService: ItemService, private balanceService: BalanceService ) {}

  ngOnInit() {
    this.itemService.onItemsRetrieved((data) => {
      this.items=data;
    });
  } 

  dispense() {
    if (!this.checkRemainingUnit()) {
      this.message = "No Inventory Remaining";
    } else if (!this.checkSufficientBalance()) {
      this.message = "Insufficient Balance";
    } else {
      this.itemService.dispenseItem((item) => {
         this.message = "Thank you!!!";
        this.balanceService.deductBalance(item.cost);
      });
    }
  }

  onSelection(item) {
    this.itemService.setSelectedItem(item);
  }

  checkSufficientBalance() {
    return this.itemService.hasSufficientBalance(this.balanceService.getBalance());
  }

  checkRemainingUnit() {
    return this.itemService.hasRemaining();
  }
}
