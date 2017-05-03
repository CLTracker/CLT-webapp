import { TestBed } from '@angular/core/testing';

import { CurrentsolutionsComponent } from './currentsolutions.component';

describe('About Current Solutions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [CurrentsolutionsComponent]});
  });

  it('should ...', () => {
    const fixture = TestBed.createComponent(CurrentsolutionsComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.children[0].textContent).toContain('Current Solutions Works!');
  });

});
