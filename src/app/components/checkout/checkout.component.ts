import { Component, OnInit, Input } from '@angular/core';
import { DataStoreService } from 'src/app/services/data-store.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, take } from 'rxjs';
import { ProductData } from 'src/app/models/product.interface';


@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
 
  totalPrice: string | number = 0;
  form!: FormGroup;
  constructor(private dataStore: DataStoreService) { }

  ngOnInit(): void {
    
    this.dataStore.cartItems$.pipe(
      filter(x => x.length > 0),
      take(1)
    ).subscribe((item: ProductData[]) => {
      item.forEach(element => {
        this.totalPrice = + this.totalPrice + + (element.price.substring(1))
      })
    })
   
        

    this.form = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      address: new FormControl(),
      city: new FormControl(),
      postalCode: new FormControl(),
      country : new FormControl(),
      paymentMethod: new FormControl(),
      cardNumber: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      expiryDate: new FormControl(),
      cvc: new FormControl(),
      cardName: new FormControl()

    })

  }
  submit(){

  }

}
