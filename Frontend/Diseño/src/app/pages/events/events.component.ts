import { Component, OnInit } from '@angular/core';
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { EventService } from "../../core/services/event.service";
import { Event, UpdateEvent } from "../../core/interfaces/event";
import {Bed} from "../../core/interfaces/bed";
import * as moment from "moment";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  page: number = 1;
  items: number = 10;
  registerNumber: number = 0;

  editEvent: Event = null;
  public eventList: Event[] = [];
  keyword: string = "data";

  public formEvent: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    notes: new FormControl(null, [Validators.required]),
  });

  constructor(private _eventService: EventService) { }

  ngOnInit(): void {
    this.onLoadRegisters();
  }
  onLoadRegisters(): void {
    this._eventService
      .getEvents(((this.page - 1) * this.items).toString(), this.items.toString())
      .subscribe((response) => {
        this.registerNumber = response.totalItems;
        this.eventList = response.items;
      });
  }

  onSaveEdit(): void {
    if (this.editEvent == null) {
      this.onCreateEvent();
    } else {
      this.onUpdateEvent();
    }
  }

  onCreateEvent(): void {
    if (this.formEvent.valid) {
      let eventTemp: UpdateEvent = {
        id: null,
        title: this.formEvent.getRawValue().title,
        description: this.formEvent.getRawValue().description,
        date: this.formEvent.getRawValue().date,
        notes: this.formEvent.getRawValue().notes,
      };
      this._eventService.createEvent(eventTemp).subscribe((response) => {
        this.onLoadRegisters();
      });
      this.formEvent.reset();
    } else {
    }
  }

  onUpdateEvent(): void {
    if (this.formEvent.valid) {
      let eventTemp: UpdateEvent = {
        id: this.editEvent.id,
        title: this.formEvent.getRawValue().title,
        description: this.formEvent.getRawValue().description,
        date: this.formEvent.getRawValue().date,
        notes: this.formEvent.getRawValue().notes,
      };
      this._eventService.updateEvent(eventTemp).subscribe((response) => {
        this.onLoadRegisters();
      });
      console.log("eventTemp", eventTemp);
      this.editEvent = null;
      this.formEvent.reset();

    } else {
    }
  }

  onDeleteEvent(id: Number): void {
    this._eventService.deleteEvent(id).subscribe((response) => {
      this.onLoadRegisters();
    });
  }

  onEditEvent(event: Event): void {
    this.formEvent.controls.title.setValue(event.title);
    this.formEvent.controls.description.setValue(event.description);
    this.formEvent.controls.date.setValue(moment(event.date).format("YYYY-MM-DD"));
    this.formEvent.controls.notes.setValue(event.notes);
    this.editEvent = event;
  }

  pageChanged(data: any) {
    this.page = data;
    this.onLoadRegisters();
  }

  selectEvent(item) {
    // console.log("item", item);
  }

  onChangeSearch(val: string) {
    // console.log("val", val);
  }

  onFocused(e) {
    // console.log("e", e);
  }

  openPanel(e): void {}

}
