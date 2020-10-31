import {MetricCategory} from "./processingHelpers";
import {getCaseData} from "./caseService";
import {getAdmissionsData} from "./admissionService";
import {getDeathData} from "./deathService";
import {getHospitalisationData} from "./hospitalisationService";
import {fetchDataForArea} from "./areaDataFetcher";
import {AreaType} from "./govUkApiClient";

export interface AreaData {
    areaName: string;
    cases: MetricCategory;
    admissions: MetricCategory;
    deaths: MetricCategory;
    hospitalisation: MetricCategory;
}

export const getAreaData = async (areaName: string, areaType: AreaType): Promise<AreaData> => {
    const dailyReports = await fetchDataForArea(areaName, areaType);
    
    return {
        areaName: areaName,
        cases: getCaseData(dailyReports),
        admissions: getAdmissionsData(dailyReports),
        deaths: getDeathData(dailyReports),
        hospitalisation: getHospitalisationData(dailyReports),
    }
};
