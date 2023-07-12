import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  contacts: any[] = [];
  newContact: any = {
    firstName: '',
    lastName: '',
    phone: '',
  };
  updateIndex:any;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getContacts().subscribe(
      (contacts: any[]) => {
        this.contacts = contacts;
      },
      (error) => {
        console.log('Error fetching contacts:', error);
      }
    );
  }

  addContact(): void {
    this.contacts.push(this.newContact)
    this.newContact = {
      firstName: '',
      lastName: '',
      phone: '',
    };
  }

  editContact(contact: any,index:number): void {
    this.newContact = {
      firstName:contact.firstName,
      lastName: contact.lastName,
      phone:  contact.phone,
    };
    this.updateIndex=index;
  }
  updateContact(): void {
    this.contacts.splice(this.updateIndex, 1, this.newContact);
    this.updateIndex=undefined;
    this.newContact = {
      firstName: '',
      lastName: '',
      phone: '',
    }; 
  }

  deleteContact(index:number): void {
      this.contacts.splice(index, 1);
  }
}
