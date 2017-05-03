import { TestBed } from '@angular/core/testing';

import { IndustryComponent } from './industry.component';

describe('About Industry', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [IndustryComponent]});
  });

  it('should ...', () => {
    const fixture = TestBed.createComponent(IndustryComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.children[0].textContent).toContain('Industry Works!');
  });

});
