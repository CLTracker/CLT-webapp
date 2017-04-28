import { 
    Component, ChangeDetectionStrategy, style, animate,
    ViewChild, TemplateRef, trigger, transition, ChangeDetectorRef
} from '@angular/core';
import { 
    startOfDay, endOfDay, subDays, addDays,
    endOfMonth, isSameDay, isSameMonth,
    addHours
} from 'date-fns';
import { Auth }     from '../shared';
import { Subject }  from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { 
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent
} from 'angular-calendar';

const colors: any = {
    red: {
        primary: '#ffffff',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#ffffff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#ffffff',
        secondary: '#FDF1BA'
    }
};

@Component({
        selector: 'my-profile-schedule',
        templateUrl: './profile-schedule.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush,
        styleUrls: ['./profile-schedule.component.scss'],
        animations: [
            trigger(
                'enterAnimation', [
                    transition(':enter', [
                        style({transform: 'translateY(100%)', opacity: 0}),
                        animate('500ms', style({transform: 'translateY(0)', opacity: 1}))
                    ]),
                    transition(':leave', [
                        style({transform: 'translateY(0)', opacity: 1}),
                        animate('500ms', style({transform: 'translateY(100%)', opacity: 0}))
                    ])
                ]
            )
        ]
})
export class ProfileScheduleComponent {

    @ViewChild('modalContent') modalContent: TemplateRef<any>;

    view: string = 'week';
    _showEdit: boolean = false;
    viewDate: Date = new Date();

    /**
     * Setter function used for pseudo variable 'showEdit'. When showEdit
     * is used as a lefthand side of an expression, this function will set
     * the internal value accordingly plus additionally manually trigger
     * an Angular digest to render the time table numbers within the edit table.
     */
    set showEdit(val: boolean) {
        this._showEdit = val;

        // may the lord have mercy on my soul. Manually triggering
        // change detection 1000ms afer the view is rendered is
        // a hacky way to overcome this library bug.
        setTimeout(() => {
            this.ref.detectChanges();
        }, 1000);
    }

    /**
     * Getter function for pseudo variable 'showEdit'. When showEdit
     * is used as a righthand side of an expression, this function return
     * the value of the internal show edit variable.
     * @returns boolean value of whether to show table or not
     */
    get showEdit(): boolean {
        return this._showEdit;
    }

    modalData: {
        action: string,
        event: CalendarEvent
    };

    actions: CalendarEventAction[];

    refresh: Subject<any> = new Subject();

    events: CalendarEvent[] = [];
    // events: CalendarEvent[] = [{
    //     start: subDays(startOfDay(new Date()), 1),
    //     end: addDays(new Date(), 1),
    //     title: 'A 3 day event',
    //     color: colors.red,
    //     actions: this.actions
    // }, {
    //     start: startOfDay(new Date()),
    //     title: 'An event with no end date',
    //     color: colors.yellow,
    //     actions: this.actions
    // }, {
    //     start: subDays(endOfMonth(new Date()), 3),
    //     end: addDays(endOfMonth(new Date()), 3),
    //     title: 'A long event that spans 2 months',
    //     color: colors.blue
    // }, {
    //     start: addHours(startOfDay(new Date()), 2),
    //     end: new Date(),
    //     title: 'A draggable and resizable event',
    //     color: colors.yellow,
    //     actions: this.actions,
    //     resizable: {
    //         beforeStart: true,
    //         afterEnd: true
    //     },
    //     draggable: true
    // }];

    activeDayIsOpen: boolean = true;

    constructor(private modal: NgbModal, private ref: ChangeDetectorRef,
        private auth: Auth) {

        this.auth.getScheduleEvents().subscribe(
            result => {
                for(let i of result) {
                    i.start = new Date(i.start);
                    i.end = new Date(i.end);
                }
                
                console.log(result);
                this.events = result;
                this.refresh.next();
            },
            error => {
                console.log('error!', error);
            }
        )
    }

    /**
     * Navigates to the proper day within the schedule view
     * @param {date, events}: Object passed from schedule view when dayClicked
     */
    dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    }

    /**
     * When an event is changed within the schedule, click parameters are sent to
     * this function which forward along information
     */
    eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        this.handleEvent('Dropped or resized', event);
        this.refresh.next();
    }

    handleEvent(action: string, event: CalendarEvent): void {
        this.modalData = {event, action};
        this.modal.open(this.modalContent, {size: 'lg'});
    }

    addEvent(): void {
        this.events.push({
            title: 'New event',
            start: startOfDay(new Date()),
            end: endOfDay(new Date()),
            color: colors.red,
            draggable: true,
            resizable: {
                beforeStart: true,
                afterEnd: true
            }
        });
        this.refresh.next();
    }

}