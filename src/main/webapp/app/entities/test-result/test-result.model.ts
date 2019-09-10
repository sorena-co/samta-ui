import { BaseEntity } from './../../shared';

export class TestResult implements BaseEntity {
    constructor(
    public id?: number,
    public appearance?: string,
    public densityAt15?: string,
    public distillation?: string,
    public ibp?: string,
    public tenPresentRecovered?: string,
    public fiftyPresentRecovered?: string,
    public ninetyPresentRecovered?: string,
    public fbp?: string,
    public rl?: string,
    public existentGum?: string,
    public flashPoint?: string,
    public copperCorrosion?: string,
    public freezing?: string,
    public conductivity?: string,
    public isSend?: boolean,
    public requestTestResultId?: number,
) {
        this.isSend = false;
    }
}
