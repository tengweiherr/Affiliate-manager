export type LoginData = {
    id: string, 
    password: string
}

export type AttachmentStore = {
    attachments:ArrayOfAttachments,
    loading:boolean,
    error:string
}

export type Attachment = {
    __v: number
    _id: string
    attachment: number
    checked: boolean
    fund: string
    commission: number | undefined
    join_date: string
    name: string
    referral: string
    monthly_referral_reward: number
    tfxi_id: number
}

export type ArrayOfAttachments = Array<Attachment>

export type CreateAttachment = {
    attachment: number
    fund: string
    join_date: string
    name: string
    referral: string
    tfxi_id: number
}

export type CalculatorResult = {
    main_acc_profit: number,
    shared_acc_profit: number,
    shared_acc_commission: number,
    dawson_commission: number,
    khoo_commission: number,
    weiherr_commission: number,
    xiaofei_commission: number,
    jasper_commission: number
}