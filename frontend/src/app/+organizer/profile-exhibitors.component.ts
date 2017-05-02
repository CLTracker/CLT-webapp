import { Component, ChangeDetectorRef,
    AfterViewChecked, ViewChild, TemplateRef,
    ChangeDetectionStrategy
    } from '@angular/core';

import { NgbModal, 
    ModalDismissReasons }   from '@ng-bootstrap/ng-bootstrap'

import { Auth } from '../shared';

@Component({
    selector: 'my-profile-exhibitors',
    templateUrl: './profile-exhibitors.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./profile-exhibitors.component.scss']
})
export class ProfileExhibitorsComponent implements AfterViewChecked {

    @ViewChild('modalContent') modalContent: TemplateRef<any>;

    private currentSelected: number;
    private closeResult: String;

    public exhibitors: any;

    constructor(private modalService: NgbModal, private cdRef: ChangeDetectorRef,
        private auth: Auth) {
            this.auth.getExhibitors().subscribe(
                result => {
                    this.exhibitors = result;
                }, error => {
                    console.log(error);
                    alert('Error getting exhibitor list!');
                }
            )
    }

    public addExhibitor(): void {
        this.modalService.open(this.modalContent)
            .result.then(
                (result) => {
                    // if result is not empty, check for email and submit new exhibitor
                    if (result) {
                        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
                        
                        if(!EMAIL_REGEXP.test(result)) {
                            console.log('invalid email detected');
                        } else {
                            let data = {
                                source: this.auth.userProfile.email,
                                email: result
                            }
                            this.auth.addExhibitor(data).subscribe(
                                result => {
                                    this.auth.getExhibitors().subscribe(
                                        result => {
                                            this.exhibitors = result;
                                        }, error => {
                                            console.log(error);
                                            alert('Error getting exhibitor list!');
                                        }
                                    )
                                }, error => {
                                    console.log(error);
                                    alert('Error adding exhibitor!');
                                }
                            )
                        }
                    }
                }, (reason) => {}
            );
        
    }

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }

    private completeUser(user: any) {
        return user.company !== '' && user.name !== '';
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