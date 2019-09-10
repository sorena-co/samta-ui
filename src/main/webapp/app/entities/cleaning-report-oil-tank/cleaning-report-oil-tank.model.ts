import { BaseEntity } from './../../shared';

    export const enum TypeOfAlloy {
            'AL',
            'SS',
            'CS'
    }

    export const enum CleaningType {
            'VISIT',
            'CLEAN'
    }

export class CleaningReportOilTank implements BaseEntity {
    constructor(
    public id?: number,
    public capacity?: number,
    public typeOfAlloy?: TypeOfAlloy,
    public productId?: number,
    public productTitle?: string,
    public periodicTankInspection?: boolean,
    public cleaningType?: CleaningType,
    public modification?: boolean,
    public cleaningReportNumber?: string,
    public registerDate?: any,
    public exporterName?: string,
    public highLevelSensor?: boolean,
    public pAndVValue?: boolean,
    public manhole?: boolean,
    public dipStick?: boolean,
    public flameTrap?: boolean,
    public contentGauge?: boolean,
    public footValue?: boolean,
    public drainSump?: boolean,
    public sampleDrainValue?: boolean,
    public description?: string,
    public confirm?: boolean,
    public isSend?: boolean,
    public oilTankId?: number,
    public refuelCenterId?: number,
) {
        this.periodicTankInspection = false;
        this.modification = false;
        this.highLevelSensor = false;
        this.pAndVValue = false;
        this.manhole = false;
        this.dipStick = false;
        this.flameTrap = false;
        this.contentGauge = false;
        this.footValue = false;
        this.drainSump = false;
        this.sampleDrainValue = false;
        this.confirm = false;
        this.isSend = false;
    }
}
