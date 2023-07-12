import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactService } from './contact.service';

describe('ContactService', () => {
  let contactService: ContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService],
    });
    contactService = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(contactService).toBeTruthy();
  });

  it('should return contacts', () => {
    const mockContacts = [
      { id: 1, name: 'John Doe', phone: '1234567890' },
      { id: 2, name: 'Jane Smith', phone: '9876543210' },
    ];

    contactService.getContacts().subscribe((contacts) => {
      expect(contacts).toEqual(mockContacts);
    });

    const req = httpMock.expectOne('https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts');
    expect(req.request.method).toBe('GET');
    req.flush(mockContacts);
  });
});
