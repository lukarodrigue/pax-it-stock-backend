export class HealthService {
  getStatus() {
    return {
      status: "ok",
      service: "pax-it-stock-backend"
    };
  }
}