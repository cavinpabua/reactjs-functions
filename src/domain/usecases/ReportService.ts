import { Report } from "../entities/Report";
import { ReportRepository } from "../repositories/ReportRepository";

export class ReportService implements ReportRepository {
  itemRepo: ReportRepository;

  constructor(ir: ReportRepository) {
    this.itemRepo = ir;
  }

  async GetReport(): Promise<Report[]> {
    return await this.itemRepo.GetReport();
  }
}
