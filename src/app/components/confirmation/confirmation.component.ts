import { Component, OnInit } from '@angular/core';
import { Observable, filter, take } from 'rxjs';
import { OrderData } from 'src/app/models/order.interface';
import { ProductData } from 'src/app/models/product.interface';
import { DataStoreService } from 'src/app/services/data-store.service';

@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  order! : OrderData;
orderNO : string = '';
cartItems$!: Observable<ProductData[]>;
  constructor(private dataStore: DataStoreService) { }

  ngOnInit(): void {
    this.orderNO = Math.ceil(Math.random()*100000).toString();
    this.order.orderNumber = this.orderNO;
    this.dataStore.cartItems$.pipe(
      filter(x => x.length > 0),
      take(1)
    ).subscribe((item: ProductData[]) => {
      item.forEach(element => {
        this.order.total= + this.order.total +  (element.price.substring(1))
      })
      this.dataStore.addToOrders(this.order);
    })
  }

}
