import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LocationService } from '../../services/location.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-progressform',
  templateUrl: './progressform.component.html',
  styleUrls: ['./progressform.component.scss']
})
export class ProgressformComponent {
  currentStep = 0;
  steps = ['STEP_1', 'STEP_2', 'STEP_3'];

  countries: any[] = [];
  cities: any[] = [];
  filteredCities: any[] = [];
  selectedCountryId: number | null = null;
  selectedCityId: number | null = null;
  isContinueDisabled: boolean = true;
  submittedDataId: any;
  climate: any;
  moneyCop: any;
  countryName: any;
  exchangeCountry: any;
  resultConvert: any;
  exchangeRate: any;
  currentDate: string;
  cityname: any;
  codeCountry: any;
  filteredCityNames: any;

  constructor(private locationService: LocationService) {
    this.currentDate = this.getCurrentDateFormatted();
   }



  ngOnInit(): void {

    this.locationService.getCountries().subscribe(response => {
      this.countries = response.data;
      console.log('Countries:', this.countries);  // Debug: Verificar países
    });

    this.locationService.getCities().subscribe(response => {
      this.cities = response.data;
      console.log('Cities:', this.cities);  // Debug: Verificar ciudades
    });
  }

  onCountryChange(): void {
    const countryId = Number(this.selectedCountryId);  // Convertir a número
    console.log('Selected Country ID:', countryId);  // Debug: Verificar ID de país seleccionado
    if (countryId) {
      this.filteredCities = this.cities.filter(city => city.country_id === countryId);

      console.log('Filtered Cities:', this.filteredCities);  // Debug: Verificar ciudades filtradas
    } else {
      this.filteredCities = [];
    }
    this.checkContinueButtonState();
  }

  onCityChange(): void {
    // Verificar si hay una ciudad seleccionada

    const countryId = Number(this.selectedCityId);  // Convertir a número

    if (this.selectedCityId) {
      // Encontrar el objeto de la ciudad correspondiente en el array de ciudades filtradas
      const selectedCity = this.filteredCities.find(city => city.id === countryId);
      if (selectedCity) {
        // Obtener el nombre de la ciudad seleccionada
        this.cityname = selectedCity.name;
        console.log('Selected City Name:', this.cityname);  // Mostrar el nombre de la ciudad seleccionada
      } else {
        console.error('Selected city not found in filtered cities.');
      }
    } else {
      console.error('No city selected.');
    }

    this.checkContinueButtonState();
  }


  checkContinueButtonState(): void {
    this.isContinueDisabled = !(this.selectedCountryId && this.selectedCityId);
  }


  nextStep(): void {
    console.log('Selected Country ID:', this.selectedCountryId);
    console.log('Countries:', this.countries);

    if (this.selectedCountryId && this.selectedCityId) {
      let selectedCountry = null;
      for (const country of this.countries) {
        console.log('Country ID:', country.id, 'Type:', typeof country.id);
        console.log('Selected Country ID:', this.selectedCountryId, 'Type:', typeof this.selectedCountryId);

        if (country.id === Number(this.selectedCountryId)) {
          console.log('Match found for ID:', this.selectedCountryId);
          selectedCountry = country;
          break;
        }
      }

      console.log('Selected Country:', selectedCountry);

      if (selectedCountry) {
        this.countryName = selectedCountry.name;
        this.exchangeCountry = selectedCountry.exchange;
        this.codeCountry = selectedCountry.code;

        console.log('Exchange Name:', this.exchangeCountry);

        if (this.countryName) {
          console.log('Country Name:', this.countryName);
          this.locationService.getWeather(this.countryName).subscribe(weatherResponse => {
             this.climate = weatherResponse.current.temp_c;
              this.locationService.submitData(this.selectedCountryId!, this.selectedCityId!, this.climate).subscribe(response => {
              this.currentStep++;
              this.submittedDataId = response.data.id;
              console.log('Data submitted successfully:', response);
            }, error => {
              console.error('Error submitting data:', error);
            });
          }, error => {
            console.error('Error fetching weather:', error);
          });
        } else {
          console.error('Country name is empty. Unable to fetch weather data.');
        }
      } else {
        console.error('Selected country not found.');
      }
    } else {
      console.error('Both country and city must be selected to fetch weather data.');
    }
  }



    submitDataAndUpdate(): void {
      if (this.selectedCountryId && this.selectedCityId) {
        // Verificar si ya se ha enviado algún dato anteriormente
        if (this.submittedDataId) {
          // Si hay un ID almacenado, enviar una solicitud PUT para actualizar el registro existente
          const updateData = {
            country_id: this.selectedCountryId,
            city_id: this.selectedCityId,
            money_cop: 12, // Aquí actualizamos el campo money_cop
            // Agrega los otros campos que deseas actualizar
          };
          this.locationService.convertDivisas('COP',this.exchangeCountry, this.moneyCop).subscribe(convertdivisasResponse => {
            this.resultConvert = convertdivisasResponse.conversion_result;
            this.exchangeRate = convertdivisasResponse.conversion_rate;

            this.locationService.updateData(this.submittedDataId,this.selectedCountryId!, this.selectedCityId!, this.climate, this.moneyCop, this.resultConvert,this.exchangeRate).subscribe(response => {
              this.currentStep++;

            console.log('Data updated successfully:', response);

            }, error => {
              console.error('Error submitting data:', error);
            });
          }, error => {
            console.error('Error updating data:', error);
          });
        } else {
          console.error('No data submitted yet. Please submit data first.');
        }
      } else {
        console.error('Both country and city must be selected to submit data.');
      }
  }



  prevStep() {
    this.currentStep--;
  }

  isStepActive(step: number) {
    return step === this.currentStep;
  }

  isStepCompleted(step: number) {
    return step < this.currentStep;
  }

  getCurrentDateFormatted(): string {
    return formatDate(new Date(), 'd MMM yyyy', 'en-US');
  }
  reloadPage(): void {
    window.location.reload();
  }
}

