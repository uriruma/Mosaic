import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daw',
  templateUrl: './daw.component.html',
  styleUrls: ['./daw.component.css']
})
export class DawComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tracks: any[] = [ // Define an empty array to hold the tracks
    { number: 1, name: 'Track 1', duration: '3:25' },
    { number: 2, name: 'Track 2', duration: '2:58' },
    { number: 3, name: 'Track 3', duration: '4:12' },
    { number: 4, name: 'Track 4', duration: '5:01' },
    { number: 5, name: 'Track 5', duration: '2:45' },
    { number: 1, name: 'Track 1', duration: '3:25' },
    { number: 2, name: 'Track 2', duration: '2:58' },
    { number: 3, name: 'Track 3', duration: '4:12' },
    { number: 4, name: 'Track 4', duration: '5:01' },
    { number: 5, name: 'Track 5', duration: '2:45' },
    { number: 1, name: 'Track 1', duration: '3:25' },
    { number: 2, name: 'Track 2', duration: '2:58' },
    { number: 3, name: 'Track 3', duration: '4:12' },
    { number: 4, name: 'Track 4', duration: '5:01' },
    { number: 5, name: 'Track 5', duration: '2:45' },
    { number: 1, name: 'Track 1', duration: '3:25' },
    { number: 2, name: 'Track 2', duration: '2:58' },
    { number: 3, name: 'Track 3', duration: '4:12' },
    { number: 4, name: 'Track 4', duration: '5:01' },
    { number: 5, name: 'Track 5', duration: '2:45' }
  ];

  muteTrack(track: any) {
    // Implement the logic to mute the track
  }

  soloTrack(track: any) {
    // Implement the logic to solo the track
  }

}

