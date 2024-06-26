import {Component, inject, OnDestroy} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Customer} from "./model/customer";
import {Service} from "./service/service";
import {Subscription, takeUntil, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatButton} from "@angular/material/button";
import {Dialog} from "@angular/cdk/dialog";
import {CustomerComponent} from "./components/customer/customer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  title = 'docker-test';
  customers: Customer[] = [];
  service = inject(Service);
  dialog = inject(Dialog);
  sub: Subscription;

  constructor() {
    this.sub = this.service
      .getAll<Customer>("customers")
      .pipe(
        takeUntilDestroyed(),
        tap(customers => this.customers = customers)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  add() {
    this.dialog
      .open(CustomerComponent)
      .close((res: Customer | undefined) => {
        if (!!res) {
          this.service.save("customers", res).subscribe()
        }
      });
  }

}
