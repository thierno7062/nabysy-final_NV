/* eslint-disable prefer-const */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Observable, Subscription } from 'rxjs';

class Port {
  public id: number;
  public name: string;
  public timeZone: number;
}
class Country {
  public id: number;
  public name: string;
  public flag?: string;
  ports: any;
  // public ports?: Port[];
  public get flagUrl(): string {
    return `https://lipis.github.io/flag-icon-css/flags/4x3/${this.flag}.svg`;
  }
}
@Component({
  selector: 'app-prime',
  templateUrl: './prime.page.html',
  styleUrls: ['./prime.page.scss'],
})
export class PrimePage implements OnInit {
  @ViewChild('portComponent') portComponent: IonicSelectableComponent;
  portForm: FormGroup;
  portNameControl: FormControl;
  portCountryControl: FormControl;
  ports: Port[];
  countries: Country[];
  port: Port;
  portsSubscription: Subscription;

  constructor(public modalCtrl: ModalController) {
    this.ports = [
      { id: 1, name: 'Tokai',timeZone:333333 },
      { id: 2, name: 'Vladivostok',timeZone:77777 },
      { id: 3, name: 'Navlakhi',timeZone:55555 }
    ];
  }

  ngOnInit() {
  }
  toggleItems() {
    this.portComponent.toggleItems(this.portComponent.itemsToConfirm.length ? false : true);

    // Confirm items and close Modal
    // without having the user to click Confirm button.
    // this.portComponent.confirm();
    // this.portComponent.close();
  }

  clear() {
    this.portComponent.clear();
    this.portComponent.close();
  }

  confirm() {
    this.portComponent.confirm();
    this.portComponent.close();
  }

  onAddPort() {
    // Clean form.
    this.portNameControl.reset();
    this.portCountryControl.reset();

    // Copy search text to port name field, so
    // user doesn't have to type again.
    this.portNameControl.setValue(this.portComponent.searchText);

    // Show form.
    this.portComponent.showAddItemTemplate();
  }

  onSavePort(event: {
    component: IonicSelectableComponent;
    item: Port;
  }) {
    // Fill form.
    this.portNameControl.setValue(event.item.name);
    this.portCountryControl.setValue(event.item.timeZone);

    // Show form.
    event.component.showAddItemTemplate();
  }

  addPort() {


    // Add port to storage.
    // this.portService.addPort(port);

    // Add port to the top of list.


    // Clean form.
    this.portNameControl.reset();
    this.portCountryControl.reset();

    // Show list.
    this.portComponent.hideAddItemTemplate();
  }

  savePort(port: Port) {
    // Change port.
    port.name = this.portNameControl.value;
    port.timeZone = this.portCountryControl.value;

    // Show list.
    this.portComponent.hideAddItemTemplate();
  }
  searchPorts(event: {
    component: IonicSelectableComponent;
    text: string;
    }) {
    let text = event.text.trim().toLowerCase();
    event.component.startSearch();

    // Close any running subscription.
    if (this.portsSubscription) {
      this.portsSubscription.unsubscribe();
    }

    if (!text) {
      // Close any running subscription.
      if (this.portsSubscription) {
        this.portsSubscription.unsubscribe();
      }

      event.component.items = [];
      event.component.endSearch();
      return;
    }

  }
}
