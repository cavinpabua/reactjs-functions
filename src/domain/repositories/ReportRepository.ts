import { Report } from "../entities/Report";

export interface ReportRepository {
  GetReport(): Promise<Report[]>;
}
