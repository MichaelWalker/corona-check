import React, {FunctionComponent, useState} from "react";
import moment from "moment";

interface DateSettingsProps {
    startDate: moment.Moment;
    setStartDate: (startDate: moment.Moment) => void;
    endDate: moment.Moment;
    setEndDate: (startDate: moment.Moment) => void;
}

type DatePeriod = "From Start" | "Last 2 Weeks" | "Last 4 Weeks" | "Custom";

export const DateSettings: FunctionComponent<DateSettingsProps> = ({startDate, endDate, setStartDate, setEndDate}) => {
    const [datePeriod, setDatePeriod] = useState<DatePeriod>("From Start");
    
    const updateDatePeriod = (period: DatePeriod): void => {
        setDatePeriod(period);
        setEndDate(moment());
        switch (period) {
            case "From Start":
                setStartDate(moment("01/02/2020"));
                break;
            case "Last 4 Weeks":
                setStartDate(moment().subtract(4, "weeks"));
                break;
            case "Last 2 Weeks":
                setStartDate(moment().subtract(2, "weeks"));
                break;
        }
    };
    
    return (
        <div>
            <label>
                <input type="radio" 
                       checked={datePeriod === "Last 2 Weeks"}
                       onChange={() => updateDatePeriod("Last 2 Weeks")}/>
                Last 2 Weeks
            </label>
            <label>
                <input type="radio"
                       checked={datePeriod === "Last 4 Weeks"}
                       onChange={() => updateDatePeriod("Last 4 Weeks")}/>
                Last 4 Weeks
            </label>
            <label>
                <input type="radio"
                       checked={datePeriod === "From Start"}
                       onChange={() => updateDatePeriod("From Start")}/>
                From Start
            </label>
            <label>
                <input type="radio"
                       checked={datePeriod === "Custom"}
                       onChange={() => setDatePeriod("Custom")}/>
                Custom
            </label>
            {datePeriod === "Custom" && <CustomDate startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/> }
        </div>
    );
};
 
const CustomDate: FunctionComponent<DateSettingsProps> = ({startDate, setStartDate, endDate, setEndDate}) => {
    return (
        <div>
            <label>Start Date
                <input type="date" 
                       value={startDate.format("YYYY-MM-DD")} 
                       onChange={event => setStartDate(moment(event.target.value))}/>
            </label>
            <label>End Date
                <input type="date" 
                       value={endDate.format("YYYY-MM-DD")} 
                       onChange={event => setEndDate(moment(event.target.value))} />
            </label>
        </div>
    );  
};
                