import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatChipInputHarness, MatChipListboxHarness } from '@angular/material/chips/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { MatChipsModule } from '@angular/material/chips';
import { ENTER } from '@angular/cdk/keycodes';
import { SharedModule } from 'src/app/shared.module';
import { FavoriteService } from 'src/services/favorite.service';

import { TagsComponent } from './tags.component';

const currentTag = 'tag';
const newTag = 'new-tag';
class MockFavoriteService {
  getTags = () => [currentTag];
  addTag = () => [currentTag, newTag]
  removeTag = () => [currentTag];
}

describe('TagsComponent', () => {
  let component: TagsComponent;
  let fixture: ComponentFixture<TagsComponent>;
  let favoriteService;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule
          .withTranslations({})
          .withDefaultLanguage('en'),
        MatChipsModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      declarations: [ TagsComponent ],
      providers: [TagsComponent, { provide: FavoriteService, useClass: MockFavoriteService }]
    })
    .compileComponents();

    component = TestBed.inject(TagsComponent);
    favoriteService = TestBed.inject(FavoriteService);
    fixture = TestBed.createComponent(TagsComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should display loaded tags', async () => {
    const chipList = await loader.getHarness(MatChipListboxHarness);
    const chips = await chipList.getChips();
    expect(chips.length).toEqual(1);
    expect(await chips[0].getText()).toEqual(currentTag)
  });

  it('should add new tag', async () => {
    const chipInput = await loader.getHarness(MatChipInputHarness);
    await chipInput.setValue(newTag);
    await chipInput.sendSeparatorKey(ENTER);
    await chipInput.blur();

    const chipList = await loader.getHarness(MatChipListboxHarness);
    const chips = await chipList.getChips();
    expect(chips.length).toEqual(2);
    expect(await chips[1].getText()).toEqual(newTag)
  });
});
