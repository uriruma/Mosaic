import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  testEndpoint(): void {
    this.http.get('http://localhost:8000/test').subscribe((response) => {
      console.log(response);
    });
  }

  ngOnInit(): void {
    this.testEndpoint();
  }


}


