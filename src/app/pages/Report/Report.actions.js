import {
  LIST_LOAD_REQUEST,
  LIST_LOAD_SUCCESS,
  LIST_LOAD_FAILURE,
} from "./Report.types";
import { ReportService } from "../../../domain/usecases/ReportService";
import { ReportFirebaseRepositoryImpl } from "../../../data/repositories/ReportFirebaseRepositoryImpl";

export const refreshList = async (dispatch) => {
  dispatch({ type: LIST_LOAD_REQUEST });
  try {
    const todoRepo = new ReportFirebaseRepositoryImpl();
    const itemService = new ReportService(todoRepo);
    const items = await itemService.GetReport();
    dispatch({ type: LIST_LOAD_SUCCESS, payload: items });
  } catch (error) {
    dispatch({ type: LIST_LOAD_FAILURE, error });
  }
};


