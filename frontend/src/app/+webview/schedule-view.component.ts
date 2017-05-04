import { 
    Component, ChangeDetectionStrategy, style, animate,
    ViewChild, TemplateRef, trigger, transition, ChangeDetectorRef
} from '@angular/core';
import { Http, Response }   from '@angular/http';
import { Observable }       from 'rxjs/Observable';
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
import { ROUTES }           from './api-routes';

@Component({
    selector: 'my-schedule-view',
    templateUrl: './schedule-view.component.html',
    styleUrls: ['./schedule-view.component.scss']
})

export class ScheduleViewComponent {

    view: string = 'day';
    _showEdit: boolean = false;
    viewDate: Date = new Date();

    refresh: Subject<any> = new Subject();

    events: CalendarEvent[] = [];

    activeDayIsOpen: boolean = true;

    constructor(private http: Http) {
        this.http.get(ROUTES.ScheduleInfoUrl).
            map((r: Response) => r.json())
            .subscribe(
                result => {
                    for(let i of result) {
                        i.draggable = false;
                        i.resizable.afterEnd = false;
                        i.resizable.beforeStart = false;
                        i.start = new Date(i.start);
                        i.end = new Date(i.end);
                    }
                    
                    this.events = result;
                    this.refresh.next();
                },
                error => {
                    console.log('Error retreiving schedule...', error);
                }
            );
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
        this.refresh.next();
    }

    handleEvent(action: string, event: CalendarEvent): void {
        // do nothing...
    }
}