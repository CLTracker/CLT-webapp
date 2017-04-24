import { 
    Component, ChangeDetectionStrategy, style, animate,
    ViewChild, TemplateRef, trigger, transition, ChangeDetectorRef
} from '@angular/core';
import { 
    startOfDay, endOfDay, subDays, addDays,
    endOfMonth, isSameDay, isSameMonth,
    addHours
} from 'date-fns';
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

    set showEdit(val: boolean) {
        this._showEdit = val;
        
        // may the lord have mercy on my soul. Manually triggering
        // change detection 1000ms afer the view is rendered is
        // a hacky way to overcome this library bug.
        setTimeout(() => {
            this.ref.detectChanges();
        }, 1000);
    }

    get showEdit(): boolean {
        return this._showEdit;
    }

    modalData: {
        action: string,
        event: CalendarEvent
    };

    actions: CalendarEventAction[] = [{
        label: '<i class="fa fa-fw fa-pencil"></i>',
        onClick: ({event}: {event: CalendarEvent}): void => {
            this.handleEvent('Edited', event);
        }
    }, {
        label: '<i class="fa fa-fw fa-times"></i>',
        onClick: ({event}: {event: CalendarEvent}): void => {
            this.events = this.events.filter(iEvent => iEvent !== event);
            this.handleEvent('Deleted', event);
        }
    }];

    refresh: Subject<any> = new Subject();

    events: CalendarEvent[] = [{
        start: subDays(startOfDay(new Date()), 1),
        end: addDays(new Date(), 1),
        title: 'A 3 day event',
        color: colors.red,
        actions: this.actions
    }, {
        start: startOfDay(new Date()),
        title: 'An event with no end date',
        color: colors.yellow,
        actions: this.actions
    }, {
        start: subDays(endOfMonth(new Date()), 3),
        end: addDays(endOfMonth(new Date()), 3),
        title: 'A long event that spans 2 months',
        color: colors.blue
    }, {
        start: addHours(startOfDay(new Date()), 2),
        end: new Date(),
        title: 'A draggable and resizable event',
        color: colors.yellow,
        actions: this.actions,
        resizable: {
            beforeStart: true,
            afterEnd: true
        },
        draggable: true
    }];

    activeDayIsOpen: boolean = true;

    constructor(private modal: NgbModal, private ref: ChangeDetectorRef) {
        //console.log(this.events);
    }

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