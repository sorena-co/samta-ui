import { BaseEntity } from './../../shared';

export class ChangeFilterElement implements BaseEntity {
    constructor(
    public id?: number,
    public model?: string,
    public capacity?: number,
    public operatingFlow?: number,
    public pdMax?: number,
    public microFilter?: string,
    public microFilterCount?: number,
    public coalescer?: string,
    public coalescerCount?: number,
    public separator?: string,
    public separatorCount?: number,
    public monitor?: string,
    public monitorCount?: number,
    public lastChangeDate?: any,
    public reasonOfChange?: string,
    public conditionOfCartridges?: boolean,
    public conditionOfSeals?: boolean,
    public conditionOfCoating?: boolean,
    public pdGauge?: boolean,
    public airEliminator?: boolean,
    public reliefValue?: boolean,
    public sampleDrainValue?: boolean,
    public namePlate?: boolean,
    public microFilterType?: string,
    public microFilterTypeCount?: number,
    public coalescerType?: string,
    public coalescerTypeCount?: number,
    public separatorType?: string,
    public separatorTypeCount?: number,
    public monitorType?: string,
    public monitorTypeCount?: number,
    public microFilterTorque?: string,
    public microFilterTorqueCount?: number,
    public coalescerTorque?: string,
    public coalescerTorqueCount?: number,
    public separatorTorque?: string,
    public separatorTorqueCount?: number,
    public monitorTorque?: string,
    public monitorTorqueCount?: number,
    public pdReading?: number,
    public flowTest?: number,
    public installedBy?: string,
    public supervisedBy?: string,
    public isSend?: boolean,
    public requestFilterElementId?: number,
    public manufactureId?: number,
    public oilTankId?: number,
    public oilTankTitle?: string,
    public refuelCenterId?: number,
) {
        this.conditionOfCartridges = false;
        this.conditionOfSeals = false;
        this.conditionOfCoating = false;
        this.pdGauge = false;
        this.airEliminator = false;
        this.reliefValue = false;
        this.sampleDrainValue = false;
        this.namePlate = false;
        this.isSend = false;
    }
}
