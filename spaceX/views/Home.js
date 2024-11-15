export default class {
  constructor() {
    this.launches = [];
  }

  async fetchLaunches() {
    try {
      const response = await fetch('https://api.spacexdata.com/v5/launches');
      this.launches = await response.json();
    } catch (error) {
      console.error('Error fetching launches:', error);
      return '<div class="error">Error loading launches. Please try again later.</div>';
    }
  }

  async render() {
    await this.fetchLaunches();

    return `
      <h1>SpaceX Launches</h1>
      <div class="launches-grid">
        ${this.launches.map(launch => `
          <a href="/launch/${launch.id}" data-link class="launch-card">
            <img src="${launch.links.patch.small || 'https://via.placeholder.com/200'}" alt="${launch.name}">
            <h2>${launch.name}</h2>
          </a>
        `).join('')}
      </div>
    `;
  }
}