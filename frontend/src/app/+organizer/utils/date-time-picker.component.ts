import {
    Component, Input, Output, EventEmitter,
    SimpleChanges, OnChanges, AfterViewChecked,
    ChangeDetectorRef
} from '@angular/core';
import {
    getSeconds, getMinutes, getHours,
    getDate, getMonth, getYear, setSeconds,
    setMinutes, setHours, setDate, setMonth, setYear
} from 'date-fns';
import {
    NgbDateStruct,
    NgbTimeStruct
} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'mwl-utils-date-time-picker',
    template: `
        <form class="form-inline">
            <div class="form-group">
                <div class="input-group">
                    <input
                        readonly
                        class="form-control"
                        [placeholder]="placeholder"
                        name="date"
                        [(ngModel)]="dateStruct"
                        (ngModelChange)="updateDate()"
                        ngbDatepicker
                        #datePicker="ngbDatepicker">
                        <div class="input-group-addon" (click)="datePicker.toggle()" >
                            <i class="fa fa-calendar"></i>
                        </div>
                </div>
            </div>
        </form>
        <ngb-timepicker [(ngModel)]="timeStruct" (ngModelChange)="updateTime()" [meridian]="true"></ngb-timepicker>
    `,
    styles: [`
        .form-inline {
            margin-bottom: 10px;
        }
        .form-inline .form-group {
            width: 100%;
        }
        .form-inline .input-group {
            width: 100%;
        }
    `]
})
export class DateTimePickerComponent implements OnChanges, AfterViewChecked {

    @Input() placeholder: string;

    @Input() date: Date;

    @Output() dateChange: EventEmitter<Date> = new EventEmitter();

    dateStruct: NgbDateStruct;

    timeStruct: NgbTimeStruct;

    // grab reference to zone change detector reference
    constructor(private ref: ChangeDetectorRef) {}

    ngAfterViewChecked() {
        // after the view is checked, trigger a manually re-check of
        // the component tree to properly fill the edit datetime structs.
        // removing this will break the edit feature of the items
        this.ref.detectChanges();
    }

    ngOnChanges(changes: SimpleChanges): void {
                console.log('ahello');
        if (changes['date']) {
                    console.log('hello');
            this.dateStruct = {
                day: getDate(this.date),
                month: getMonth(this.date) + 1,
                year: getYear(this.date)
            };
            this.timeStruct = {
                second: getSeconds(this.date),
                minute: getMinutes(this.date),
                hour: getHours(this.date)
            };
        }
    }

    updateDate(): void {
        const newDate: Date = setYear(setMonth(setDate(this.date, this.dateStruct.day), this.dateStruct.month - 1), this.dateStruct.year);
        this.dateChange.next(newDate);
    }

    updateTime(): void {
        const newDate: Date = setHours(setMinutes(setSeconds(this.date, this.timeStruct.second), this.timeStruct.minute), this.timeStruct.hour);
        this.dateChange.next(newDate);
    }

}