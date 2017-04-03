import { Component }     from '@angular/core';

import { NgbModal, 
    ModalDismissReasons }   from '@ng-bootstrap/ng-bootstrap'

@Component({
    selector: 'my-profile-exhibitors',
    templateUrl: './profile-exhibitors.component.html',
    styleUrls: ['./profile-exhibitors.component.scss']
})
export class ProfileExhibitorsComponent {
    private currentSelected: number;
    private closeResult: String;

    public tempData: any = [
        {
            'name': 'Grant Mercer',
            'email': 'gmercer015@gmail.com',
            'company': 'CLTracker',
            'status': 'Complete'
        },
        {
            'name': 'Steven Brookes',
            'email': 'sbrooks@something.com',
            'company': 'CLTracker',
            'status': 'Incomplete'
        }
    ];
    constructor(private modalService: NgbModal) {}

    public addExhibitor(content: any): void {
        this.modalService.open(content).result.then(
            (result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                console.log('exited');
            }
        );
        
    }

    /**
     * Sets this.currentSelected accordingly to activate the hidden
     * info below the clicked row. If the current selection is already
     * equal to index, to set it back to undefined to un-toggle that row
     * @param index Specifies which row was clicked by the user
     */
    public toggleHidden(index: number): void {
        if (this.currentSelected === index) {
            this.currentSelected = undefined;
        } else {
            this.currentSelected = index;
        }
    }

    /**
     * During each rendering cycle, each row will be either hidden or toggled
     * based upon the output of this function.
     * @param index     Specifies which row is being parsed
     * @returns         Boolean of whether the row should remain collapsed
     */
    public isCollapsed(index: number): boolean {
        return !(this.currentSelected === index);
    }
}