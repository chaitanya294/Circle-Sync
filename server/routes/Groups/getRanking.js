const express = require("express");
const { Group, Subjects, User } = require("../../model/model");
const router = express.Router();

function convert_To_Num(time){
    let to_return = 0;
    to_return += (time[1] - "0");
    to_return += ((time[0] - "0")*10);
    return to_return;
}

function compare(obj2, obj1){
    if(obj1.hr_spent > obj2.hr_spent){
        return 1;
    }
    else if(obj1.hr_spent == obj2.hr_spent){
        if(obj1.min_spent > obj2.min_spent){
            return 1;
        }
        else if(obj1.min_spent == obj2.min_spent){
            if(obj1.sec_spent > obj2.sec_spent){
                return 1;
            }
            else if(obj1.sec_spent == obj2.sec_spent){
                return 0;
            }
            else{
                return -1;
            }
        }
        else{
            return -1;
        }
    }
    else{
        return -1;
    }
}

function convert_To_String(time){
    let to_return = "";
    const last_dig = (time%10);
    time = Math.floor(time/10);
    const first_dig = time;
    to_return += first_dig;
    to_return += last_dig;
    return to_return;
}

router.post("/", async (req, res) => {
    const grpId = req.body.grpId;
    const response = await Group.findOne({ "_id" : grpId});
    const members = response.grpMembers;
    let User_Data = [];
    for(let i = 0; i<members.length; i++){
        const user_Response = await User.findOne({_id : members[i]});
        const user_Subjects = user_Response.subjects;
        const allSubjects = await Subjects.find({"_id" : {"$in" : user_Subjects}});
        let total_hrs = 0;
        let total_mins = 0;
        let total_secs = 0;
        for(let i = 0; i<allSubjects.length; i++){
            total_hrs += convert_To_Num(allSubjects[i].hr_spent);
            total_mins += convert_To_Num(allSubjects[i].min_spent);
            total_secs += convert_To_Num(allSubjects[i].sec_spent);
        }
        let total_new_minutes = Math.floor(total_secs/60);
        total_mins += total_new_minutes;
        let total_new_hours = Math.floor(total_mins/60);
        total_hrs += total_new_hours;
        total_secs = (total_secs%60);
        total_mins = (total_mins%60);
        let user_obj = {
            "username" : user_Response.username,
            "hr_spent" : total_hrs,
            "min_spent" : total_mins,
            "sec_spent" : total_secs
        };
        User_Data.push(user_obj);
    }
    User_Data.sort(compare);
    for(let i = 0; i<User_Data.length; i++){
        User_Data[i].hr_spent = convert_To_String(User_Data[i].hr_spent);
        User_Data[i].min_spent = convert_To_String(User_Data[i].min_spent);
        User_Data[i].sec_spent = convert_To_String(User_Data[i].sec_spent);
    }
    res.json(User_Data);
});

module.exports = router;
