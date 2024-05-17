import { Component } from '@angular/core';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent {
  consultas: any[] = [];

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.locationService.getAllQueries().subscribe(response => {
      this.consultas = response.data.slice(-5);

      for (const consulta of this.consultas) {
        this.locationService.getCityName(consulta.city_id).subscribe(cityResponse => {
          consulta.city_name = cityResponse.data.name;
        });

        this.locationService.getCountryName(consulta.country_id).subscribe(countryResponse => {
          consulta.country_name = countryResponse.data.name;
        });
      }
    });
  }
}
