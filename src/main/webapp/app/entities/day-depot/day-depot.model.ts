import { BaseEntity } from './../../shared';
import {Metre} from "../metre";

export class DayDepot implements BaseEntity {
    constructor(
    public id?: number,
    public metres?: Metre[],
    public description?: string,
    public startMeasurementOilTankId?: number,
    public startMeasurementOilTankAmount?: number,
    public startMeasurementOilTankAmountDeep?: number,
    public startMeasurementOilTankSixtyAmount?: number,
    public startMeasurementOilTankSpecialWeight?: number,
    public startMeasurementOilTankEnvironmentTemperature?: number,
    public startMeasurementOilTankProductTemperature?: number,
    public startMeasurementOilTankRegisterDate?: any,
    public endMeasurementOilTankId?: number,
    public endMeasurementOilTankAmount?: number,
    public endMeasurementOilTankAmountDeep?: number,
    public endMeasurementOilTankSixtyAmount?: number,
    public endMeasurementOilTankSpecialWeight?: number,
    public endMeasurementOilTankEnvironmentTemperature?: number,
    public endMeasurementOilTankProductTemperature?: number,
    public endMeasurementOilTankRegisterDate?: number,
    public oilTankId?: number,
    public oilTankTitle?: string,
    public oilTankOilTankType?: string,
    public mainDayDepotId?: number,
    public mainDayOperationId?: number,
    public natureDeductible?: number,
    public natureAddition?: number,
    public sixtyDeductible?: number,
    public sixtyAddition?: number,
    public natureSystemAmount?: number,
    public sixtySystemAmount?: number,
) {
    }
}
