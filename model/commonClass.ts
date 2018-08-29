/*半成品*/
export class AdminUser {
    constructor(public job: string,
                public reach: any,
                public phone: string,
                public star: number,
                public demerit: number,
                public id: number,
                public name: string,
                public age: number,
                public sex: number,
                public headphoto: string,
                public Id_no: string,
                public date: any,
                public code: any,
                public root: any,
                public fresh: any) {

    }
}
/*查询参数的接口*/
export interface SearchAdminParams {
    code ?: string;
    name ?: string;
    sex ?: string;
    job ?: string;
    reach ?: string;
    data ?: string;
    id ?: number;
    age ?: number;
}

export interface EditAdminIformation extends SearchAdminParams {
    identity ?: any | null;
    address ?: string | null;
    experience ?: Experiences[] | null;
    demerits ?: Demerits[] | null;
}
export interface Experiences {
    time ?: string | null;
    company ?: string |null;
    item ?: string | string;
    job ?: string |string;
}
export interface Demerits {
    time ?: string | null;
    reason ?: string | null;
    way ?: string | null;
}
export class DetailAdmin {
    constructor(
        public id: any,
        public identity: any,
        public address: string,
        public experience: Experiences[],
        public demerits: Demerits[],
        public deal: Array<string>,
        public fresh: number

    ) {
    }
}
export interface DeatilLog {
    ip: string;
    desc: string;
    date: any;
}
export class Log{
    constructor(
        public name: string,
        public date: any,
        public phoneNumber: string,
        public log: Array<DeatilLog>,
    ) {

    }
}
export class SysDetail {
    constructor(
        public id: number,
        public time: number,
        public degree: number,
        public desc: string,
        public cure: boolean,
        public who: string,
        public area: string,
        public solveAdvice: string,
        public upperAdvice: string,

    ) {

    }
}
/*具体的分析*/
export class SysWriteData {
    constructor(
        public area: string,
        public press: number,
        public bugtime: number,
        public needOptimize: boolean,
        public relevance: number,
        public bugCan: number,
        public cureCan: number,
        public hows: string,
    ) {
    }
}
/*产生大量的人员数据的*/