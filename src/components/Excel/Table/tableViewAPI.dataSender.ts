import { EventNames, IFacadeEmitter } from '@core';
import { changeStyleAC, changeTextAC, saveCurrentExcelStateAC, stylesCurrentCellAC } from '@redux';
import { IFacadeWredux, IExcelState } from '@types';
import { WQuery } from '@wquery';

export class DataSender {
  constructor(private emitter: IFacadeEmitter, private wredux: IFacadeWredux) {}

  emitData($cell: WQuery): WQuery | false {
    const id = $cell.data.id;
    const idPublic = $cell.data.id;
    if (!id || !idPublic) return false;

    this.emitter.emit(EventNames.TABLE_EMIT_INFO, idPublic);

    const state = this.wredux.getState();
    const { parserData } = state.excelState;

    if (parserData[id]) {
      this.wredux.dispatch(changeTextAC(id, parserData[id].formula));
    } else {
      this.wredux.dispatch(changeTextAC(id, $cell.textContent));
    }

    this.wredux.dispatch(stylesCurrentCellAC($cell.getStyles()));
    return $cell;
  }

  sendFirstRenderCell(id: string, text: string) {
    const state = this.wredux.getState();
    const { parserData } = state.excelState;

    if (parserData[id]) {
      this.emitter.emit(EventNames.TABLE_CELECT_CELL, parserData[id].formula);
      return;
    }

    this.emitter.emit(EventNames.TABLE_CELECT_CELL, text);
  }

  sendTextInStore(id: string, text: string) {
    this.wredux.dispatch(changeTextAC(id, text));
  }

  sendStylesChanged(id: string, style: { [key: string]: string }) {
    this.wredux.dispatch(changeStyleAC(id, style));
  }

  saveCurentExcel() {
    const excelState = this.wredux.getState().excelState;
    this.wredux.dispatch(saveCurrentExcelStateAC(excelState));
  }

  get excelState(): IExcelState {
    const state = this.wredux.getState();
    return state.excelState;
  }
}
