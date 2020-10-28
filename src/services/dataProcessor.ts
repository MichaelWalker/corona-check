import {fetchDataForArea} from "./coronaDataFetcher";
import {MetricCategory} from "./processingHelpers";
import {getCaseData} from "./caseService";
import {getAdmissionsData} from "./admissionService";
import {getDeathData} from "./deathService";
import {getHospitalisationData} from "./hospitalisationService";

export interface AreaData {
    areaName: string;
    cases: MetricCategory;
    admissions: MetricCategory;
    deaths: MetricCategory;
    hospitalisation: MetricCategory;
}

export const getAreaData = async (areaName: string): Promise<AreaData> => {
    const dailyReports = await fetchDataForArea(areaName);
    
    return {
        areaName: areaName,
        cases: getCaseData(dailyReports),
        admissions: getAdmissionsData(dailyReports),
        deaths: getDeathData(dailyReports),
        hospitalisation: getHospitalisationData(dailyReports),
    }
};
