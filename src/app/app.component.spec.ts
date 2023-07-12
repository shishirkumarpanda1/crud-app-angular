import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ContactService } from './contact.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let contactService: ContactService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [ContactService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    contactService = TestBed.inject(ContactService);
    spyOn(contactService, 'getContacts').and.returnValue(of([])); // Mock the getContacts method
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize contacts on ngOnInit', () => {
    component.ngOnInit();
    expect(component.contacts).toEqual([]);
  });

  it('should add a new contact', () => {
    component.newContact = {
      firstName: 'John',
      lastName: 'Doe',
      phone: '1234567890',
    };

    component.addContact();

    expect(component.contacts.length).toBe(1);
    expect(component.newContact).toEqual({
      firstName: '',
      lastName: '',
      phone: '',
    });
  });

  it('should edit a contact', () => {
    const contact = {
      firstName: 'John',
      lastName: 'Doe',
      phone: '1234567890',
    };

    component.editContact(contact, 0);

    expect(component.newContact).toEqual(contact);
    expect(component.updateIndex).toBe(0);
  });

  it('should update a contact', () => {
    component.newContact = {
      firstName: 'John',
      lastName: 'Doe',
      phone: '1234567890',
    };
    component.updateIndex = 0;

    component.updateContact();

    expect(component.contacts[0]).toEqual(component.newContact);
    expect(component.updateIndex).toBeUndefined();
    expect(component.newContact).toEqual({
      firstName: '',
      lastName: '',
      phone: '',
    });
  });

  it('should delete a contact', () => {
    component.contacts = [
      {
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
      },
    ];

    component.deleteContact(0);

    expect(component.contacts.length).toBe(0);
  });
});
