import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedSearchCriteria: string = 'firstname'; // Default search criteria
  searchTerm: string = '';
  userForm!: FormGroup;
  // myusers: any;
  myusers: any[] = [];
  filteredUser: any[] = [];
  serachTerm: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.userForm = this.fb.group({
      // _id: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      status: ['active', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getUsers();
  }

  saveUser() {
    console.log("userForm", this.userForm.value);


    if (this.userForm.value._id) {

      this.apiService.updateUser(this.userForm.value._id, this.userForm.value).subscribe((updatedUser) => {
        console.log("updated user", updatedUser);
        this.userForm.reset();
        if (updatedUser) {
          this.getUsers();

        }
      })
    } else {

      this.apiService.createUser(this.userForm.value).subscribe((createUser: any) => {
        console.log("created user", createUser);
        this.userForm.reset();
        this.getUsers();


      })
    }


  }

  getUsers() {
    this.apiService.getUsers().subscribe((users: any) => {
      this.myusers = users;
      console.log("this.users", this.myusers);
      this.setupPaginator();

    })
  }

  setupPaginator() {
    if (this.paginator) {
      this.paginator.length = this.myusers.length;
    }
  }

  editUser(editUsers: any) {
    console.log("editUsers", editUsers);
    this.userForm.patchValue(editUsers);


  }

  confirmDelete(deleteUser: any) {
    this.userForm.patchValue(deleteUser);
    console.log("this.userForm.patchValue(deleteUser);-->", this.userForm.value);


  }

  deleteUser() {
    console.log("this.userForm", this.userForm.value);

    this.apiService.deleteUser(this.userForm.value._id).subscribe(() => {
      console.log("user deleted");
      this.getUsers();

    })
  }

 // your-component.ts

// your-component.ts

// your-component.ts

// your-component.ts

onSearchInput() {
  const searchTermLower = this.searchTerm.toLowerCase();

  // If the search term is empty, show all users
  if (!searchTermLower.trim()) {
    console.log("ifffff");
    this.myusers = [...this.myusers]; // Copy the original array
  } else {
    console.log("else--->");
    this.filteredUser = this.myusers.filter((user) => {
      const fieldValue = user[this.selectedSearchCriteria]?.toLowerCase() || '';
      return fieldValue.includes(searchTermLower);
    });

    // Update the view with the appropriate data
    this.myusers = [...this.filteredUser];
  }
}

// onSearchInput() {
//   if (this.searchTerm.trim() === '') {
//     console.log("ifffff");
    
//     // If the search term is empty, show all users
//     this.filteredUser = [];
//   } else {
//     console.log("else--->");
//     this.filteredUser = this.myusers.filter((user) => {
//       const searchTermLower = this.searchTerm.toLowerCase();
//       const fieldValue = user[this.selectedSearchCriteria].toLowerCase();

//       return fieldValue.includes(searchTermLower);
//     });
//   }

//   // Update the view with the appropriate data
//   this.myusers = this.filteredUser.length > 0 ? this.filteredUser : [...this.myusers];
// }



  

}
