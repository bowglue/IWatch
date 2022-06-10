import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account-service/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showFiller = false;
  constructor(public accountService: AccountService) { 
    
  }

  ngOnInit() {
  }

}
