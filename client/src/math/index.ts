import { Attachment, ArrayOfAttachments } from "../types";

export const calculateYearDifference = (date:string) => {

    // To set two dates to two variables
    var date1 = new Date(date);
    var date2 = new Date();
    
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
    
    // To calculate the no. of days between two dates
    var Difference_In_Years = Difference_In_Time / (1000 * 3600 * 24 * 365);

    return Difference_In_Years;

}

export const calculatePersonalCommission = (all:ArrayOfAttachments, referral:string, commission:number, includeCommission:boolean, includeMonthlyReferralReward:boolean) => {

    let referralReward:number = 0;
    let totalCommission:number = 0;

    all.forEach((item:Attachment)=>{
        if(item.referral === referral && item.checked === true){
            if(includeCommission){
                totalCommission += item.commission ? item.commission : (item.attachment/1000)*commission;
            }   
            if(includeMonthlyReferralReward){
                referralReward += item.monthly_referral_reward;
            }
        }

    })
    return referralReward + totalCommission;
}  

export const calculateSharedAccProfit = (all:ArrayOfAttachments, cycle_profit:number) => {
    let totalAttachment = 0;
    all.forEach((item:Attachment)=>{
      if(item.referral === "self" && item.checked === true)
          totalAttachment += item.attachment;
    })
    return cycle_profit * (totalAttachment/1000)
}