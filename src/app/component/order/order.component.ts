import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, catchError, concatMap, interval, of } from 'rxjs';
import { MockService } from 'src/app/services/service.service';

type Order = {
  orderNumber: string,
  productionTarget: string,
  productionState: string,
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  orderData: Order | null = null;
  subsciption: Subscription | null = null;

  constructor(private activateRoute: ActivatedRoute, private mockService: MockService) { }

  ngOnInit() {
    this.activateRoute.params.subscribe((param) => {
      if (param['orderId']) {
        this.subsciption = interval(3000).pipe(concatMap(() => this.mockService.getOrderData(param['orderId']).pipe(
          catchError(error => {
            console.error('Error occurred:', error);
            return of(null);
        })
        )))
          .subscribe({
            next: (response: any) => {
              this.orderData = response;
            },
            error: (err) => {
              console.log(err)
            }
          });
      }
    })
  }

  // getOrderDetails(orderId: string) {
  //   this.mockService.getOrderData(orderId).subscribe()
  // }

  ngOnDestroy() {
    this.subsciption?.unsubscribe();
  }
}
