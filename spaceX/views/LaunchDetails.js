export default class {
  constructor(params) {
    this.params = params;
    this.launch = null;
  }

  async fetchLaunchDetails() {
    try {
      const response = await fetch(`https://api.spacexdata.com/v5/launches/${this.params.id}`);
      this.launch = await response.json();
    } catch (error) {
      console.error('Error fetching launch details:', error);
      return '<div class="error">Error loading launch details. Please try again later.</div>';
    }
  }

  async render() {
    await this.fetchLaunchDetails();

    if (!this.launch) {
      return '<div class="error">Launch not found</div>';
    }

    return `
      <div class="launch-details">
        <button class="back-button" onclick="history.back()">← Back</button>
        <img src="${this.launch.links.patch.large || this.launch.links.patch.small || 'https://via.placeholder.com/400'}" alt="${this.launch.name}">
        <h1>${this.launch.name}</h1>
        
        <h2>Flight Number: ${this.launch.flight_number}</h2>
        <p>Launch Date: ${new Date(this.launch.date_utc).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</p>
        
        <h3>Details:</h3>
        <p>${this.launch.details || 'No details available'}</p>
        
        ${this.launch.failures && this.launch.failures.length > 0 ? `
          <h3>Failures:</h3>
          <ul>
            ${this.launch.failures.map(failure => `
              <li>
                <strong>Time:</strong> ${failure.time}s
                <br>
                <strong>Reason:</strong> ${failure.reason}
              </li>
            `).join('')}
          </ul>
        ` : ''}
      </div>
    `;
  }
}