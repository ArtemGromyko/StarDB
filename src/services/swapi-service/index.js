export default class SwapiService {

    _apiBase = 'https://swapi.dev/api';
  
    async getResource(url) {
      const res = await fetch(`${this._apiBase}${url}`);
      if(!res.ok) {
        throw new Error(`Could not fetch ${url}, received ${res.status}`)
      }
  
      return await res.json();
    }
  
    getAllPeople = async () => {
      const res = await this.getResource(`/people/`);
      return res.results.map(this.transformPerson);
    };
  
    getPerson = async (id) => {
      const person = await this.getResource(`/people/${id}`);
      return this.transformPerson(person);
    }
  
    getAllPlanets = async () => {
      const res = await this.getResource(`/planets/`);
      return res.results.transformPlanet(this.transformPlanet);
    }
  
    getPlanet = async (id) => {
      const planet = await this.getResource(`/planets/${id}`);
      return this.transformPlanet(planet);
    }
  
    getAllStarships = async () => {
      const res = await this.getResource(`/starships/`);
      return res.results.map(this.transformStarship);
    }
  
    getStarship = async (id) => {
      const starship = await this.getResource(`/starships/${id}`);
      return this.transformStarship(starship);
    }

    extractId(item) {
      const idRegExp = /\/([0-9]*)\/$/;
      return item.url.match(idRegExp)[1];
    }

    transformPlanet = (planet) => {
      return {
        id: this.extractId(planet),
        name: planet.name,
        population: planet.population,
        rotationPeriod: planet.rotation_period,
        diameter: planet.diameter
      };
    }

    transformStarship = (starship) => {
      return {
        id: this.extractId(starship),
        name: starship.name,
        model: starship.model,
        manufacturer: starship.manufacturer,
        costInCredits: starship.cost_in_credits,
        length: starship.length,
        crew: starship.crew,
        passengers: starship.passengers,
        cargoCapacity: starship.cargoCapacity 
      };
    }

    transformPerson = (person) => {
      return {
        id: this.extractId(person),
        name: person.name,
        gender: person.gender,
        birthYear: person.birthYear,
        eyeColor: person.eyeColor
      };
    }
  }